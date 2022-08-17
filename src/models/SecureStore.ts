import * as SecureStore from 'expo-secure-store';
class SecureStorage {
private TOKEN = "user_token"

 async storeToken(token: string){
    await SecureStore.setItemAsync(this.TOKEN, token)
 }

 async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(this.TOKEN)
 }

}

export default new SecureStorage