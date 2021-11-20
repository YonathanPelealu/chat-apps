export type anyObjectType = Record<string, any>;
export type unknownObjectType = Record<string, unknown>;
export type snackbarType = {
    message:string
};
export type messageDataType = {
    room_id:string,
    path:string,
    text:string,
    sent_by:string,
    is_deleted:boolean
}