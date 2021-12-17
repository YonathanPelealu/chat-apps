import { chatMigration } from "./chat_app/migrate"

export const migrateServices = async () => {
    try {
        await chatMigration()
    } catch (e) {
        console.error(e)
    }
}