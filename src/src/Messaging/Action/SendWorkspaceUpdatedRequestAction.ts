import { Action } from "../../Mitto/Messaging/Action/Action";
import { SendWorkspaceUpdateRequest } from "../Notification/SendWorkspaceUpdateRequest";
import * as EventRegistry from "../Action/EventRegistry";

export class SendWorkspaceUpdatedRequestAction extends Action<SendWorkspaceUpdateRequest> {
    public Start() {
        EventRegistry.Raise("workspaceupdated", this.Request.Updates);
    }
}