import { LoyaltyInterface, LoyaltyTransaction, SubsribedLoyalty } from "../models/DTOS";
import SecureStore from "../models/SecureStore";
import Auth from "./Auth";
import Https from "./Https";

class LoyaltyService extends Https {

    constructor(){
        super()
    }

   async getAllLoyaltyCards(){
        try {
           const {data} = await this.get<LoyaltyInterface[]>("loyalty_merchant")
           await SecureStore.saveLoyaltyCards(data)
           
           return data
        } catch (error) {
            const savedLoyaltyCards = await SecureStore.getSavedLoyaltyCards()
            return savedLoyaltyCards
        }
    }


    async createLoyalty(body: SubsribedLoyalty){
        try {
           const {data} = await this.post<SubsribedLoyalty>("loyalty_customer", body)
           return data
        } catch (error) {
            throw error
        }
    }
    
    async getSubscriptions(){
        try {
           const user = await Auth.getUserProfile()
           const {data} = await this.get<SubsribedLoyalty[]>(`loyalty_customer/clientfind/${user.contact}`)
          return data
        } catch (error) {
            throw error
        }
    }


    async getCustomerLoyaltyTransaction() {
        try {
            const user = await Auth.getUserProfile()
            console.log(`loyalty_customer/transactionbyContact/${user.contact}`);
            
            const {data} = await this.get<LoyaltyTransaction[]>(`loyalty_customer/transactionbyContact/${user.contact}`)
           return data
        } catch (error) {
            throw error
        }
    }

}



export default new LoyaltyService()