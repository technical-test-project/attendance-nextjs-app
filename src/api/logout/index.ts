import StorageManager from "@/utils/storageManager";

export const apiLogout = async (): Promise<boolean|any> => {
    try {
        StorageManager.clearStorage()
        return true
    }catch (e){
        return e
    }
}