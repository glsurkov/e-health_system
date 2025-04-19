import type { ISetLocalStorageType } from '@/shared/config/local-storage';
import type { LOCAL_STORAGE_KEYS } from '@/shared/config/local-storage/local-storage-keys';

/**
 * Set value in local storage
 * @param {LOCAL_STORAGE_KEYS} key
 * @param {ISetLocalStorageType<Key>} value
 * @param {string} keyPrefix
 */
export function setInLocalStorage<Key extends LOCAL_STORAGE_KEYS>(
    key: Key,
    value: ISetLocalStorageType<Key>,
    keyPrefix?: string,
) {
    const finalKey = keyPrefix ? `${keyPrefix}_${key}` : key;

    localStorage.setItem(finalKey, JSON.stringify(value));
}
