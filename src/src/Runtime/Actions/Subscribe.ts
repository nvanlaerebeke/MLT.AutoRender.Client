import * as RequestManager from "../../Mitto/Messaging/Manager/RequestManager";
import { Request } from "../../Mitto/Messaging/Request"
import { WorkspaceUpdatedSubscribe } from "../../Messaging/Subscribe/WorkspaceUpdatedSubscribe"
import { ACKResponse } from "../../Mitto/Messaging/Response/ACKResponse";

export class Subscribe {
    public Send(pCallback: (r: ACKResponse) => void) {
        RequestManager.DoRequest(
            new Request(
                new WorkspaceUpdatedSubscribe(),
                pCallback
            )
        );
    }
}