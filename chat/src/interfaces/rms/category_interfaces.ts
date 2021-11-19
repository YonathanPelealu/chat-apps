import { moduleType } from "../moduleInterfaces";

export type categoryType = {
	id: string;
	module_type: moduleType;
	name: string;
};
export const category_init: categoryType = {
	id: "",
	module_type: "rms",
	name: "",
};
