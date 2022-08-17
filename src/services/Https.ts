import axios from "axios"


class Https {
   protected get = axios.get
   protected post = axios.post
   protected put = axios.put
   protected patch = axios.patch
   protected delete = axios.delete

    constructor() {
        axios.defaults.baseURL = "https://coralappmtech.herokuapp.com/api/"
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