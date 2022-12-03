import {groupBy} from "lodash"
import { LoyaltyTransaction, LoyalRedemption } from './../models/DTOS';


export const calculateAccumulatedPointsPerMerchant = (transactions: LoyaltyTransaction[]) => {
    let total = 0
    for (let trans of transactions){
        total += trans.awardedpoint
    }
    return total
}

export const  calculateRedeemedPointsPerMerchants = (redemptions: LoyalRedemption[] | null) => {
    let results = 0
    if(!redemptions) return  results

    for (let redemption of redemptions){
        results += redemption.points
    }

    return results
}


export const groupLoTransaction = (loyaltyTrans: LoyaltyTransaction[]) => {
    const groupedLoyaltyTransactions = groupBy(loyaltyTrans, (trans) => trans.companyname)
    return groupedLoyaltyTransactions
}