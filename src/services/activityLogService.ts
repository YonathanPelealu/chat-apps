import db from "../connections/db/postgre";

const addActivityLog = async (
    clients_id:string,
    user_id:string,
    room_id:string
):Promise<void> => {
    try {
        console.log("activity")
        const query = `INSERT INTO activity_log (clients_id,user_id,room_id) VALUES ($1,$2,$3)`;
        const params = [clients_id,user_id,room_id]
        await db.query(query,params)
    } catch (e) {
        throw new Error(e)
    }
};

export default {
    addActivityLog
}