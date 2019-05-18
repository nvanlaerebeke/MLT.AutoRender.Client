import { RequestMessage } from '../../Mitto/Messaging/Request/RequestMessage';

export class GetStatusRequest extends RequestMessage  {
    WorkspaceItemIDs!: string[];

    constructor(pProjectID: string) {
        super();
        this.WorkspaceItemIDs = [ pProjectID ];
    }
}