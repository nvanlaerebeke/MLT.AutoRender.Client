import * as React from 'react';
import classNames from 'classnames';

import "./RadioCheckBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";



export interface RadioCheckBoxProps {
    Selected?: boolean
    OnSelectionChanged: (Selected: boolean) => void;
};

export interface RadioCheckBoxItemState {
    Selected: boolean
};


export class RadioCheckBox extends React.Component<RadioCheckBoxProps, RadioCheckBoxItemState> {
    private OnSelectionChanged: (Selected: boolean) => void;

    constructor(props: RadioCheckBoxProps) {
        super(props);
        this.OnSelectionChanged = props.OnSelectionChanged;
        this.state = {
            Selected: props.Selected ? props.Selected: false
        }
    }

    private InvertSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.setState({Selected: !this.state.Selected}, () => {
            this.OnSelectionChanged(this.state.Selected);
        });
    };

    render() {
        return (<>
            <div
                className={classNames({
                    'radiocheckbox': true,
                    'radiocheckbox-selected': this.state.Selected
                })}
                onClick={this.InvertSelection}
            >
                <div>
                    {this.state.Selected}
                </div>
                <div>
                    <FontAwesomeIcon className={"radiocheckbox_box"} icon={(this.state.Selected) ? faCheckCircle : faCircle} />
                </div>
            </div>
        </>)
    }
}