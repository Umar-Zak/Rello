import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiscountInterface, GiftCardInterface, LoyaltyInterface, SubscribedDiscount, SubsribedLoyalty } from './DTOS';

// All the functions that store data on the user
// device are implemented currently with the intention
// that our per user data currently is minimal.
// These functions will need more logics to reduce the 
// amount of data we store on the user's  device when 
// per user data grows. For now, let's not complicate it since
// our data is fairly small. "Premature optimization is the root of all evils"

class SecureStorage {
private TOKEN = "user_token"
private DISCOUNT = "discount_cards"
private SUBSCRIBED_DISCOUNTS = "subscribed_discounts"
private LOYALTY = "loyalty_cards"
private SUBSCRIBED_LOYALTIES = "subscribed_loyalties"
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

 async saveSubsribedDiscounts(subscribedDiscounts: SubscribedDiscount[]){
  await AsyncStorage.setItem(this.SUBSCRIBED_DISCOUNTS, JSON.stringify(subscribedDiscounts))
 }


 async getSaveDiscountCards(){
   const savedDiscountsCards = await AsyncStorage.getItem(this.DISCOUNT) as string
   const discountCards = JSON.parse(savedDiscountsCards) as DiscountInterface[]
   return discountCards? discountCards : []
 }

 async getSavedSubsribedDiscounts(){
  const savedSubscribedDiscounts = await AsyncStorage.getItem(this.SUBSCRIBED_DISCOUNTS) as string
  const subscribedDiscounts = JSON.parse(savedSubscribedDiscounts) as SubscribedDiscount[]
  return subscribedDiscounts? subscribedDiscounts : []
 }

 
 async saveLoyaltyCards(loyaltyCards: LoyaltyInterface[]) {
   await AsyncStorage.setItem(this.LOYALTY, JSON.stringify(loyaltyCards))
 }

 async saveSubscribedLoyaltiesCards(subscribedLoyaltyCards: SubsribedLoyalty[]){
  await AsyncStorage.setItem(this.SUBSCRIBED_LOYALTIES, JSON.stringify(subscribedLoyaltyCards))
 }


 async getSavedSubscribedLoyaltyCards(){
  const savedSusbcribedLoyaltyCards = await AsyncStorage.getItem(this.SUBSCRIBED_LOYALTIES) as string
  const subscribedLoyaltyCards = JSON.parse(savedSusbcribedLoyaltyCards) as SubsribedLoyalty[]
  return subscribedLoyaltyCards ? subscribedLoyaltyCards : []
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