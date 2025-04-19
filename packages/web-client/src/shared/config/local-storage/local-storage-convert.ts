import type { IGetLocalStorageType } from './local-storage-get-types';
import { LOCAL_STORAGE_KEYS } from './local-storage-keys';

/**
 * @description Function to converting localStorage key from string type
 * to required type, described in ./local-storage-get-types.ts
 * @usage When add new localStorage key, add function to convert value to required type
 */
export const localStorageConvert: Type = {
    [LOCAL_STORAGE_KEYS.REFRESH_TOKEN]: (value) => {
        return value ? JSON.parse(value) : null;
    },
};

type Type = {
    [Key in LOCAL_STORAGE_KEYS]: (
        value: string | null,
    ) => IGetLocalStorageType<Key>;
};
