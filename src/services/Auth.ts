import Https from "./Https";
import jwtDecode from "jwt-decode";
import SecureStore from "../models/SecureStore";

export interface SignUpPayload {
    email: string
    firstname: string
    lastname: string
    contact: string
    phone: string
    password: string
    name?: string
}



export interface SiginInPayload {
    contact: string
    password: string
}



class Auth extends Https {

    constructor(){
        super()
    }

   async signup(body:SignUpPayload){
       try {
        const {data} = await this.post<SignUpPayload & {token: string}>("userscustomer", body)
        await SecureStore.storeToken(data.token)
        
       } catch (error ) {
            throw error
       }

    }

    async signin(body:SiginInPayload){
        try {
         const {data} = await this.post<SiginInPayload & {token: string}>("userscustomer/login", body)
        await SecureStore.storeToken(data.token)
         
        } catch (error ) {
       throw error
        }
 
     }

     private decodeToken(token: string): {_id: string, exp: number, iat: number}{
        const decodedToken = jwtDecode<{_id: string, exp: number, iat: number}>(token)
        return decodedToken
     }
}


export default new Auth()