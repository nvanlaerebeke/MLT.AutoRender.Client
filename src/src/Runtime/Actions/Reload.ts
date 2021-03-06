import * as RequestManager from "../../Mitto/Messaging/Manager/RequestManager";
import { Request } from "../../Mitto/Messaging/Request"
import { ReloadRequest } from "../../Messaging/Request/ReloadRequest"
import { GetStatusResponse } from "../../Messaging/Response/GetStatusResponse";

export class Reload {
    public Send(pCallback: (r: GetStatusResponse) => void) {
        RequestManager.DoRequest(
            new Request(
                new ReloadRequest(),
                pCallback
            )
        );
    }
}