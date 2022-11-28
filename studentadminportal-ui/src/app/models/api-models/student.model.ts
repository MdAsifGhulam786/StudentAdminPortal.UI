import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface Student {
    id : string,
    firstName : string,
    LastName : string,
    email : string,
    dateOfBirth : string,
    mobile : number,
    profileImageUrl : string,
    genderId : string,
    gender : Gender,
    address : Address
}