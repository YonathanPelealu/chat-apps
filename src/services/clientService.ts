import { clientDataType, snackbarType } from "../interfaces/general_interface"
import db from "../connections/db/postgre";
import { PayloadType } from "../middleware/authMiddleware";

const registerClient = async (data:clientDataType):Promise<snackbarType> => {
    let message:string = "";
    try {
        const query = `INSERT INTO clients (data) VALUES ($1)`;
        const params = [data];
        const result = await db.query(query,params)

        result ? message = 'success add new client' : message = 'failed add new client';
        return {message}
    } catch (e) {
        throw new Error(e)
    }
}
const validateClientID = async (data:PayloadType):Promise<any> => {
    const { client_id, client_key, client_secret } = data;
    try {
        const query = `
        SELECT id 
        FROM clients 
        WHERE clients.data->>'client_id' = $1 
        AND clients.data->>'client_key' = $2 
        AND clients.data->>'client_secret' = $3
        AND clients.is_active = true`;
        const params = [client_id, client_key, client_secret];
        const {rows} = await db.query(query,params)
        if (rows[0]) {return {client_id : rows[0].id}} else {return false}
    } catch (e) {
        throw new Error(e)
    }
}
export default {
    registerClient,
    validateClientID
}