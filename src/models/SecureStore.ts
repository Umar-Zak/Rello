import * as SecureStore from 'expo-secure-store';
import { DiscountInterface, GiftCardInterface, LoyaltyInterface } from './DTOS';


class SecureStorage {
private TOKEN = "user_token"
private DISCOUNT = "discount_cards"
private LOYALTY = "loyalty_cards"
private GIFT = "gift_cards"

 async storeToken(token: string){
    await SecureStore.setItemAsync(this.TOKEN, token)
 }

 async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(this.TOKEN)
 }

 async removeToken() {
   await SecureStore.deleteItemAsync(this.TOKEN)
 }


 async saveDiscountCards(discountCards: DiscountInterface[]) {
   await SecureStore.setItemAsync(this.DISCOUNT, JSON.stringify(discountCards))
 }


 async getSaveDiscountCards(){
   const savedDiscountsCards = await SecureStore.getItemAsync(this.DISCOUNT) as string
   const discountCards = JSON.parse(savedDiscountsCards) as DiscountInterface[]
   return discountCards? discountCards : []
 }

 async saveLoyaltyCards(loyaltyCards: LoyaltyInterface[]) {
   await SecureStore.setItemAsync(this.LOYALTY, JSON.stringify(loyaltyCards))
 }

 async getSavedLoyaltyCards() {
   const savedLoyaltyCards = await SecureStore.getItemAsync(this.LOYALTY) as string
   const loyaltyCards = JSON.parse(savedLoyaltyCards) as LoyaltyInterface[]
   return loyaltyCards? loyaltyCards : []
 }

 async saveGiftCards(giftCards: GiftCardInterface[]) {
   await SecureStore.setItemAsync(this.GIFT, JSON.stringify(giftCards))
 }


 async getSavedGiftCards() {
   const savedGiftCards = await SecureStore.getItemAsync(this.GIFT) as string
   const giftCards = JSON.parse(savedGiftCards) as GiftCardInterface[]
   return giftCards? giftCards : []
 }

}

export default new SecureStorage()