//Main
import * as React from 'react';
import * as Helper from "../WorkspaceItemHelper";

import { WorkspaceItem } from '../../../../Model/WorkspaceItem';
import { RadioCheckBox } from "../../../Elements/RadioCheckbox/RadioCheckBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationCircle, faSpinner, faPause } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

//Data
export interface StatusProps {
    Item: WorkspaceItem
    OnChangeSelection: (pSelected: boolean) => void;
};
export interface StatusState {
    Item: WorkspaceItem
};
//Component
export class Status extends React.Component<StatusProps, StatusState> {
    OnChangeSelection: (pSelected: boolean) => void;

    constructor(props: StatusProps) {
        super(props);
        this.OnChangeSelection = props.OnChangeSelection;

        this.state = {
            Item: props.Item
        };
    }

    private GetStatus = () => {
        switch(Helper.GetStatus(this.state.Item)) {
            case "":
            case "Unknown":
            case "Processable":
                return <div className="workspaceitem_checkbox"><RadioCheckBox OnSelectionChanged={this.OnChangeSelection} /></div>
            case "Finished":
                return <div className="workspaceitem_success"><FontAwesomeIcon icon={faCheck} /></div>
            case "ProjectMissing":
            case "SourceMissing":
            case "TargetExists":
            case "TargetInvalid":
            case "SourceInvalid":
            case "Error":
                return <div className="workspaceitem_error"><FontAwesomeIcon icon={faExclamationCircle} /></div>
            case "Queued":
                return <div className="workspaceitem_queued"><FontAwesomeIcon icon={faClock} /></div>
            case "Busy":
                return <>
                    <div className="workspaceitem_busy"><FontAwesomeIcon icon={faSpinner} spin={true} /></div>
                    <div className="workspaceitem_busy_progress">{this.state.Item.Project.Progress}%</div>
                </>
            case "Paused":
                return <>
                    <div className="workspaceitem_paused"><FontAwesomeIcon icon={faPause} /></div>
                </>
            case "Updating":
                break;

        }
    }

    render() {
        return this.GetStatus();
    }
}