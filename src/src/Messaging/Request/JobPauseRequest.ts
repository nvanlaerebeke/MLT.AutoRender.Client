import { RequestMessage } from '../../Mitto/Messaging/Request/RequestMessage';

export class JobPauseRequest extends RequestMessage  {
    ItemID!: string;

    constructor(pID: string) {
        super();
        this.ItemID = pID;
    }
}