import { WorkspaceItem } from "../../../Model/WorkspaceItem";

export function GetStatus(pItem: WorkspaceItem) {
    //if (IsUpdating) { return Status.Updating; }
    if(pItem.Project) {
        return pItem.Project.Status;
    }
    if (pItem.New) {
        return "ProjectMissing";
    }
    if (pItem.Final) {
        return "Finished";
    }
    return "Unknown";
}
