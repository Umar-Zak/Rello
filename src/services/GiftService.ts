import { GiftCardInterface } from "../models/DTOS";
import SecureStore from "../models/SecureStore";
import Https from "./Https";

class GiftService extends Https {

    constructor(){
        super()
    }

    async getAllGiftCards(){
        try {
           const {data} = await this.get<GiftCardInterface[]>("giftcard_customer")
           await SecureStore.saveGiftCards(data)
           return data
        } catch (error) {
            const savedGiftCards = await SecureStore.getSavedGiftCards()
            return savedGiftCards
        }
    }
}



export default new GiftService()