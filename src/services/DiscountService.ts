import { DiscountInterface } from "../models/DTOS";
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
}

export default new DiscountService()