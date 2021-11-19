import { currencyType } from "./general_interface";

export type costDataType = {
	name: string;
	currency: currencyType;
	price: number;
	quantity: number;
	total_price: number;
};
export type costListType = {
	id: string;
	data: costDataType;
	workorder_id: string;
};
export type costTemp = {
	id: string;
	comapany_id: string;
	data: costDataType;
};

export type addCostTemp = {
	name: string;
	price: number;
};

export type formAddCostlist = {
	cost_temp_id: string;
	workorder_id: string;
	data: costDataType;
};
