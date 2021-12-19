import proxyService from "../services/proxyService";
import { encoder } from "../controller/helper/encoder";
import { RegistrationDataType } from "../interfaces/proxyInterface";
import { schemaRegister, validate } from "../controller/helper/validator";

const register = async (data:RegistrationDataType) => {
    try {
        console.log("model")
        const {username,password} = data;
        const encodedData = await encoder(username,password)
        const checkBody = await validate(schemaRegister,data);
        checkBody ? await proxyService.register(data,encodedData) : 'check your request body';
    } catch (e) {
        throw new Error(e)
    }
}

export default {
    register
}