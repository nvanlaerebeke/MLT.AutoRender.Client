//Main
import * as React from 'react';
//Data
import { WorkspaceItem } from "../../../Model/WorkspaceItem";
//Messaging
import * as Client from '../../../Mitto/Connection/Connection';
import { GetStatusResponse } from "../../../Messaging/Response/GetStatusResponse";
//Layout
import "./Workspace.css";
import { WorkspaceItem as WorkspaceItemUI } from "../../Component/WorkspaceItem/WorkspaceItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ActionBar } from "./ActionBar/ActionBar";
//Actions
import { Reload } from '../../../Runtime/Actions/Reload';
import { GetStatus } from "../../../Runtime/Actions/GetStatus"
import { StartJob } from "../../../Runtime/Actions/StartJob";
import { Subscribe } from "../../../Runtime/Actions/Subscribe";
import { ACKResponse } from '../../../Mitto/Messaging/Response/ACKResponse';
import { WorkspaceUpdatedEventArgs } from '../../../Messaging/EventArgs/WorkspaceUpdatedEventArgs';
import * as EventRegistry from "../../../Messaging/Action/EventRegistry";

type WorkspaceProps = { };
type WorkspaceState = {
    status: string,
    workspaceitems: WorkspaceItem[],
    sources: string[]
};

export class Workspace extends React.Component<WorkspaceProps, WorkspaceState> {
    private SelectedWorkspaceItems: WorkspaceItem[] = [];
    private ClientConnection: any;

    constructor(props: WorkspaceProps) {
        super(props);
        this.ClientConnection = Client.GetClient("ws://localhost:37697");

        this.state = {
            status: "Loading",
            workspaceitems: [],
            sources: [ ]
        }
    }

    componentDidMount() {
        EventRegistry.Get().on("workspaceupdated", (pWorkspaceItems: WorkspaceUpdatedEventArgs[]) => {
            let lstWSItems = this.state.workspaceitems;
            pWorkspaceItems.forEach(u => {
                for(let i = 0; i < lstWSItems.length; i++) {
                    if(u.WorkspaceItem && lstWSItems[i].ID === u.WorkspaceItem.ID) {
                        lstWSItems[i].Final = u.WorkspaceItem.Final;
                        lstWSItems[i].New = u.WorkspaceItem.New;
                        lstWSItems[i].Project = u.WorkspaceItem.Project;
                    }
                }
            });
            this.setState({
                workspaceitems: lstWSItems
            });
        });

        this.ClientConnection.on('closed', () => {
            this.setState({ status: "Loading" });
            this.ClientConnection.Connect();
        });
        this.ClientConnection.on('connected', () => {
            new Subscribe().Send(() => {
                this.Refresh();
            });
        });
        if(this.ClientConnection.Status === "Connected") {
            new Subscribe().Send(() => {
                this.Refresh();
            });
        } else {
            this.ClientConnection.Connect();
        }
    }

    private Refresh = () => {
        this.setState({ status: "Loading" });
        new GetStatus().Send((r: GetStatusResponse) => {
            this.setState({
                status: "Ready",
                workspaceitems: r.WorkspaceItems
            }, () => {
                this.UpdateSources()
            });
        });
    }

    private OnReload = () => {
        this.setState({ status: "Loading" });
        new Reload().Send((r: GetStatusResponse) => {
            this.setState({
                status: "Ready",
                workspaceitems: r.WorkspaceItems
            }, () => {
                this.UpdateSources()
            });
        });
    }

    private Start = () => {

        this.SelectedWorkspaceItems.forEach(i => {
            new StartJob(i.ID).Send((r: ACKResponse) =>{
                if(r.Status) {
                    console.log("OK");
                } else {
                    console.log("Error");
                }
            });
        });
    }

    private UpdateSources = () => {
        let sources = this.state.sources;
        sources.length = 0;
        this.state.workspaceitems.forEach(i => {
            if(i.New && i.New.Name) {
                sources.push(i.New.Name);
            }
        });
        this.setState({ sources });
    }

    private SelectionChanged = (pWorkspaceItem: WorkspaceItem, pSelected: boolean) => {
        this.SelectedWorkspaceItems = this.SelectedWorkspaceItems.filter(wsi => wsi.ID !== pWorkspaceItem.ID);
        if(pSelected) {
            this.SelectedWorkspaceItems.push(pWorkspaceItem);
        }
    }

    private GetWorkspace() {
        if(this.state.status === "Loading") {
            return <div className="workspace_loading">
                <FontAwesomeIcon icon={faSpinner} />
            </div>;
        } else {
            return <div className="workspaceitems">
                {this.state.workspaceitems.map((item) => {
                    return <WorkspaceItemUI key={item.ID} Item={item} OnSelectedChanged={this.SelectionChanged} Sources={this.state.sources} />;
                })}
            </div>;
        }
    }

    render() {
        return (<>
            <ActionBar
                OnRefresh={this.Refresh}
                OnReload={this.OnReload}
                OnStartSelected={this.Start}
            />
            <div className="workspace">
                <h2>Project Overview:</h2>
                {this.GetWorkspace()}
            </div>
            </>
        )
    }


}