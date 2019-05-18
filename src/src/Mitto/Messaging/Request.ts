import { Message } from "./Message";
import { RequestMessage } from "./Request/RequestMessage";
import * as RoutingFrame from "../Routing/RoutingFrame";
import  { GetClient } from "../Connection/Connection";

export class Request {
    public readonly RequestMessage: RequestMessage;
    private callback: any;

    constructor(pMessage: RequestMessage, pCallback: any) {
        this.RequestMessage = pMessage;
        this.callback = pCallback;
    }

    Send() {
        let arrBytes = RoutingFrame.CreateFromMessage(this.RequestMessage);
        GetClient().SendBytes(arrBytes);
    }

    Receive(pResponse: Message) {
        this.callback(pResponse);
    }
}