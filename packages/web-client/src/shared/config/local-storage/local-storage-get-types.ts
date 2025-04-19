import type { LOCAL_STORAGE_KEYS } from './local-storage-keys';

/**
 * @description Type of localStorage key returned from getFromLocalStorage
 * @usage When add new localStorage key, register localStorage key type
 */
interface IGetLocalStorageTypes {
    [LOCAL_STORAGE_KEYS.REFRESH_TOKEN]: string | null;
}

export type IGetLocalStorageType<Enum extends LOCAL_STORAGE_KEYS> =
    IGetLocalStorageTypes[Enum];
