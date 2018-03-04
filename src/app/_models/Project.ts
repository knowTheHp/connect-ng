export interface Project {
    id: number;
    name: string;
    startMonth: Date;
    startYear: Date;
    isOnGoing: boolean;
    endMonth: Date;
    endYear: Date;
    description: string;
    url: string;
    dateAdded: Date;
}