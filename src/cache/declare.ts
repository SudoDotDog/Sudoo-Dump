/**
 * @author WMXPY
 * @namespace Dump_Cache
 * @description Declare
 */

export type AsyncMapGetterFunction<K, V> = (key: K) => Promise<V> | V;
export type AsyncConditionedGetterFunction<T> = (original: T) => Promise<T> | T;
export type ConditionVerifyFunction<T> = (original: T) => boolean | Promise<boolean>;
