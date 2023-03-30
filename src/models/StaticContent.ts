

const splashContents = [
  {
     tag:"Gift Cards",
      image: require("../assets/3d-gift-card2.png"),
      title: 'A Gift from the Cart!',
      content:
        'Gift a loved one a shopping experience with Gift Cards from partner stores.',
    },
    {
      tag:"Discounts",
      image: require("../assets/3d-discount-card2.png"),
      title: 'Buy more with less!',
      content:
        'Get massive discounts on purchases with Discount Cards from your preferred stores.',
    },
    {
      tag:"Rewards",
      image: require("../assets/3d-loyalty-card.png"),
      title: 'Shop . Earn . Redeem',
      content:
        'Earn and redeem points for exciting rewards as you shop with Loyalty Cards from your favourite stores.',
    },
]
export const getSplashContent = () => {
    return splashContents
}



const faqs = [
  {
    question: "What is Corral?",
    answer: "Corral is a platform that offers a range of services, including discounts, loyalty programs, gift card services and product authentication from partner stores and Manufacturers"
  },
  {
    question: "How do I sign up for Corral?",
    answer: "To sign up for Corral, you will need to download the app from the App Store or Google Play Store and create an account. You will be asked to provide some basic information, such as your name, email address, and phone number."
  },
  {
    question: "How do I access the discounts and loyalty programs offered through Corral?",
    answer: "To access the discounts and loyalty programs offered through Corral, you will need to log in to your account and browse through the available offers. Click on the card of your preferred store and click on the subscribe button."
  },
  {
    question: "How do I redeem Discounts and Loyalty Points Earned ?",
    answer: "You can redeem discounts and loyalty rewards by showing the  discount card within the app to the teller at the corresponding store at the time of purchase, or showing the loyalty card within the app to the teller at corresponding store to redeem points earned."
  },
  {
    question: "How do I purchase and redeem gift cards through the Corral mobile app?",
    answer: "To purchase a gift card through Corral, you will need to select the store, select the preferred gift card and follow the prompt to make payment. Once the gift card has been purchased, the gift card is transferred to your wallet, which can be accessed by clicking on your profile."
  },
  {
    question: "How do I redeem my gift card?",
    answer: "You can redeem your gift card by showing the gift card within the app to the teller at the time of purchase."
  },  
  {
    question: "How do I use the product authentication service offered through the rewards service mobile app?",
    answer: "To use the product authentication service offered through Corral, you will need to click on product verification and click on the corresponding manufacturers image. After clicking the manufacturers image, enter the product's unique number into the text box provided. The app will then verify the authenticity of the product and provide you with the appropriate information."
  },
]

export const getAllFaqs = () => {
  return faqs
}

