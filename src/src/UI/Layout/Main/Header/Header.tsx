import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import "./Header.css";
import logo from "../../../Assets/img/mlt.png";
import { GetPlatform } from "../../../AppUI";

export class Header extends React.Component {
    private GetHeader = () => {
        if(GetPlatform() === "desktop") {
            return(<div className={"header header_desktop"}>
                <div className="header_logo">
                    <img alt="" src={logo} />
                </div>
                <div className="header_title">
                    <p>MLT AutoRender</p>
                </div>
                <div className={`header_menu`}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
            </div>);
        } else {
            return(<div className={"header header_web"}>
            <div className="header_logo">
                <img alt="" src={logo} />
            </div>
            <div className="header_title">
                <p>MLT AutoRender</p>
            </div>
        </div>);
        }
    }

    render() {
        return (
            this.GetHeader()
        )
    }
}