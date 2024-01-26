export interface Write<T> {
  create(data: Omit<T, 'id'>): Promise<T>;
}

export interface Read<T, S> {
  findAll(): Promise<T[]>;
  findById(id: S): Promise<T | null>;
  findByName(name: string): Promise<T[]>;
}
