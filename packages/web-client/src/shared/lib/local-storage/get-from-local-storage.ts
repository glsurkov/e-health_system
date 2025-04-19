import type {
    IGetLocalStorageType,
    LOCAL_STORAGE_KEYS,
} from '@/shared/config/local-storage';
import { localStorageConvert } from '@/shared/config/local-storage';

/**
 * Get value from localStorage
 * @param {LOCAL_STORAGE_KEYS} key — Key for getting value from localStorage
 * @param {ISetLocalStorageType<key>} defaultValue — Default value if in localStorage undefined
 * @param {string} keyPrefix — Prefix for key
 * @returns {IGetLocalStorageType<Key>}
 */
export function getFromLocalStorage<Key extends LOCAL_STORAGE_KEYS>(
    key: Key,
    defaultValue: IGetLocalStorageType<Key>,
    keyPrefix?: string,
): NonNullable<IGetLocalStorageType<Key>>;
export function getFromLocalStorage<Key extends LOCAL_STORAGE_KEYS>(
    key: Key,
    keyPrefix?: string,
): IGetLocalStorageType<Key>;
export function getFromLocalStorage<Key extends LOCAL_STORAGE_KEYS>(
    key: Key,
    defaultValue?: IGetLocalStorageType<Key>,
    keyPrefix?: string,
): IGetLocalStorageType<Key> {
    const finalKey = keyPrefix ? `${keyPrefix}_${key}` : key;
    const value = localStorage.getItem(finalKey);
    if (defaultValue) {
        return localStorageConvert[key](value) || defaultValue;
    }
    return localStorageConvert[key]?.(value);
}
