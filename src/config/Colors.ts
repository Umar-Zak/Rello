export default {
    green: "#97CBEC",
    deep_green: "#2c2a50",
    light: "#fbfbfb",
    grey:"#f2f2f4",
    dark_grey:"#a5a5a7"
}

const GRADIENTS = [
    ['#3f5efb', '#9e52b3', '#fc466b'],
    ['#0edbad', '#53b397', '#4cd1c9'],
    ['#ffde01', '#f7931a', '#f4a42b'],
    ['#a5d34c', '#135d48', '#0edbad'],
    ['#f4a42b', '#ff6666', '#fd3a5c']
  ]


  export const getGradients = () => {
   return GRADIENTS[ Math.floor(Math.random() * (GRADIENTS.length))]
  }