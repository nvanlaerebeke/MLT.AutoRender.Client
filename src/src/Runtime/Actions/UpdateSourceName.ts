import * as RequestManager from "../../Mitto/Messaging/Manager/RequestManager";
import { Request } from "../../Mitto/Messaging/Request"
import { UpdateProjectSourceRequest } from "../../Messaging/Request/UpdateProjectSourceRequest"
import { ACKResponse } from "../../Mitto/Messaging/Response/ACKResponse";

export class UpdateSourceName {
    private ProjectID: string;
    private NewName: string;

    constructor(pProjectID: string, pNewName: string) {
        this.ProjectID = pProjectID;
        this.NewName = pNewName;
    }

    public Send(pCallback: (r: ACKResponse) => void) {
        RequestManager.DoRequest(
            new Request(
                new UpdateProjectSourceRequest(
                    this.ProjectID,
                    this.NewName
                ),
                pCallback
            )
        );
    }
}