import { LoyaltyInterface, SubsribedLoyalty } from "../models/DTOS";
import SecureStore from "../models/SecureStore";
import Https from "./Https";

class LoyaltyService extends Https {

    constructor(){
        super()
    }

   async getAllLoyaltyCards(){
        try {
           const {data} = await this.get<LoyaltyInterface[]>("loyalty_customer")
           await SecureStore.saveLoyaltyCards(data)
           return data
        } catch (error) {
            const savedLoyaltyCards = await SecureStore.getSavedLoyaltyCards()
            return savedLoyaltyCards
        }
    }


    async createLoyalty(body: SubsribedLoyalty){
        try {
           const {data} = await this.post<LoyaltyInterface>("loyalty_customer", body)
           return data
        } catch (error) {
            throw error
        }
    }
    
}



export default new LoyaltyService()