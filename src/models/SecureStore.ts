import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiscountInterface, GiftCardInterface, LoyaltyInterface } from './DTOS';


class SecureStorage {
private TOKEN = "user_token"
private DISCOUNT = "discount_cards"
private LOYALTY = "loyalty_cards"
private GIFT = "gift_cards"
private DEVICE = "expo_token"

async storeDeviceToken(token: string) {
  await SecureStore.setItemAsync(this.DEVICE, token)
}

async getDeviceToken(){
  return await SecureStore.getItemAsync(this.DEVICE)
}

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
   await AsyncStorage.setItem(this.DISCOUNT, JSON.stringify(discountCards))
 }


 async getSaveDiscountCards(){
   const savedDiscountsCards = await AsyncStorage.getItem(this.DISCOUNT) as string
   const discountCards = JSON.parse(savedDiscountsCards) as DiscountInterface[]
   return discountCards? discountCards : []
 }

 
 async saveLoyaltyCards(loyaltyCards: LoyaltyInterface[]) {
   await AsyncStorage.setItem(this.LOYALTY, JSON.stringify(loyaltyCards))
 }


 async getSavedLoyaltyCards() {
   const savedLoyaltyCards = await AsyncStorage.getItem(this.LOYALTY) as string
   const loyaltyCards = JSON.parse(savedLoyaltyCards) as LoyaltyInterface[]
   return loyaltyCards? loyaltyCards : []
 }

 async saveGiftCards(giftCards: GiftCardInterface[]) {
   await AsyncStorage.setItem(this.GIFT, JSON.stringify(giftCards))
 }


 async getSavedGiftCards() {
   const savedGiftCards = await AsyncStorage.getItem(this.GIFT) as string
   const giftCards = JSON.parse(savedGiftCards) as GiftCardInterface[]
   return giftCards? giftCards : []
 }

}

export default new SecureStorage()