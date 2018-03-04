export interface WorkExperience {
    id: number;
    title: string;
    company: string;
    location: string;
    startMonth: Date;
    startYear: Date;
    isCurrentlyWorking: boolean;
    endMonth: Date;
    endYear: Date;
    description: string;
    dateAdded: Date;
}