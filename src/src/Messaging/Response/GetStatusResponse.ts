import { ResponseMessage } from '../../Mitto/Messaging/Response/ResponseMessage';
import { WorkspaceItem } from "../../Model/WorkspaceItem";

export class GetStatusResponse extends ResponseMessage  {
    WorkspaceItems!: WorkspaceItem[];
}