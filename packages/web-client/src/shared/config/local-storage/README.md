## Local storage

LocalStorage config used for automatic converting
types for localStorage keys (Initially every localStorage key using `string` type)

---

### Add new localStorage key:

1. Register localStorage key in `/local-storage-keys`
2. Register type of localStorage keys in `/local-storage-set-types` and `/local-storage-get-types`
3. Register convert function in `/local-storage-convert`

---

### Usage

**getFromLocalStorage** — Func to get value from localStorage.
Located in `@/shared/lib/local-storage`

**clearInLocalStorage** — Func to remove value in localStorage.
Located in `@/shared/lib/local-storage`

**setInLocalStorage** — Func to add value in localStorage.
Located in `@/shared/lib/local-storage`
