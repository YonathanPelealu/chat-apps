import { areaDataType, area_data_init } from "./area_interfaces";

export type locationDataType = {
	name: string;
	floor: string;
	description: string;
};

export const location_data_init = {
	name: "",
	floor: "",
	description: "",
};

export type locationType = {
	id: string;
	data: locationDataType;
};
export const location_init = {
	id: "",
	data: location_data_init,
};

export type locationDetailType = {
	id: string;
	data: locationDataType;
	area_data: areaDataType;
};

export const location_detail_init: locationDetailType = {
	id: "",
	data: location_data_init,
	area_data: area_data_init,
};

export type locationEventOverview = {
	id: string;
	data: locationDataType;
	area_data: areaDataType;
	count_event: number;
	event_ongoing: number;
	event_upcoming_ongoing: number;
};
export const location_event_overview_init: locationEventOverview = {
	id: "",
	data: location_data_init,
	area_data: {} as areaDataType,
	count_event: 0,
	event_ongoing: 0,
	event_upcoming_ongoing: 0,
};
