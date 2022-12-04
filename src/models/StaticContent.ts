import { DiscountInterface, GiftCardInterface, LoyaltyInterface } from "./DTOS"

const splashContents = [
    {
        image: require("../assets/Corral_Gift_Card.png"),
        title: 'A Gift from the Cart!',
        content:
          'Gift a loved one a shopping experience with Gift Cards from partner stores.',
      },
      {
        image: require("../assets/Corral_Discount_.png"),
        title: 'Buy more with less!',
        content:
          'Get massive discounts on purchases with Discount Cards from your preferred stores.',
      },
      {
        image: require("../assets/Corral_Loyalty.png"),
        title: 'Shop . Earn . Redeem',
        content:
          'Earn and redeem points for exciting rewards as you shop with Loyalty Cards from your favourite stores.',
      },
]
 
export const getSplashContent = () => {
    return splashContents
}




