/**
 * @author WMXPY
 * @namespace Dump_Cache
 * @description Async Cached Map
 */

import { AsyncMapGetterFunction } from "./declare";

export class AsyncCachedMap<K extends any = string, V extends any = any> {

    public static create<K extends any = string, V extends any = any>(
        getterFunction: AsyncMapGetterFunction<K, V>,
        initialMap?: Record<K, V> | Map<K, V>,
    ) {

        return new AsyncCachedMap<K, V>(getterFunction, initialMap);
    }

    private readonly _map: Map<K, V>;
    private readonly _getterFunction: AsyncMapGetterFunction<K, V>;

    private constructor(
        getterFunction: AsyncMapGetterFunction<K, V>,
        initialMap?: Record<K, V> | Map<K, V>,
    ) {

        this._map = new Map();
        this._getterFunction = getterFunction;

        if (initialMap) {
            this.merge(initialMap);
        }
    }

    public get length(): number {
        return this._map.size;
    }

    public async get(key: K): Promise<V> {

        if (this.check(key)) {
            return this._map.get(key) as V;
        }

        const value: V = await Promise.resolve(this._getterFunction(key));
        this.set(key, value);

        return value;
    }

    public set(key: K, value: V): this {

        this._map.set(key, value);
        return this;
    }

    public merge(map: Record<K, V> | Map<K, V>): this {

        if (map instanceof Map) {
            for (const key of map.keys()) {
                this.set(key, map.get(key) as V);
            }
            return this;
        }

        for (const key of Object.keys(map)) {
            const assertedKey: K = key as any as K;
            this.set(assertedKey, map[assertedKey] as V);
        }
        return this;
    }

    public check(key: K): boolean {

        return this._map.has(key);
    }

    public remove(key: K): this {

        this._map.delete(key);
        return this;
    }

    public clear(): this {

        this._map.clear();
        return this;
    }
}
