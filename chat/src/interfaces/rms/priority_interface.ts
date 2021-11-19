export type priorityDataType = {
	name: string;
	color: string;
	response_time: number[];
};

export const priority_data_init = {
	name: "",
	color: "",
	response_time: [0, 0, 0],
};

export type priorityType = {
	id: string;
	data: priorityDataType;
};

export const priority_init = {
	id: "string",
	data: { name: "", color: "", response_time: [0, 0, 0] },
};

export type responseTimeFormType = {
	day: number;
	hour: number;
	minute: number;
};

export type priorityFormType = {
	id: string;
	data: {
		name: string;
		color: string;
		response_time: responseTimeFormType[];
	};
};

export type resolveTimeExcelType = {
	[index: number]: number;
};
