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
    details: string
    contacts: string
    location: Coordinates[]
}

export type Coordinates = {
    _id: string
    longitude: string
    latitude: string
}

export type SubscribedDiscount = {
    merchantcode: string 
    companyname: string
    address: string 
    discountype: string
    percentage: number 
    clientcode: string
    discountid: string
    image: string
}


export type SubsribedLoyalty = {
    merchantcode: string,
    clientcode: string,
    companyname: string,
   address: string,
   amount: number,
   point: number,
   loyaltyid: string
   image: string
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
    details: string
    image: string
    contact: string
    location: Coordinates[]
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


export interface Promotion {
     imageurl: string
     merchantcode: string
     detail: string
     contact: string
     createdAt: string
     promotion: string
     updatedAt: string
}

export type ContactPayload = {
    email: string,
    contact: string,
    title: string,
    message: string
}

export interface ProductAuth {
    merchantcode: string
    code: string
    detail: string
    imageurl: string
    id: string
}