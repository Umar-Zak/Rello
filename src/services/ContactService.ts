import { ContactPayload } from './../models/DTOS';
import Https from "./Https";


class ContactService extends Https {
  
    async submitContactForm(body: ContactPayload){
        try {
           const {data} = await this.post<ContactPayload>("contactus", body)
           return data
        } catch (error) {
            throw error
        }
    }
    
}

export default new ContactService()