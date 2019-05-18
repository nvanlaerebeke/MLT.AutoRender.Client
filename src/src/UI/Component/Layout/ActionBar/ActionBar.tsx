//Main
import * as React from 'react';

//Layout
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSyncAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import "./ActionBar.css";

export class ActionBar extends React.Component {
    render() {
        return (
            <div className="actionbar">
                <div>
                    <div className="actionbar_icon">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div>Start Selected</div>
                </div>
                <div>
                    <div className="actionbar_icon">
                        <FontAwesomeIcon icon={faSyncAlt} />
                    </div>
                    <div>Refresh</div>
                </div>
                <div className="reload">
                    <div className="actionbar_icon">
                        <FontAwesomeIcon icon={faPowerOff} />
                    </div>
                    <div>Reload</div>
                </div>
            </div>
        )
    }
}