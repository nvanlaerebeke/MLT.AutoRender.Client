//Main
import React from 'react';

//Connection
import * as Client from "../../../Mitto/Connection/Connection";

//Layout
import { Header } from "./Header/Header";
import { ActionBar } from "./ActionBar/ActionBar"
import { Workspace } from "../../Component/Workspace/Workspace";
import "./Main.css";


let Connection = Client.GetClient();
Connection.Connect();

const App: React.FC = () => {
    return (
        <div className="main">
            <Header />
            <ActionBar />
            <Workspace />
        </div>
  );
}
export default App;