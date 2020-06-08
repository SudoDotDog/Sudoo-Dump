/**
 * @author WMXPY
 * @namespace Dump_Cache
 * @description Declare
 */

export type GetterFunction<K, V> = (key: K) => Promise<V>;
