import { LoyalRedemption } from './../models/DTOS';
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
            const {data} = await this.get<LoyaltyTransaction[]>(`loyalty_transaction/transactionbyContact/${user.contact}`)
           return data
        } catch (error) {
            throw error
        }
    }

    async approveRedemtion(id: string) {
        try {
          const {data} =  await this.get<LoyalRedemption[]>(`loyalty_transaction/approve_redemption/${id}`)
          return data
        } catch (error) {
            console.log("Error Redeming", error);
            throw error
        }
    }
}



export default new LoyaltyService()