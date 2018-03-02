import { Photo } from "./Photo";
import { Education } from "./Education";
import { Project } from "./Project";
import { Skill } from "./Skill";
import { WorkExperience } from "./WorkExperience";

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    introduciton?: string;
    interests?: string;
    education?: Education[];
    project?: Project[];
    skill?: Skill[];
    workExperience?: WorkExperience[];
    photos?: Photo[];
}