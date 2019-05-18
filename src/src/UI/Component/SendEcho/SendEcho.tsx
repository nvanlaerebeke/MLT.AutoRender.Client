import * as React from 'react';
//import { WebSocketClient } from '../../Mitto/Connection/Connection';
import * as RequestManager from "../../../Mitto/Messaging/Manager/RequestManager";
import { Request } from "../../../Mitto/Messaging/Request";
import { EchoRequest } from '../../../Mitto/Messaging/Request/EchoRequest';
import { EchoResponse } from '../../../Mitto/Messaging/Response/EchoResponse';

class SendEcho extends React.Component {
    render() {
        return (
            <div>
                <button 
                    onClick={e => this.SendEcho("MyMessage2") } 
                ><span>Hey!</span></button>
            </div>
        )
    }

    SendEcho(pMessage:string) {
        RequestManager.DoRequest(new Request(new EchoRequest(pMessage), (r: EchoResponse) => {
            console.log("Response Received");
            console.log(r.Message);
        }));
    }
}
export default SendEcho;