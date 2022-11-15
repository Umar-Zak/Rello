import { DiscountInterface, GiftCardInterface, LoyaltyInterface } from "./DTOS"

const splashContents = [
    {
        image: require("../assets/Corral_Gift_Card.png"),
        title: 'Buy Digital Gift Card',
        content:
          'Digital Gift Vouchers. Shop for a gift card for someone with Rello Digital Gift Vouchers.',
      },
      {
        image: require("../assets/Corral_Discount_.png"),
        title: 'Discount for your client',
        content:
          'Design your own digital discount for your customers',
      },
      {
        image: require("../assets/Corral_Loyalty.png"),
        title: 'Award Customers with points',
        content:
          'Loyalty is the key. Award clients with points for their service',
      },
]
 
export const getSplashContent = () => {
    return splashContents
}

const loyaltyBackgrounds = [
  require("../assets/geo.png"),
  require("../assets/geo2.png"),
  require("../assets/geo3.png"),
  require("../assets/geo4.png"),
]

export const getLoyaltyBackground = () => {
  return loyaltyBackgrounds[ Math.floor(Math.random() * (loyaltyBackgrounds.length))]
}


