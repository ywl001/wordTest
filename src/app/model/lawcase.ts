import { Person } from "./person";

export interface Lawcase{
    caseId:string ;
    caseName:string;
    caseDesc?:string;
    station?:string;

    relationPerson?:Person[];

  
}