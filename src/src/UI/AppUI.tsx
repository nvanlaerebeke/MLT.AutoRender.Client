//Main
import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./Layout/Main/Main";
import * as serviceWorker from './serviceWorker';

//UI
import 'bootstrap/dist/css/bootstrap.css';

export class AppUI {

    Start(pPlatform: string) {
        Platform = pPlatform;

        ReactDOM.render(<Main />, document.getElementById('root'));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorker.unregister();
    }

    Show() {
        ReactDOM.render(<Main />, document.getElementById('root'));
    }

    Open(pWindow: string) {
        if(GetPlatform() === "desktop") {
            //open new window
        } else {
            //show bootstrap/jquery window
        }
    }
}
let Platform = "web";
export function GetPlatform() {
    return Platform;
};