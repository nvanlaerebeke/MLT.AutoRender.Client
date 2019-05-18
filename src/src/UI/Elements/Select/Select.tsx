

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
    
    private SelectionChanged = () => {
        console.log("changed");
    }

    render() {
        let i = 0;
        return (<div className="select">
            <select value={this.state.Selected} onChange={this.SelectionChanged}>
                <option key="0" value=""></option>
                {this.state.Options.map((item) => {
                    i++
                    return <option key={i} value={item}>{item}</option>
                })} 
            </select>
            <div className="select__arrow"></div>
      </div>)
    }
}    