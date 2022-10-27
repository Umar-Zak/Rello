import {io} from "socket.io-client"


const IO = io("https://coralappmtech.herokuapp.com");
const socket = IO.connect()
export default socket