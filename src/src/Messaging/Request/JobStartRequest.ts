import { RequestMessage } from '../../Mitto/Messaging/Request/RequestMessage';

export class JobStartRequest extends RequestMessage  {
    ItemID!: string;

    constructor(pID: string) {
        super();
        this.ItemID = pID;
    }
}