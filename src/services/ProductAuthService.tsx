import { ProductAuth } from "../models/DTOS";
import Https from "./Https";

class ProductAuthService extends Https {

   async  getAllBrands(){
        try {
            const {data} = await this.get<ProductAuth[]>("/productcodes/findall")
            return data
        } catch (error) {
            throw error
        }
    }

    async verifyProd(code: string){
        try {
            await this.post(`/productcodes/verifycode/${code}`)
        } catch (error) {
            throw error
        }
    }

}

export default new ProductAuthService()