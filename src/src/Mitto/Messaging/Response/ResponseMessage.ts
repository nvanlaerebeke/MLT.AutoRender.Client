import { Message } from "../Message";
import { RequestMessage } from "../Request/RequestMessage";

export class ResponseMessage extends Message {
    public Status!: string;

    constructor(pRequestMessage: RequestMessage) {
        super(pRequestMessage.ID, "Response");
    }
}