export interface IBaseService<T> {
    findAll(): Promise<T[]>
    create(data: T): Promise<T>
    findById(id: string): Promise<T | null>
    updateById(id: string, data: Partial<T>): Promise<T>
    searchByObject(data: Partial<T>): Promise<T[] | null>
}