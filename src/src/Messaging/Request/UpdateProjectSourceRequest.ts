import { RequestMessage } from '../../Mitto/Messaging/Request/RequestMessage';

export class UpdateProjectSourceRequest extends RequestMessage  {
    ItemID!: string;
    ProjectSourceName!: string;

    constructor(pID: string, pName: string) {
        super();
        this.ItemID = pID;
        this.ProjectSourceName = pName;
    }
}