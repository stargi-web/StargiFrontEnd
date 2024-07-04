export interface OpportunityModel{
    id?:number,
    ruc:number,
    businessName:string,
    sfaOpportunityNumber:number,
    creationDateSfaOpp:Date,
    opportunityType:string,
    product:string,
    otherDetails:string,
    createdAt:Date,
    status:string,
    estimatedClosingDate:Date,
    commentary:string
}