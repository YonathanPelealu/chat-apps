import { createHash } from "crypto";
import { errorHandler } from "../../handler/errorHandler";

const hashPassword = async (password: string): Promise<string> => {
	let password_hashed = "";
	const salt = process.env.SALT;

	const saltedPassword = `${salt}${password}`;
	try {
		password_hashed = createHash("sha256").update(saltedPassword).digest("hex");
		return password_hashed;
	} catch (e) {
		errorHandler(e);
		throw new Error(e);
	}
};

export default hashPassword;
