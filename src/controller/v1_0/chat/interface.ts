import { anyObjectType } from "../../../interfaces/general_interface";

export type initFunc = (
	req: anyObjectType,
	res: anyObjectType
) => Promise<void | anyObjectType>;

export type compresFunc = (input: string, output: string) => string;
export type userCredentialDataType = {
	token:string,
	key:string
};
