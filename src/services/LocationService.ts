import Https from "./Https";


type CordinateType = {
    latitude: string
    longitude: string
}
class LocationService extends Https {

    async getMerchantCoordinate(merchantname: string){
        try {
           const {data}  = await this.get<CordinateType[]>(`location/locationmerchant/${merchantname}`)
           return data
        } catch (error) {
            throw error
        }
    }
}

export default new LocationService()