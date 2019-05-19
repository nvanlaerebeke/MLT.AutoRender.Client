import { Request } from "../Request";
import * as FrameProvider from "../../Routing/Frame";
import * as MessageProvider from "../MessageProvider";
import * as ActionManager from "../Manager/ActionManager";

/**
 * ToDo: making requests should use promises instead of callbacks
 */
class RequestManager {
    private Requests: Request[];

    constructor() {
        this.Requests = [];
    }

    DoRequest(pRequest: Request) {
        this.Requests.push(pRequest);
        pRequest.Send();
    }

    Receive(pData: number[]) {
        let objFrame = FrameProvider.CreateFromBytes(pData);
        if(objFrame.MessageType === "Response") {
            for(let i = 0; i < this.Requests.length; i++) {
                if(this.Requests[i].RequestMessage.ID === objFrame.RequestID) {
                    let objMessage = MessageProvider.CreateResponseMessageFromBytes(this.Requests[i].RequestMessage, objFrame);
                    if(objMessage != null) {
                        this.Requests[i].Receive(objMessage);
                    }
                }
            }
        } else if(objFrame.MessageType === "Notification") {
            let objMessage = MessageProvider.CreateRequestMessageFromBytes(objFrame);
            if(objMessage) {
                ActionManager.Handle(objMessage);
            }
        } else if(objFrame.MessageType === "Request") {
            //not implemented yet
        }
    }
}

let Manager = new RequestManager();

export function DoRequest(pRequest: Request) {
    Manager.DoRequest(pRequest);
}

export function Receive(pData: number[]) {
    Manager.Receive(pData);
}