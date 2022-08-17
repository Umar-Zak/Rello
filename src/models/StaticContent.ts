
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

export const getSplashContent = () => {
    return splashContents
}