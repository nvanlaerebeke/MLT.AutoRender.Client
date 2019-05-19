//Main
import React from 'react';
//Layout
import { Header } from "./Header/Header";
import { Workspace } from "../../Component/Workspace/Workspace";
import "./Main.css";

class App extends React.Component {
    render() {
        return <div className="main">
            <Header />
            <Workspace />
        </div>
    };
}
export default App;