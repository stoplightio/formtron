export declare function mapDict<T, R>(dict: {
    [name: string]: T;
} | undefined, callback: (obj: T, key: string) => R): R[];
export declare function uniqFlatMap<T>(collection?: T[]): string[];
