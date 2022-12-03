import { Promotion } from "../models/DTOS";
import Https from "./Https";

class PromotionsService extends Https {

   async getAllPromotions() {
        try {
           const {data} = await this.get<Promotion[]>("promotion_image/findall")
           return data
        } 
        catch (error) {
            throw error
        }
    }

    async submitPromotionCode(body: {merchantcode: string, usedcode: string}) {
        try {
           const {data}  = await this.post<{merchantcode: string, usedcode: string}>("usedcodes", body)
           console.log("Code", data);
        } catch (error) {
            throw error
        }
    }

    async getAllNewCodes() {
        try {
         const {data} =  await this.get<Promotion[]>("newcodes/findall")
         console.log("New code", data);
         
        } catch (error) {
            console.log("err", error);
            
        }
    }
}

export default new PromotionsService