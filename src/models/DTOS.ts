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

}