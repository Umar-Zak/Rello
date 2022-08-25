import { DiscountInterface, GiftCardInterface, LoyaltyInterface } from "./DTOS"

const splashContents = [
    {
        image: require("../assets/boy-credit.png"),
        title: 'Buy Digital Gift Card',
        content:
          'Digital Gift Vouchers. Shop for a gift card for someone with Rello Digital Gift Vouchers.',
      },
      {
        image: require("../assets/boy.png"),
        title: 'Discount for your client',
        content:
          'Design your own digital discount for your customers',
      },
      {
        image: require("../assets/onboard.png"),
        title: 'Award Customers with points',
        content:
          'Loyalty is the key. Award clients with points for their service',
      },
]

const discounts: DiscountInterface[] = [
 {
  address: "Test address",
  companyname:"Melcom Ghana",
  count:2,
  createdAt: new Date(),
  discountype: "test type",
  id: "testid1",
  merchantcode: "code",
  percentage: 15,
  updatedAt: new Date()
 },
 {
  address: "Test address",
  companyname:"U84 Supermarket",
  count:2,
  createdAt: new Date(),
  discountype: "test type",
  id: "testid2",
  merchantcode: "code",
  percentage: 20,
  updatedAt: new Date()
 },
 {
  address: "Test address",
  companyname:"All Needs Supermarket",
  count:2,
  createdAt: new Date(),
  discountype: "test type",
  id: "testid3",
  merchantcode: "code",
  percentage: 13,
  updatedAt: new Date()
 }
]

export const getDiscounts = () => {
  return discounts
}

const giftCards: GiftCardInterface[] = [
  {
    address: "Test address",
    category:"Test category",
    companyname: "Lyospot Ltd",
    count: 20.00,
    createdAt: new Date(),
    merchantcode: "Test code",
    updatedAt: new Date(),

  },
  {
    address: "Test address",
    category:"Test category",
    companyname: "Crysp Club",
    count: 30.00,
    createdAt: new Date(),
    merchantcode: "Test code",
    updatedAt: new Date(),
    
  }
]


export const getGiftCards = () => {
  return giftCards
}
const loyalties: LoyaltyInterface[] = [
  {
    address:"Test address",
    amount: 70,
    companyname:"Agape Supermarket",
    count: 4,
    createdAt: new Date(),
    id:"testid1",
    merchantcode: "Test code",
    point: 20,
    updatedAt: new Date()
  },
  {
    address:"Test address",
    amount: 20,
    companyname:"Tiens Mart",
    count: 4,
    createdAt: new Date(),
    id:"testid2",
    merchantcode: "Test code",
    point: 20,
    updatedAt: new Date()
  }
]

export const getLoyalties = () => {
  return loyalties
}
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


