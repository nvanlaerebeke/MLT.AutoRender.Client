import { Message } from "../Messaging/Message";
import { Frame } from "./Frame";
import * as Client from "../Connection/Connection";

export class RoutingFrame {
    FrameType!: string;
    MessageType!: string;
    RequestID!: string;
    SourceID!: string;
    DestinationID!: string;
    Data!: number[];

    constructor(pFrameType: string, pMessageType: string, pRequestID: string, pSourceID: string, pDestination: string, pData: number[]) {
        this.Data = pData;
        this.DestinationID = pDestination;
        this.FrameType = pFrameType;
        this.MessageType = pMessageType;
        this.RequestID = pRequestID;
        this.SourceID = pSourceID;
    }


    getByteArray() {
        let arrData: Array<number> = [];

        let RequestID = toANSIIArray(this.RequestID);
        let SourceID = toANSIIArray(this.SourceID);
        let DestinationID = toANSIIArray(this.DestinationID);
        
        arrData.push(GetFrameTypeByte(this.FrameType));
        arrData.push(GetMessageTypeByte(this.MessageType));
        arrData.push(RequestID.length);
        RequestID.forEach(b => arrData.push(b));
        arrData.push(SourceID.length);
        SourceID.forEach(b => arrData.push(b));
        arrData.push(DestinationID.length);
        DestinationID.forEach(b => arrData.push(b));
        this.Data.forEach(b => arrData.push(b));

        return arrData;
    }
}

function GetFrameTypeByte(pType: string) {
    return (pType === "Control") ? 1 : 0;
}

function GetMessageTypeByte(pType: string) {
    switch(pType) {
        case "Notification":
            return 1;
        case "Request":
            return 2;
        case "Response":
            return 3;
        default:
            return 0;
    }
}

function toANSIIArray(str: string) {
    let arrData = [];
    for(let i = 0; i < str.length; i++) {
        arrData.push(str.charCodeAt(i));
    }
    return arrData;
}


export function CreateFromBytes(pData: number[]) {
    return new RoutingFrame(
        GetFrameTypeFromByte(pData[0]),
        GetMessageTypeFromByte(pData[1]),
        GetRequestIDFromByteArray(pData),
        GetSourceIDFromByteArray(pData),
        GetDestinationFromByteArray(pData),
        GetDataFromByteArray(pData)
    );
};

export function CreateFromMessage(pMessage: Message) {
    let json = JSON.stringify(pMessage);
    let arrBytes = toUTF8Array(json);

    let objFrame = new RoutingFrame(
        "Messaging",
        pMessage.MessageType,
        pMessage.ID,
        Client.GetClient().ID,
        Client.GetClient().ID,
        new Frame(
            pMessage.MessageType,
            pMessage.ID,
            pMessage.Name,
            arrBytes
        ).getBytes()
    );

    return objFrame.getByteArray();
}

function toUTF8Array(str: string) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        } else { // surrogate pair
            i++;
            charcode = ((charcode&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff)
            utf8.push(0xf0 | (charcode >>18), 
                      0x80 | ((charcode>>12) & 0x3f), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

function GetFrameTypeFromByte(pByte: number) {
    return (pByte === 1) ? "Control" : "Messaging";
}

function GetMessageTypeFromByte(pByte: number) {
    switch(pByte) {
        case 1:
            return "Notification";
        case 2:
            return "Request";
        case 3:
            return "Response";
    }
    return "Response";
}

function GetRequestIDFromByteArray(pData: number[]) {
    let arrBytes = pData.slice(3, 3 + pData[2] - 1);
    return UIntToString(arrBytes);
}

function GetSourceIDFromByteArray(pData: number[]) {
    let start = 3 + pData[2] + 1;
    let end = start + pData[2];
    let arrBytes = pData.slice(start, end);
    return UIntToString(arrBytes);
}

function GetDestinationFromByteArray(pData: number[]) {
    let start = 3 + pData[2] + 1 + pData[3 + pData[2]] + 1;
    let end = start + pData[3 + pData[2] + 1 + pData[3 + pData[2]]];
    let arrBytes = pData.slice(start, end);
    return UIntToString(arrBytes);
}

function GetDataFromByteArray(pData: number[]) {
    let afterRequestID = 3 + pData[2] + 1; //next amount of bytes
    let afterSourceID = afterRequestID + pData[3 + pData[2]];
    let afterDestinationID = afterSourceID + pData[afterSourceID];
    return pData.slice(afterDestinationID + 1);
}

function UIntToString(uintArray: number[]) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}