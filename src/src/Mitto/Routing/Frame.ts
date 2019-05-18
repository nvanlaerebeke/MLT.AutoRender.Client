export class Frame {
    public readonly MessageType: string;
    public readonly RequestID: string;
    public readonly Name:string;
    public readonly Data:number[];

    constructor(pMessageType: string, pRequestID: string, pName:string, pData: number[]) {
        this.MessageType = pMessageType;
        this.RequestID = pRequestID;
        this.Name = pName;
        this.Data = pData;
    }

    getBytes() {
        let arrData: number[] = [];
        let arrID = toUTF8Array(this.RequestID);
        let arrName = toUTF8Array(this.Name);

        arrData.push(GetMessageTypeByte(this.MessageType));
        arrData.push(arrID.length);
        arrID.forEach(b => arrData.push(b));
        arrData.push(arrName.length);
        arrName.forEach(b => arrData.push(b));
        arrData.push(1); // = json format
        this.Data.forEach(b => arrData.push(b));
        return arrData;
    }
    
}

export function CreateFromBytes(pData: number[]) {
    return new Frame(
        GetMessageTypeFromByte(pData[0]),
        GetRequestIDFromByteArray(pData),
        GetNameFromByteArray(pData),
        GetDataFromByteArray(pData)
    );
};

function GetRequestIDFromByteArray(pData: number[]) {
    let arrBytes = pData.slice(2, 2 + pData[1]);
    return UIntToString(arrBytes);
}

function GetNameFromByteArray(pData: number[]) {
    let afterRequestID = 2 + pData[1];
    let end  = afterRequestID + pData[afterRequestID] + 1;
    let arrBytes = pData.slice(afterRequestID, end);
    return UIntToString(arrBytes);
}

function GetDataFromByteArray(pData: number[]) {
    let afterRequestID = 2 + pData[1];
    let afterName  = afterRequestID + 1 + pData[afterRequestID] + 1;
    let arrData = pData.slice(afterName);
    return arrData;
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

function UIntToString(uintArray: number[]) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}