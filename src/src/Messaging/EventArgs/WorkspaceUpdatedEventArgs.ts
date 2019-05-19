import { WorkspaceItem } from "../../Model/WorkspaceItem";

export class WorkspaceUpdatedEventArgs {
    WorkspaceItem?: WorkspaceItem;
    WorkspaceAction?: string;
}