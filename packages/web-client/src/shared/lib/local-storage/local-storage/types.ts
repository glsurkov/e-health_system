type ToLocalStorageFn<T> = [T] extends [string]
    ? { toLocalStorage?: (value: T) => string }
    : { toLocalStorage: (value: T) => string };

type FromLocalStorageFn<U> = [U] extends [string]
    ? { fromLocalStorage?: (value: string) => U }
    : { fromLocalStorage: (value: string) => U };

export type LocalStorageProps<Type> = {
    key: string;
    defaultValue: Type;
} & ToLocalStorageFn<Type> &
    FromLocalStorageFn<Type>;

export interface LocalStorageReturned<Type> {
    value: Type;
    set: (value: Type) => void;
    remove: () => void;
}
