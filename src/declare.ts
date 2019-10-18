/**
 * @author WMXPY
 * @namespace Dump
 * @description Declare
 */

export type AppendFunction<T, K extends any = any> = (original: T, append: K) => T;

export type StorageSaveFunction = (unique: string, text: string) => any;
export type StorageReadFunction = (unique: string) => string | undefined | null;

export type AsyncStorageSaveFunction = (unique: string, text: string) => Promise<any>;
export type AsyncStorageReadFunction = (unique: string) => Promise<string | undefined | null>;
