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
    image: string
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
    _id: string
    description: string
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

export interface DiscountTransaction {
    id: string
    companyname: string
    merchantcode: string
    clientcode: string
    discountype: string
    percentage: number
    total: number
    description: string
    discountapplied: number
    createdAt: string
}

export interface LoyaltyTransaction {
    _id: string
    merchantcode: string
    clientcode: string
    companyname: string
    amount: number
    points: number
    description: string
    toawardedpointstal: number
    awardedpoint: number
    createdAt: string
}

type Merchant = {
    companyname: string
    merchantcode: string
}

export interface LoyalRedemption {
  merchant: Merchant,
  clientcode: string,
  isApproved: boolean,
  points: number
}