import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import "./Header.css";
import logo from "../../../Assets/img/mlt.png";

export class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header_logo">
                    <img alt="" src={logo} />
                </div>
                <div className="header_title">
                    <p>MLT AutoRender</p>
                </div>
                <div className={`header_menu`}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
            </div>
        )
    }
}