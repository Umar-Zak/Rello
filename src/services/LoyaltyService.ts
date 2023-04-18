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
           const {data} = await this.get<LoyaltyInterface[]>("merchantloyalty/findall")
           await SecureStore.saveLoyaltyCards(data)
           
           return data
        } catch (error) {
            const savedLoyaltyCards = await SecureStore.getSavedLoyaltyCards()
            return savedLoyaltyCards
        }
    }


    async createLoyalty(body: SubsribedLoyalty){
        try {
           const {data} = await this.post<SubsribedLoyalty>("customerloyalty", body)
           return data
        } catch (error) {
            throw error
        }
    }
    
    async getSubscriptions(){
        try {
           const user = await Auth.getUserProfile()
           const {data} = await this.get<SubsribedLoyalty[]>(`customerloyalty/findclient/${user.contact}`)
           await SecureStore.saveSubscribedLoyaltiesCards(data)
          return data
        } catch (error) {
            const savedSubscribedLoyaltyCards = await SecureStore.getSavedSubscribedLoyaltyCards()
            return savedSubscribedLoyaltyCards
        }
    }


    async getCustomerLoyaltyTransaction() {
        try {
            const user = await Auth.getUserProfile()
            const {data} = await this.get<LoyaltyTransaction[]>(`transactionloyalty/findclient/${user.contact}`)
           return data
        } catch (error) {
            throw error
        }
    }

    async approveRedemtion(id: string) {
        try {
          const {data} =  await this.get<LoyalRedemption[]>(`transactionloyalty/approve_redemption/${id}`)
          return data
        } catch (error) {
            console.log("Error Redeming", error);
            throw error
        }
    }
}



export default new LoyaltyService()