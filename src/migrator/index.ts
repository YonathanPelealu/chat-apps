import { chatMigration } from "./migration/chat_app/migrate"

export const migrateServices = async () => {
    try {
        await chatMigration()
    } catch (e) {
        console.error(e)
    }
}