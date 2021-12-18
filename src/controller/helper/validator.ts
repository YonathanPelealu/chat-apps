import Ajv from "ajv";
const ajv = new Ajv();

export const schemaRegister = {
	type: "object",
	properties: {
		username:{
			type: "string"
		},
		password:{
			type: "string"
		},
		first_name:{
			type: "string"
		},
		last_name:{
			type:"string"
		},
		telephone:{
			type: "string"
		},
		profile_image:{
			type: "string"
		},
		address:{
			type: "string"
		},
		city:{
			type: "string"
		},
		province:{
			type: "string"
		},
		country:{
			type: "string"
		}
	},
	required: ["username","password","first_name","telephone","profile_image","address","city","province","country"],
	additionalProperties: false,
};


export const validate = async (schema: any, data: any): Promise<boolean> => {
	const validation = ajv.compile(schema);
	if (validation(data)) {
		return true;
	} else {
		return false;
	}
};
