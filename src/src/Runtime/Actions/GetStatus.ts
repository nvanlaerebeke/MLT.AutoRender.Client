import * as RequestManager from "../../Mitto/Messaging/Manager/RequestManager";
import { Request } from "../../Mitto/Messaging/Request"
import { GetStatusRequest } from "../../Messaging/Request/GetStatusRequest"
import { GetStatusResponse } from "../../Messaging/Response/GetStatusResponse";

export class GetStatus {
    private ProjectID?: string;
    constructor(pProjectID?: string) {
        if(pProjectID) {
            this.ProjectID = pProjectID;
        }
    }

    public Send(pCallback: (r: GetStatusResponse) => void) {
        RequestManager.DoRequest(
            new Request(
                (this.ProjectID) ? new GetStatusRequest(this.ProjectID): new GetStatusRequest(),
                pCallback
            )
        );
    }
}