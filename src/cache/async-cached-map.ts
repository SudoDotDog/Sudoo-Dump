/**
 * @author WMXPY
 * @namespace Dump_Cache
 * @description Async Cached Map
 */

import { GetterFunction } from "./declare";

export class AsyncCachedMap<K extends any = string, V extends any = any> {

    public static create<K extends any = string, V extends any = any>(
        getterFunction: GetterFunction<K, V>,
    ) {

        return new AsyncCachedMap<K, V>(getterFunction);
    }

    private readonly _map: Map<K, V>;
    private readonly _getterFunction: GetterFunction<K, V>;

    private constructor(
        getterFunction: GetterFunction<K, V>,
    ) {

        this._map = new Map();
        this._getterFunction = getterFunction;
    }

    public async get(key: K): Promise<V> {

        if (this.check(key)) {
            return this._map.get(key) as V;
        }

        const value: V = await this._getterFunction(key);
        this.set(key, value);

        return value;
    }

    public set(key: K, value: V): this {

        this._map.set(key, value);
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
