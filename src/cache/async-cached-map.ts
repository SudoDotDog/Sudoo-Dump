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

        if (this._map.has(key)) {

            return this._map.get(key) as V;
        }

        const result: V = await this._getterFunction(key);
        this._map.set(key, result);

        return result;
    }
}

