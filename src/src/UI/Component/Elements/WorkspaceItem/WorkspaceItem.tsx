//Main
import * as React from 'react';

//Data
import { WorkspaceItem as WorkspaceItemData } from "../../../../Model/WorkspaceItem";

//Layout
import "./WorkspaceItem.css";
import { RadioCheckBox } from "../RadioCheckbox/RadioCheckBox";
import { Select } from "../Select/Select";

export interface WorkspaceItemProps { 
    Item: WorkspaceItemData,
    Sources: string[],
    Selected?: boolean
};
export interface WorkspaceItemState { 
    Item: WorkspaceItemData,
    Sources: string[],
    Selected: boolean
};

export class WorkspaceItem extends React.Component<WorkspaceItemProps, WorkspaceItemState> {
    constructor(props: WorkspaceItemProps) {
        super(props);
        
        this.state = {
            Item: props.Item,
            Sources: props.Sources,
            Selected: (props.Selected) ? props.Selected : false
        }
    }
    
    componentWillReceiveProps(nextProps: WorkspaceItemProps) {
        console.log(nextProps);
    }

    render() {
        return (<div className="workspaceitem">
            <div className="workspaceitem_checkbox">
                <RadioCheckBox Selected={this.state.Item.Selected} />
            </div>
            <div className="workspaceitem_info">
                   
                    <div>Project Name:</div>
                    <div>{this.state.Item.Project.ProjectName}</div>
                
                    <div>Source Name:</div>
                    <div><Select Options={this.state.Sources} Selected={this.state.Item.Project.SourceName} /></div>

                    <div>Target Name:</div>
                    <div>{this.state.Item.Project.TargetName}</div>

            </div>
        </div>)
    }
}