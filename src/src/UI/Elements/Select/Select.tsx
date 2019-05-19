import * as React from 'react';
import "./Select.css";

export interface SelectProps {
    Selected: string
    Options: string[]
    OnChange: ((Value: string) => void)
};

export interface SelectState {
    Selected: string
    Options: string[]
};

export class Select extends React.Component<SelectProps, SelectState> {
    private OnChange?: (pName: string) => void;
    private OriginalValue: string;

    constructor(props: SelectProps) {
        super(props);
        this.OnChange = props.OnChange;
        this.OriginalValue = props.Selected;

        this.state = {
            Selected: props.Selected,
            Options: props.Options
        }
    }

    /**
     * ToDo: this shouldn't be the way to do this, figure out what's wrong
     * and why the next state doesn't have the new selected value
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: SelectProps, nextState:SelectState) {
        if(nextProps.Selected !== nextState.Selected) {
            this.setState({Selected: nextProps.Selected});
        }
        return true;
    }

    private SelectionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({Selected: e.target.value}, () => {
            if(this.OnChange) {
                this.OnChange(this.state.Selected);
            }
            this.OriginalValue = this.state.Selected;
        });
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