declare global
{
    interface String
    {
        isEmptyOrWhiteSpace(): boolean;
        contains(value: string): boolean;
        startsWith(value: string): boolean;
        endsWith(value: string): boolean;
        extractNumbers(): string;
        extractCharacters(): string;
        format(...params: any[]): string;
        replaceAll(searchValue: string, replaceValue: string): string;
        base64Encode(): string;
        base64Decode(): string;
        base64UrlEncode(): string;
        base64UrlDecode(): string;
        hexEncode(): string;
        hexDecode(): string;
        matchesFormat(format: string): boolean;
    }

    interface Object
    {
        // mapToObject(factoryFunc: () => any): any;
        // merge(value: object): void;
        getTypeName(): string;
        getValue(key: string): any;
        setValue(key: string, value: any): void;
        serializeObject(...keys: Array<string>): object;
        deserializeObject(targetClassOrObject: Function | object, ...keysOrValues: Array<any>): object;
    }

    interface Array<T>
    {
        contains(value: T): boolean;
        orderBy(): Array<T>;
        orderBy(compareFunc: (value: T) => any): Array<T>;
        orderByDesc(): Array<T>;
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        distinct(): Array<T>;
        distinct(compareFunc: (value: T) => any): Array<T>;
        skip(count: number): Array<T>;
        take(count: number): Array<T>;
        count(): number;
        count(predicate: (value: T) => boolean): number;
        remove(value: T): boolean;
        clear(): void;
        equals(compareArray: ReadonlyArray<T>): boolean;
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }
    
    interface ReadonlyArray<T>
    {
        contains(value: T): boolean;
        orderBy(): ReadonlyArray<T>;
        orderBy(compareFunc: (value: T) => any): ReadonlyArray<T>;
        orderByDesc(): ReadonlyArray<T>;
        orderByDesc(compareFunc: (value: T) => any): ReadonlyArray<T>;
        groupBy(keyFunc: (value: T) => string): ReadonlyArray<{ key: string, values: ReadonlyArray<T> }>
        distinct(): ReadonlyArray<T>;
        distinct(compareFunc: (value: T) => any): ReadonlyArray<T>;
        skip(count: number): ReadonlyArray<T>;
        take(count: number): ReadonlyArray<T>;
        count(): number;
        count(predicate: (value: T) => boolean): number;
        equals(compareArray: ReadonlyArray<T>): boolean;
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<ReadonlyArray<U>>;
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }   
    
    interface Math
    {
        percentage(partialValue: number, wholeValue: number): number;
        percentagePartial(percentage: number, wholeValue: number): number;
        percentageWhole(percentage: number, partialValue: number): number;
    }
}

export { }