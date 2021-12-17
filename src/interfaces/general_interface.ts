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
export type clientDataType = {
    name:string,
    client_id:string,
    client_key:string,
    client_secret:string,
    description:string,
    chat_type:string[]
}
export type roomDataType = {
    user_ids:string[],
    type: string,
    name:string
}
export type actionType = 
    |"join"
    |"leave";
