import { Guid } from "guid-typescript";
import { Message } from "../Message";

export class RequestMessage extends Message {
    constructor() {
        super(Guid.create().toString(), "Request");
    }
}