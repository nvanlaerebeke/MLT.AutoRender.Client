//Main
import * as React from 'react';
//Data
import { WorkspaceItem as WorkspaceItemData } from "../../../Model/WorkspaceItem";
import { UpdateTargetName } from "../../../Runtime/Actions/UpdateTargetName";
import { UpdateSourceName } from "../../../Runtime/Actions/UpdateSourceName";
import { ACKResponse } from "../../../Mitto/Messaging/Response/ACKResponse";
//Layout
import { Info } from "./Elements/Info";
import { Status } from "./Elements/Status";
import { Message } from "./Elements/Message";

//Design
import "./WorkspaceItem.css";


//Data
export interface WorkspaceItemProps {
    Item: WorkspaceItemData,
    Sources: string[],
    OnSelectedChanged: ((Item: WorkspaceItemData, Selected: boolean) => void)
};
export interface WorkspaceItemState {
    Item: WorkspaceItemData,
    Sources: string[],
    Selected: boolean
};
//Component
export class WorkspaceItem extends React.Component<WorkspaceItemProps, WorkspaceItemState> {
    private OnSelectedChanged: (Item: WorkspaceItemData, Selected: boolean)  => void;

    constructor(props: WorkspaceItemProps) {
        super(props);

        this.OnSelectedChanged = props.OnSelectedChanged;
        this.state = {
            Item: props.Item,
            Sources: props.Sources,
            Selected: false
        }
    }

    private Resume = () => {

    }

    private OnChangeSelection = (pSelected: boolean) => {
        this.setState({Selected: pSelected}, () => {
            if(this.OnSelectedChanged) {
                this.OnSelectedChanged(this.state.Item, this.state.Selected);
            }
        });
    }

    private UpdateTarget = (pName: string) => {
        new Promise(resolve => {
            new UpdateTargetName(this.state.Item.ID, pName).Send((r: ACKResponse) => {
                if(r.Status) {
                    console.log('Updated');
                } else {
                    console.log('Failed');
                }
            });
        });
        return true;
    }

    private UpdateSource = (pName: string) => {
        new Promise(resolve => {
            new UpdateSourceName(this.state.Item.ID, pName).Send((r: ACKResponse) => {
                if(r.Status) {
                    console.log('Updated');
                } else {
                    console.log('Failed');
                }
            });
        });
    }

    render() {
        return (<div className="workspaceitem">
            <div className="workspaceitem_status">
                <Status Item={this.state.Item} OnChangeSelection={this.OnChangeSelection} />
            </div>
            <div className="workspaceitem_message">
                <Message Item={this.state.Item} OnResume={this.Resume} />
            </div>
            <div className="workspaceitem_info">
                <Info Item={this.state.Item} Sources={this.state.Sources} OnChangeSource={this.UpdateSource} OnChangeTarget={this.UpdateTarget}  />
            </div>
        </div>)
    }
}