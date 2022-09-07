import { Alert } from "react-native";
import { DiscountInterface, SubscribedDiscount } from "../models/DTOS";
import SecureStore from "../models/SecureStore";
import Auth from "./Auth";
import Https from "./Https";


class DiscountService  extends Https {

    constructor(){
        super()
    }

   async getAllDiscountCards(){
        try {
          const {data} =  await this.get<DiscountInterface[]>("discount_merchant")
          await SecureStore.saveDiscountCards(data)
          return data
        } catch (error) {
          const savedDiscountCards =  await SecureStore.getSaveDiscountCards()
          return savedDiscountCards
        }
    }

    async createDiscount(body: SubscribedDiscount){
      try {
        const {data} = await this.post<SubscribedDiscount>("discount_customer", body)
        return data
      } catch (error: any) {
        throw error
        
      }
    }

    async getSubscribedDiscounts(){
      try {
         const user = await Auth.getUserProfile()
        const {data} = await this.get<SubscribedDiscount[]>(`discount_customer/clientfind/${user.contact}`)
        return data
      } catch (error) {
        throw error
      }
    }
}

export default new DiscountService()