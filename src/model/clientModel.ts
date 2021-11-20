import { keyGenerator } from "../controllers/helper/generateSecret";
import { anyObjectType, clientDataType } from "../interfaces/general_interface";
import clientService from "../services/clientService";

const registerClient = async (name:string,chat_type:string[],description:string):Promise<anyObjectType> => {
    try {
        const client_id = `${name}-${keyGenerator(15)}`
        const client_key = `${name}-${keyGenerator(15)}-PUB`
        const client_secret = `${name}-${keyGenerator(15)}-PVT`
        
        let data:clientDataType = {
            name,
            chat_type,
            client_id,
            client_key,
            client_secret,
            description
        };

        return await clientService.registerClient(data)

    } catch (e) {
        throw new Error(e);
    }
};

export default {
    registerClient
}
