import { RequestMessage } from '../../Mitto/Messaging/Request/RequestMessage';
import { WorkspaceUpdatedEventArgs } from "../EventArgs/WorkspaceUpdatedEventArgs";

export class SendWorkspaceUpdateRequest extends RequestMessage  {
    Updates?: WorkspaceUpdatedEventArgs[];
}