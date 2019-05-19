//Main
import * as React from 'react';

//Layout
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSyncAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import "./ActionBar.css";

//Props and state
export interface ActionBarProps {
    OnStartSelected?: (() => void)
    OnRefresh?: (() => void)
    OnReload?: (() => void)
};
export interface ActionBarState { };

export class ActionBar extends React.Component<ActionBarProps, ActionBarState> {
    private OnStartSelected?: (() => void);
    private OnRefresh?: (() => void);
    private OnReload?: (() => void);

    constructor(props: ActionBarProps) {
        super(props);

        this.OnStartSelected = props.OnStartSelected;
        this.OnRefresh = props.OnRefresh;
        this.OnReload = props.OnReload;

    }

    private StartSelected = () => {
        if(this.OnStartSelected) {
            this.OnStartSelected();
        }
    }

    private Refresh = () => {
        if(this.OnRefresh) {
            this.OnRefresh();
        }
    }

    private Reload = () => {
        if(this.OnReload) {
            this.OnReload();
        }
    }

    render() {
        return (
            <div className="actionbar">
                <div className="actionbar_start" onClick={this.StartSelected}>
                    <div className="actionbar_icon">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div>Start Selected</div>
                </div>
                <div className="actionbar_refesh" onClick={this.Refresh}>
                    <div className="actionbar_icon">
                        <FontAwesomeIcon icon={faSyncAlt} />
                    </div>
                    <div>Refresh</div>
                </div>
                <div className="actionbar_reload" onClick={this.Reload}>
                    <div className="actionbar_icon">
                        <FontAwesomeIcon icon={faPowerOff} />
                    </div>
                    <div>Reload</div>
                </div>
            </div>
        )
    }
}