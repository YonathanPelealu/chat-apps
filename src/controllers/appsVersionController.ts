import constant from "../constants/general";
import db from "../connections/db/postgre";

import { initFunc } from "./v1_0/interface";

const getAppsVersion: initFunc = async (req, res) => {
	try {
		const result = await db.query(
			"SELECT data FROM public.apps_version ORDER BY updated_at DESC LIMIT 1",
			[]
		);
		res.json(result.rows[0].data);
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: e,
		});
	}
};

export default {
	getAppsVersion,
};
