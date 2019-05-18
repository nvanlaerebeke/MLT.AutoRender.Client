export class Message {
    ID!: string;
    MessageType!: string;
    Name!: string;

    constructor(pID: string, pMessageType: string) {
        this.ID = pID;
        this.MessageType = pMessageType;
        this.Name = this.constructor.name;
    }
}