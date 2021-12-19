import { api } from "../connections/external/theApi"
import { userCredentialDataType } from "../controller/v1_0/chat/interface"
import { RegistrationDataType } from "../interfaces/proxyInterface"
import FormData from "form-data";
import fs from "fs";
const form = new FormData;

const register = async (data:RegistrationDataType,encodedData?:string) =>{
    try {
       console.log('service')
        data.profile_image = form.append('profile_image', fs.createReadStream(data?.path));
        // request()
    
        await api({
            method: "post",
            request_name: "register",
            api_path:"/register",
            data,
            headers:form.getHeaders()
        })
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}
export default {
    register
}