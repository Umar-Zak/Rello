export interface DiscountInterface {
    merchantcode: string 
    companyname: string
    address: string 
    discountype: string
    percentage: number 
    count: number 
    createdAt: Date
    updatedAt: Date 
    _id: string,
    clientcode?: string
}

export type SubscribedDiscount = {
    _id?: string
    merchantcode: string 
    companyname: string
    address: string 
    discountype: string
    percentage: number ,
    clientcode: string
}


export type SubsribedLoyalty = {
    _id?: string,
    merchantcode: string,
    clientcode: string,
    companyname: string,
   address: string,
   amount: number,
   point: number 
}


export interface LoyaltyInterface {
    merchantcode: string 
    companyname: string 
    address: string 
    amount: number 
    point: number
    count:number 
    createdAt: Date 
    updatedAt: Date
    _id: string
}

export interface GiftCardInterface {
    merchantcode: string 
    companyname: string
    address: string 
    category: string 
    count: number
    createdAt: Date
    updatedAt: Date
    _id: string
}