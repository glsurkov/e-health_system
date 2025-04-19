import type { LOCAL_STORAGE_KEYS } from './local-storage-keys';

/**
 * @description Type of value to set in localStorage key
 * @usage When add new localStorage key, register localStorage value type here
 */
interface ISetLocalStorageTypes {
    [LOCAL_STORAGE_KEYS.REFRESH_TOKEN]: string;
}

export type ISetLocalStorageType<Enum extends LOCAL_STORAGE_KEYS> =
    ISetLocalStorageTypes[Enum];
