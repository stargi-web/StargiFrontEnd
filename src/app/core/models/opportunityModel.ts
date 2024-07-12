export interface OpportunityModel{
    id?:number,
    ruc:number,
    businessName:string,
    sfaNumber:number,
    oppSfaDateCreation:Date|string,
    type:string,
    product:string,
    otherDetails:string,
    createdAt:Date|string,
    updatedAt:Date|string
    state:string,
    estimatedClosingDate:Date|string,
    commentary:string,
    contactName?:string,
    contactNumber?:string
}