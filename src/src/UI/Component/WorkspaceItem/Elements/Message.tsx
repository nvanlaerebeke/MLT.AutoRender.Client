//Main
import * as React from 'react';
import { WorkspaceItem } from '../../../../Model/WorkspaceItem';

import classNames from 'classnames';
import Button from 'react-bootstrap/Button';
import * as Helper from "../WorkspaceItemHelper";
import { MissingProject } from "./MissingProject";

//Data
export interface MessageProps {
    Item: WorkspaceItem
    OnResume: () => void;
};
export interface MessageState {
    Item: WorkspaceItem
};
//Component
export class Message extends React.Component<MessageProps, MessageState> {
    OnResume: (pSelected: boolean) => void;

    constructor(props: MessageProps) {
        super(props);
        this.OnResume = props.OnResume;

        this.state = {
            Item: props.Item
        };
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

    private OnResumeClicked = () => { this.OnResumeClicked(); }

    private GetMessage = () => {
        let alert = "";
        let text = "";
        switch (Helper.GetStatus(this.state.Item)) {
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
                return <MissingProject Item={this.state.Item} />;
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
                return (
                    <div className={classNames("alert-warning", "alert")}>
                        <span>Rendering paused <Button variant="warning" size="sm" onClick={this.OnResumeClicked}>click here</Button> to resume</span>
                    </div>
                );
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
        }
        return <></>
    }

    render() {
        return this.GetMessage();
    }
}