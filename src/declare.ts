/**
 * @author WMXPY
 * @namespace Dump
 * @description Declare
 */

export type AppendFunction<T, K extends any = any> = (original: T, append: K) => T;

export type StorageSaveFunction = (unique: string, text: string) => void;
export type StorageReadFunction = (unique: string) => string;

export type AsyncStorageSaveFunction = (unique: string, text: string) => Promise<void>;
export type AsyncStorageReadFunction = (unique: string) => Promise<string>;
