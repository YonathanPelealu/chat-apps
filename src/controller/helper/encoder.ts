const token = require ("basic-authorization-header")
export const encoder = async (username:string,password:string) => {
    const key = token(username,password)
    return key
};