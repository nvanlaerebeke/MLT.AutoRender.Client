/**
 * ToDo: clean this up, move creating the action to the same class that creates
 * the messages and make it dynamic
 */
import { RequestMessage } from "../Request/RequestMessage";
import { SendWorkspaceUpdateRequest } from "../../../Messaging/Notification/SendWorkspaceUpdateRequest";
import { SendWorkspaceUpdatedRequestAction } from "../../../Messaging/Action/SendWorkspaceUpdatedRequestAction";

class ActionManager {
    Handle(pMessage: RequestMessage) {
        let Action = this.CreateAction(pMessage);
        if(Action) {
            Action.Start();
        }
    }

    /**
     * ToDo: Move to separate class and make dynamic
     * @param pRequest
     */
    private CreateAction(pMessage: RequestMessage) {
        switch(pMessage.Name) {
            case "SendWorkspaceUpdatedRequest":
                return new SendWorkspaceUpdatedRequestAction(pMessage as SendWorkspaceUpdateRequest);
        }
        return null;
    }
}

let Manager = new ActionManager();
export function Handle(pMessage: RequestMessage) {
    Manager.Handle(pMessage);
}