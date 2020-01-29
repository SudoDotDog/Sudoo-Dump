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

export type SerializeFunction<T extends any = any> = (value: T) => string;
export type DeserializeFunction<T extends any = any> = (raw: string) => T;

export type UpdateListener<T extends any = any> = (identifier: string, newValue: T, oldValue: T) => void;
export type UpdateListenerList<T extends any = any> = Record<string, UpdateListener<T>>;
