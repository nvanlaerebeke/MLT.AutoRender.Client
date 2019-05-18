

import * as React from 'react';
import "./Select.css";

export interface SelectProps { 
    Selected: string
    Options: string[]
};

export interface SelectState { 
    Selected: string
    Options: string[]
};

export class Select extends React.Component<SelectProps, SelectState> {
    
    constructor(props: SelectProps) {
        super(props);
        
        this.state = {
            Selected: props.Selected,
            Options: props.Options
        }
    }
    
    render() {
        return (<div className="select">
            <select>
                {this.state.Options.map(function(item) {
                    return <option>{item}</option>
                })} 
            </select>
            <div className="select__arrow"></div>
      </div>)
    }
}    