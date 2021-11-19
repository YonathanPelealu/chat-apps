export type currencyType = "idr" | "usd";
export type itemStatusDefaultType =
	| "in use"
	| "in store"
	| "in repair"
	| "in broken"
	| "in retired";
export type snackbarType = {
	message: string;
};

export type suggestionType = {
	id: string;
	name: string;
};

export type suggestionLocation = {
	id: string;
	name: string;
	floor: string;
};

export const suggestion_location_init: suggestionLocation = {
	id: "",
	name: "",
	floor: "",
};
