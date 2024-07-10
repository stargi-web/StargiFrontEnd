export interface OpportunityModel{
    id?:number,
    ruc:number,
    businessName:string,
    sfaNumber:number,
    oppSfaDateCreation:Date,
    type:string,
    product:string,
    otherDetails:string,
    createdAt:Date,
    updatedAt:Date
    state:string,
    estimatedClosingDate:Date,
    commentary:string,
    contactName?:string,
    contactNumber?:string
}