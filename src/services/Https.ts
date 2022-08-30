import axios from "axios"
import SecureStore from "../models/SecureStore"


class Https {
   protected get = axios.get
   protected post = axios.post
   protected put = axios.put
   protected patch = axios.patch
   protected delete = axios.delete
   
   constructor() {
        axios.defaults.baseURL = "https://coralappmtech.herokuapp.com/api/"
        this.initAxios()
    }

    protected setHeader(token: string){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

    async initAxios(){
        const token = await SecureStore.getToken() as unknown as string
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
}

type Error = {
    message: string
    stack: string | null
}

export interface APIErrorResponse {
    response: {
        data: Error
    }
}

export default Https