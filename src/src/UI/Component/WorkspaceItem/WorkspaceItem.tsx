//Main
import * as React from 'react';
//Data
import { WorkspaceItem as WorkspaceItemData } from "../../../Model/WorkspaceItem";
//Layout
import { RadioCheckBox } from "../../Elements/RadioCheckbox/RadioCheckBox";
import { Select } from "../../Elements/Select/Select";
import { EditText } from "../../Elements/EditText/EditText"
//Design
import "./WorkspaceItem.css";
import classNames from 'classnames';
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationCircle, faSpinner, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
//Data
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
//Component
export class WorkspaceItem extends React.Component<WorkspaceItemProps, WorkspaceItemState> {
    constructor(props: WorkspaceItemProps) {
        super(props);

        this.state = {
            Item: props.Item,
            Sources: props.Sources,
            Selected: (props.Selected) ? props.Selected : false
        }
    }

    private Resume = () => {

    }

    private GetStatus =() => {
        //if (IsUpdating) { return Status.Updating; }
        if(this.state.Item.Project) {
            return this.state.Item.Project.Status;
        }
        if (!this.state.Item.New) {
            return "ProjectMissing";
        }
        if (!this.state.Item.Final) {
            return "Finished";
        }
        return "Unknown";
    }


    private GetMessage = () => {
        let alert = "";
        let text = "";
        switch (this.GetStatus()) {
            case "Finished":
                alert = "alert-success";
                if (this.state.Item.Project && this.state.Item.Project.TimeTaken !== 0) {
                    let TimeSpan = this.SecondsTohhmmss(this.state.Item.Project.TimeTaken);
                    text = `Finished in ${TimeSpan.hours} hours, ${TimeSpan.minutes} minutes and ${TimeSpan.seconds} seconds`;
                } else {
                    text = "Rendering Finished";
                }
                break;
            case "ProjectMissing":
                alert = "alert-danger";
                text = "Missing project, new file?";
                break;
            case "SourceMissing":
                alert = "alert-danger";
                text = "Source file is missing";
                break;
            case "TargetExists":
                alert = "alert-danger";
                text = "Output file already exists";
                break;
            case "TargetInvalid":
                alert = "alert-danger";
                text = "Failed exporting file";
                break;
            case "SourceInvalid":
                alert = "alert-danger";
                text = "Invalid source file";
                break;
            case "Busy":
                /*if (_objBusyTimer == null) {
                    _objBusyTimer = new Timer(1000);
                    _objBusyTimer.Elapsed += _objBusyTimer_Elapsed;
                    _objBusyTimer.Start();
                }
                TimeSpan objElapsed = new TimeSpan(0, 0, (int)(DateTimeOffset.UtcNow.ToUnixTimeSeconds() - WorkspaceItem.Project.StartTime));*/
                //ToDo: add clock
                alert = "alert-info";
                text = "Elapsed time: {0} hours, {1} minutes and {2} seconds";
                break;
            case "Paused":
                return (<div className={classNames("alert-warning", "alert")}>
                    <span>Rendering paused <a href="javascript:void(0);" onClick={this.Resume}>click here</a> to resume</span>
                </div>);
                break;
            case "Queued":
            case "Unknown":
            case "Processable":
            case "Updating":
                text = "";
                break;
            case "Error":
                alert = "alert-danger";
                text = "An error has occurred";
                break;
            default:
                break;
        }

        if(alert !== "" && text !== "") {
            return (<div className={classNames(alert, 'alert')}>{text}</div>);
        } else {
            return <></>
        }
    }

    private SecondsTohhmmss = (totalSeconds: number) => {
        var hours   = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

        // round seconds
        seconds = Math.round(seconds * 100) / 100
        return {
            hours: (hours < 10) ? 0 + hours : hours,
            minutes: (minutes < 10) ? 0 + minutes : minutes,
            seconds:  (seconds  < 10) ? 0 + seconds : seconds
        }
    }

    private GetStatusElement = () => {
        console.log(this.GetStatus());
        switch(this.GetStatus()) {
            case "":
            case "Unknown":
            case "Processable":
                return <div className="workspaceitem_checkbox"><RadioCheckBox Selected={this.state.Item.Selected} /></div>
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
                    <div className="workspaceitem_busy"><FontAwesomeIcon icon={faSpinner} /></div>
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
        let selectedValue = (this.state.Item.Project && this.state.Item.Project.SourceName) ? this.state.Item.Project.SourceName: '';

        return (<div className="workspaceitem">
            <div className="workspaceitem_status">{this.GetStatusElement()}</div>
            <div className="workspaceitem_message">{this.GetMessage()}</div>
            <div className="workspaceitem_info">
                <div>Project Name:</div>
                <div>{this.state.Item.Project.ProjectName}</div>

                <div>Source Name:</div>
                <div><Select key={"Source_" + this.state.Item.ID} Options={this.state.Sources} Selected={selectedValue} /></div>

                <div>Target Name:</div>
                <div><EditText key={"Target_" + this.state.Item.ID} Text={this.state.Item.Project.TargetName} /></div>
            </div>
        </div>)
    }
}