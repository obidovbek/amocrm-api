import { NextFunction } from "express";
import { IContact } from "../amocrm.service";

export interface IAmocrmService{
    getContact: ()=>void,
    createOrUpdateContact: (r:IContact)=>void,
    makeLead: (n:number)=>void,
    updateContact: (contact:IContact, id:number)=>void,
    createContact: (contact:IContact)=>void,
}