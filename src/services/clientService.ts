import { clientDataType, snackbarType } from "../interfaces/general_interface"
import db from "../connections/db/postgre";

const registerClient = async (data:clientDataType):Promise<snackbarType> => {
    let message:string = "";
    try {
        const query = `INSERT INTO clients (data) VALUES $1`;
        const params = [data];
        const result = await db.query(query,params)
        result ? message = 'success add new client' : message = 'failed add new client';
        return {message}
    } catch (e) {
        throw new Error(e)
    }
}

export default {
    registerClient
}