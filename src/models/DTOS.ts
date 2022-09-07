export interface DiscountInterface {
    merchantcode: string 
    companyname: string
    address: string 
    discountype: string
    percentage: number 
    count: number 
    createdAt: Date
    updatedAt: Date 
    id: string
    clientcode?: string
    discountid: string
}

export type SubscribedDiscount = {
    merchantcode: string 
    companyname: string
    address: string 
    discountype: string
    percentage: number 
    clientcode: string
    discountid: string
}


export type SubsribedLoyalty = {
    merchantcode: string,
    clientcode: string,
    companyname: string,
   address: string,
   amount: number,
   point: number,
   loyaltyid: string
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
    id: string
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