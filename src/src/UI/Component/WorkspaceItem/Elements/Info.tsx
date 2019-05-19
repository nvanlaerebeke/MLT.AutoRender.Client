//Main
import * as React from 'react';
import { WorkspaceItem } from '../../../../Model/WorkspaceItem';
import { Select } from "../../../Elements/Select/Select";
import { EditText } from "../../../Elements/EditText/EditText";

//Data
export interface InfoProps {
    Item: WorkspaceItem
    Sources: string[],
    OnChangeSource: (pNewName: string) => void;
    OnChangeTarget: (pNewName: string) => void;
};
export interface InfoState {
    Item: WorkspaceItem
    Sources: string[]
};
//Component
export class Info extends React.Component<InfoProps, InfoState> {
    private OnChangeSource: (pNewName: string) => void;
    private OnChangeTarget: (pNewName: string) => void;

    constructor(props: InfoProps) {
        super(props);
        this.OnChangeSource = props.OnChangeSource;
        this.OnChangeTarget = props.OnChangeTarget;

        this.state = {
            Item: props.Item,
            Sources: props.Sources
        };
    }

    private GetInfo = () => {
        if(this.state.Item.Project) {
            return <>
                <div>Project Name:</div>
                <div>{(this.state.Item.Project) ? this.state.Item.Project.ProjectName: ""}</div>

                <div>Source Name:</div>
                <div>
                    <Select
                        key={"Source_" + this.state.Item.ID}
                        Options={this.state.Sources}
                        Selected={this.state.Item.New ? this.state.Item.New.Name: ''}
                        OnChange={this.OnChangeSource}
                    />
                </div>

                <div>Target Name:</div>
                <div>
                    <EditText
                        key={"Target_" + this.state.Item.ID}
                        Text={this.state.Item.Project.TargetName}
                        OnChange={this.OnChangeTarget}
                    />
                </div>
            </>;
        } else {
            return <>
                <div>Project Name:</div>
                <div />
                <div>Source Name:</div>
                <div>{this.state.Item.New ? this.state.Item.New.Name : ''}</div>
                <div>Target Name:</div>
                <div />
            </>;
        }
    }

    render() {
        return (<>{this.GetInfo()}</>);
    }
}