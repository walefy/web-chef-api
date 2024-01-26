export type RemoveAttributes<T, R extends keyof T> = Omit<T, R>;
