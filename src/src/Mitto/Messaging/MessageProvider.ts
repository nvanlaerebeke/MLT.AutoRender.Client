import { Frame } from "../Routing/Frame";
import { EchoResponse } from "./Response/EchoResponse"
//import { EchoRequest } from "./Request/EchoRequest"
import { ResponseMessage } from "./Response/ResponseMessage"
import { RequestMessage } from "./Request/RequestMessage";
import { ACKResponse } from "./Response/ACKResponse";
import { GetStatusResponse } from "../../Messaging/Response/GetStatusResponse";

export function CreateFromBytes(pRequestMessage: RequestMessage, pFrame: Frame) {
    let strJSON = UIntToString(pFrame.Data);
    let objJSON = JSON.parse(strJSON);
    let objMessage = GetMessage(pRequestMessage, objJSON);
    if(objMessage != null) {
        return objMessage as ResponseMessage;
    }
}

function UIntToString(uintArray: number[]) {
    let encodedString = String.fromCharCode.apply(null, uintArray);
    return decodeURIComponent(escape(encodedString));;
}

function GetMessage(pMessage: RequestMessage, pJson: any) {
    console.log(pJson);
    let objMessage = null;
    switch(pJson.Name) {
        case 'ACKResponse':
            objMessage = new ACKResponse(pMessage);
            break;
        case 'EchoResponse':
            objMessage = new EchoResponse(pMessage);
            break;
        case 'GetStatusResponse':
            objMessage = new GetStatusResponse(pMessage);
            break;
    }

    if(objMessage !== null) {
        Object.assign(objMessage, pJson);
    }
    return objMessage;
}

/**
 * ToDo: make everything dynamic
 */
/*
declare global {
    interface Window { MyNamespace: any; }
}

window.MyNamespace = window.MyNamespace || {};
*/