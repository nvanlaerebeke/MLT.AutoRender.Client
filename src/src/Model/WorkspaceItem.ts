import { Project } from "./Project";
import { VideoInfo } from "./VideoInfo";

export class WorkspaceItem {
    Selected!: boolean;
    ID!: string;
    Project!: Project;
    New!: VideoInfo;
    Final!: VideoInfo;
}