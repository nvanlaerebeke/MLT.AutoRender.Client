import { RequestMessage } from '../../Mitto/Messaging/Request/RequestMessage';

export class GetStatusRequest extends RequestMessage  {
    private WorkspaceItemIDs: string[] = [];

    constructor(pProjectID?: string) {
        super();
        if(pProjectID) {
            this.WorkspaceItemIDs.push(pProjectID);
        }
    }
}