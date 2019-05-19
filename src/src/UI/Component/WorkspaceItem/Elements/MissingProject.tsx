//Main
import * as React from 'react';
import { GetPlatform } from "../../../AppUI";
import { WorkspaceItem } from '../../../../Model/WorkspaceItem';
import Button from 'react-bootstrap/Button';

//Data
export interface MissingProjectProps {
    Item: WorkspaceItem
};
export interface MissingProjectState {
    Item: WorkspaceItem,
};
//Component
export class MissingProject extends React.Component<MissingProjectProps, MissingProjectState> {
    constructor(props: MissingProjectProps) {
        super(props);
        this.state = {
            Item: props.Item
        };
    }

    private OpenShotcut = (e: React.MouseEvent<HTMLButtonElement>) => {
        //ToDo: Create XML file and open Shotcut
    }

    render() {
        if(GetPlatform() === "web") {
            return (<div className={"alert-danger alert"}>Missing project, new file?</div>);
        } else {
            return (<Button onClick={this.OpenShotcut}>Click here to create the project file</Button>);
        }
    }
}