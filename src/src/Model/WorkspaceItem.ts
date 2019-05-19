import { Project } from "./Project";
import { VideoInfo } from "./VideoInfo";

export class WorkspaceItem {
    ID!: string;
    Project!: Project;
    New!: VideoInfo;
    Final!: VideoInfo;
}