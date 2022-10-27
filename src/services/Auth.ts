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
    deviceID: string
}


export type UserProfile = {
    _id: string
    email: string
    firstname: string
    lastname: string
    contact: string
    phone: string
    name: string
    deviceID: string
    
}


export interface SiginInPayload {
    contact: string
    password: string
    deviceID: string
}



class Auth extends Https {

    constructor(){
        super()
    }

   async signup(body:SignUpPayload){
       try {
        const {data} = await this.post<SignUpPayload & {token: string}>("userscustomer", body)
        this.setHeader(data.token)
        await SecureStore.storeToken(data.token)
       } catch (error ) {
            throw error
       }

    }

    async signin(body:SiginInPayload){
        try {
         const {data} = await this.post<SiginInPayload & {token: string}>("userscustomer/login", body)
         this.setHeader(data.token)
         await SecureStore.storeToken(data.token)
         
        } catch (error ) {
            throw error
        }
 
     }

     async logout() {
       await SecureStore.removeToken()
     }

     private decodeToken(token: string): {id: string, exp: number, iat: number}{
        const decodedToken = jwtDecode<{id: string, exp: number, iat: number}>(token)
        return decodedToken
     }

     async getUserProfile(){
        try {
            const token = await SecureStore.getToken() as string
            const user = this.decodeToken(token)
            const {data} = await this.get<UserProfile>(`userscustomer/${user.id}`)
            return data
        } catch (error) {
            throw error
        }
     }
    
     async verifyDevice() {
        try {
           const deviceID = await SecureStore.getDeviceToken() as string
           const res = await this.get<UserProfile>(`userscustomer/me/${deviceID}`)
        } catch (error: any) {
            await this.logout()
            throw error
        }
     }

     async findUserByContact(body: {contact: string}) {
        try {
           const {data} =  await this.post<UserProfile>("userscustomer/auth/finduser", body)
           return data
        } catch (error) {
            throw error
        }
     }

     async resetUserPassword(body: SiginInPayload){
        try {
          const {data} =  await this.post<UserProfile & {token: string}>("userscustomer/auth/resetpassword", body)
          this.setHeader(data.token)
          await SecureStore.storeToken(data.token)
        } catch (error) {
            throw error
        }
     }
     
}


export default new Auth()