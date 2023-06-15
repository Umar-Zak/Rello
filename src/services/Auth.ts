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
        const {data} = await this.post<SignUpPayload & {token: string}>("customer", body)
        this.setHeader(data.token)
        await SecureStore.storeToken(data.token)
       } catch (error ) {
            throw error
       }

    }

    async signin(body:SiginInPayload){
       
        try {
         const {data} = await this.post<SiginInPayload & {token: string}>("customer/login", body)
         this.setHeader(data.token)
         await SecureStore.storeToken(data.token)
        } catch (error ) {
            throw error
        }
 
     }

     async logout() {
       await SecureStore.removeToken()
     }

     private decodeToken(token: string): {id: string, exp: number, iat: number} | undefined{
        try {
            const decodedToken = jwtDecode<{id: string, exp: number, iat: number}>(token)
        return decodedToken
        } catch (error) {
            return undefined
        }
     }

     async getUserProfile(){
        try {
            const token = await SecureStore.getToken() as string
            const user = this.decodeToken(token)
            const {data} = await this.get<UserProfile>(`customer/${user?.id}`)
            return data
        } catch (error:any) {
            throw error
        }
     }
    
     async verifyDevice() {
        try {
           const deviceID = await SecureStore.getDeviceToken() as string
           const res = await this.get<UserProfile>(`customer/me/${deviceID}`)
        } catch (error: any) {
            throw error
        }
     }

     async findUserByContact(body: {contact: string}) {
        try {
           const {data} =  await this.post<UserProfile>("customer/auth/finduser", body)
           return data
        } catch (error) {
            throw error
        }
     }

     async resetUserPassword(body: SiginInPayload){
        try {
          const {data} =  await this.post<UserProfile & {token: string}>("customer/auth/resetpassword", body)
          this.setHeader(data.token)
          await SecureStore.storeToken(data.token)
        } catch (error) {
            throw error
        }
     }
     
}


export default new Auth()