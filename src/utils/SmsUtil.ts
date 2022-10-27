import axios from "axios";


export const sendOTP = async(message: string, number: string) => {
    try {
        await axios.get(`https://sms.isendgh.com/sms/api?action=send-sms&api_key=Yk9KbEQ9dml0aEZOTkhDd3Z1Ymg=&to=+233${number}&from=CORRAL&sms=${message}`)
    } catch (error) {
       throw error
    }
}