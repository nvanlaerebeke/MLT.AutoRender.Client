import * as React from 'react';
import "./RadioCheckBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";



export interface RadioCheckBoxProps { 
    Selected: boolean
};

export interface RadioCheckBoxItemState { 
    Selected: boolean
};


export class RadioCheckBox extends React.Component<RadioCheckBoxProps, RadioCheckBoxItemState> {
    
    constructor(props: RadioCheckBoxProps) {
        super(props);
        
        this.state = {
            Selected: props.Selected
        }
    }

    private InvertSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.setState({Selected: !this.state.Selected});
    };

    render() {
        return (<div className="radiocheckbox" onClick={this.InvertSelection}>
            <div>
                {this.state.Selected}
            </div>
            <div>
                <FontAwesomeIcon className="radiocheckbox_box" icon={(this.state.Selected) ? faCheckCircle : faCircle} />
            </div>
          </div>)
    }
}