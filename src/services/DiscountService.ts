import { Alert } from "react-native";
import { DiscountInterface, SubscribedDiscount } from "../models/DTOS";
import SecureStore from "../models/SecureStore";
import Https from "./Https";


class DiscountService  extends Https {

    constructor(){
        super()
    }

   async getAllDiscountCards(){
        try {
          const {data} =  await this.get<DiscountInterface[]>("discount_customer")
          await SecureStore.saveDiscountCards(data)
          return data
        } catch (error) {
          const savedDiscountCards =  await SecureStore.getSaveDiscountCards()
          return savedDiscountCards
        }
    }

    async createDiscount(body: SubscribedDiscount){
      try {
        const {data} = await this.post<DiscountInterface>("discount_customer", body)
        return data
      } catch (error) {
        throw error
        
      }
    }
}

export default new DiscountService()