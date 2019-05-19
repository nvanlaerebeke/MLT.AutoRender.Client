/**
 * ToDo: Clean this up, make getting the msg's & actions dynamic
 */
import { Frame } from "../Routing/Frame";
import { EchoResponse } from "./Response/EchoResponse"
import { RequestMessage } from "./Request/RequestMessage";
import { ACKResponse } from "./Response/ACKResponse";
import { GetStatusResponse } from "../../Messaging/Response/GetStatusResponse";
import { SendWorkspaceUpdateRequest } from "../../Messaging/Notification/SendWorkspaceUpdateRequest";

export function CreateResponseMessageFromBytes(pRequestMessage: RequestMessage, pFrame: Frame) {
    return GetResponseMessage(
        pRequestMessage,
        JSON.parse(
            UIntToString(pFrame.Data)
        )
    );
}

export function CreateRequestMessageFromBytes(pFrame: Frame) {
    return GetRequestMessage(
        JSON.parse(
            UIntToString(pFrame.Data)
        )
    );
}

function UIntToString(uintArray: number[]) {
    let encodedString = String.fromCharCode.apply(null, uintArray);
    return decodeURIComponent(escape(encodedString));;
}


function GetRequestMessage(pJson: any) {
    let objMessage = null;
    switch(pJson.Name) {
        case "SendWorkspaceUpdatedRequest":
            objMessage = new SendWorkspaceUpdateRequest();
    }
    if(objMessage) {
        Object.assign(objMessage, pJson);
    }
    return objMessage;
}

function GetResponseMessage(pMessage: RequestMessage, pJson: any) {
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

    if(objMessage) {
        Object.assign(objMessage, pJson);
    }
    return objMessage;
}