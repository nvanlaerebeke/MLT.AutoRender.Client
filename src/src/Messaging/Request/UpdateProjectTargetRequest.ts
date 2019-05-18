import { RequestMessage } from '../../Mitto/Messaging/Request/RequestMessage';

export class UpdateProjectTargetRequest extends RequestMessage  {
    ItemID!: string;
    ProjectTargetName!: string;

    constructor(pID: string, pName: string) {
        super();
        this.ItemID = pID;
        this.ProjectTargetName = pName;
    }
}