import { Request } from "../Request";
import * as FrameProvider from "../../Routing/Frame";
import * as MessageProvider from "../MessageProvider";

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
        for(let i = 0; i < this.Requests.length; i++) {
            if(this.Requests[i].RequestMessage.ID === objFrame.RequestID) {
                let objMessage = MessageProvider.CreateFromBytes(this.Requests[i].RequestMessage, objFrame);
                if(objMessage != null) {
                    this.Requests[i].Receive(objMessage);
                }
            }
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