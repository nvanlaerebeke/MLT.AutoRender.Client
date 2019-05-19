import * as RequestManager from "../../Mitto/Messaging/Manager/RequestManager";
import { Request } from "../../Mitto/Messaging/Request"
import { UpdateProjectTargetRequest } from "../../Messaging/Request/UpdateProjectTargetRequest"
import { ACKResponse } from "../../Mitto/Messaging/Response/ACKResponse";

export class UpdateTargetName {
    private ProjectID: string;
    private NewName: string;

    constructor(pProjectID: string, pNewName: string) {
        this.ProjectID = pProjectID;
        this.NewName = pNewName;
    }

    public Send(pCallback: (r: ACKResponse) => void) {
        RequestManager.DoRequest(
            new Request(
                new UpdateProjectTargetRequest(
                    this.ProjectID,
                    this.NewName
                ),
                pCallback
            )
        );
    }
}