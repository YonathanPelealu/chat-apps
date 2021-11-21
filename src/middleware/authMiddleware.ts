import clientService from "../services/clientService";

export type PayloadType = {
	client_id: string,
	client_key:string,
	client_secret:string,
	user_id: string;
};

const validateClientID = async (payload:PayloadType) => {
	try {
		const result = await clientService.validateClientID(payload);
		if (result) {
			return result
		} else {
			return false
		}
	} catch (e) {
		throw new Error(e)
	}
}

const authMiddleware = async (req:any,res:any,next:any) => {
	const {client_id,client_key,client_secret,user_id} = req.headers
	const payload:PayloadType = {client_id,client_key,client_secret,user_id}
	try {
		const validSecret = payload.client_key.length > 19 && payload.client_secret.slice(payload.client_secret.length - 3) === 'PVT';
		const validKey = payload.client_key.length > 19 && payload.client_key.slice(payload.client_key.length - 3 ) === 'PUB';
		if (validSecret && validKey) {
			const result = await validateClientID(payload)
			result.client_id ? req.client = result : res.json('invalid client_id') 
			next()
		} else {
			res.json('invalid key pair')
		}
	} catch (e) {
		throw new Error(e)
	}
} 

export default authMiddleware;
