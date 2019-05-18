export class Project {
    ProjectName!: string;
    Status!: string;
    SourceName!: string;
    SourceExists!: boolean;
    SourceIsValid!: boolean;
    TargetExists!: boolean;
    TargetIsValid!: boolean;
    TargetName!: string;
    Progress!: number;
    StartTime!: number;
    TimeTaken!: number;
}