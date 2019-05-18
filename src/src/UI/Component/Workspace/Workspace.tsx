//Main
import * as React from 'react';

//Messaging
import * as Connection from '../../../Mitto/Connection/Connection';
import * as RequestManager from "../../../Mitto/Messaging/Manager/RequestManager";
import { Request } from "../../../Mitto/Messaging/Request";
import { ReloadRequest } from "../../../Messaging/Request/ReloadRequest";
import { GetStatusResponse } from "../../../Messaging/Response/GetStatusResponse";
import { WorkspaceItem } from "../../../Model/WorkspaceItem";
import { WorkspaceItem as WorkspaceItemUI} from "../WorkspaceItem/WorkspaceItem";

//Layout
import "./Workspace.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

type WorkspaceProps = { };
type WorkspaceState = { 
    status: string,
    workspaceitems: WorkspaceItem[],
    sources: string[]
};

export class Workspace extends React.Component<WorkspaceProps, WorkspaceState> {
    constructor(props: WorkspaceProps) {
        super(props);

        this.state = {
            status: "Loading",
            workspaceitems:  [],
            sources: [ "test" ]
        }
    }

    update(pWorkspaceItems: WorkspaceItem[]) {

    }

    componentDidMount() {
        Connection.GetClient().on('connected', () => {
            this.Refresh();
        });

        if(Connection.GetClient().Status === "Connected") {
            this.Refresh();
        }
    }

    private Refresh() {
        this.setState({ status: "Loading" });

        RequestManager.DoRequest(new Request(new ReloadRequest(), (r: GetStatusResponse) => {
            this.setState({
                status: "Ready",
                workspaceitems: r.WorkspaceItems
            }, () => {
                this.UpdateSources()
                //setInterval(() => this.addItem(), 2000);
            });
        }));
    }

    UpdateSources() {
        let sources = this.state.sources;
        sources.length = 0;
        this.state.workspaceitems.forEach(i => { 
            if(i.Project && i.Project.SourceName) {
                sources.push(i.Project.SourceName);
            }
        });
        this.setState({ sources });
    }

    render() {
        return (
            <div className="workspace">
                <h2>Project Overview:</h2>
                {this.GetWorkspace()}
            </div>
        )
    }

    private GetWorkspace() {
        if(this.state.status === "Loading") {
            return <div className="workspace_loading">
                <FontAwesomeIcon icon={faSpinner} />
            </div>;
        } else {
            return <div className="workspaceitems">
                {this.state.workspaceitems.map((item) => {
                    return <WorkspaceItemUI key={item.ID} Item={item} Sources={this.state.sources}/>
                })} 
            </div>;
        }
    }
}