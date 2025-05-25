import { createLocalStorage } from './create-local-storage';

describe('createLocalStorage', () => {
    const key = 'test-key';

    beforeEach(() => {
        localStorage.clear();
    });

    describe('for string types (using identity transforms)', () => {
        it('should return the default value if localStorage is empty', () => {
            const defaultValue = 'default';
            const storageHelper = createLocalStorage<string>({
                key,
                defaultValue,
            });
            expect(storageHelper.value).toBe(defaultValue);
        });

        it('should use the stored value from localStorage if available', () => {
            const storedValue = 'stored value';
            localStorage.setItem(key, storedValue);
            const defaultValue = 'default';
            const storageHelper = createLocalStorage<string>({
                key,
                defaultValue,
            });
            expect(storageHelper.value).toBe(storedValue);
        });

        it('should set a new value in localStorage', () => {
            const defaultValue = 'default';
            const storageHelper = createLocalStorage<string>({
                key,
                defaultValue,
            });
            storageHelper.set('new value');
            expect(localStorage.getItem(key)).toBe('new value');
        });

        it('should remove the value from localStorage', () => {
            localStorage.setItem(key, 'some value');
            const defaultValue = 'default';
            const storageHelper = createLocalStorage<string>({
                key,
                defaultValue,
            });
            storageHelper.remove();
            expect(localStorage.getItem(key)).toBeNull();
        });
    });

    describe('for non-string types (with custom transforms)', () => {
        it('should use the stored value with provided transforms', () => {
            const numKey = 'number-key';
            const defaultValue = 42;
            const toLocalStorage = (value: number) => JSON.stringify(value);
            const fromLocalStorage = (value: string) => JSON.parse(value);
            localStorage.setItem(numKey, '100');

            const storageHelper = createLocalStorage<number>({
                key: numKey,
                defaultValue,
                toLocalStorage,
                fromLocalStorage,
            });
            expect(storageHelper.value).toBe(100);

            storageHelper.set(200);
            expect(localStorage.getItem(numKey)).toBe('200');
        });
    });

    describe('error handling', () => {
        it('should return the default value if localStorage.getItem throws', () => {
            const getItemSpy = jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem').mockImplementation(() => {
                throw new Error('Storage error');
            });
            const defaultValue = 'default';
            const storageHelper = createLocalStorage<string>({
                key,
                defaultValue,
            });
            expect(storageHelper.value).toBe(defaultValue);
            getItemSpy.mockRestore();
        });
    });
});
