/**
 * @author WMXPY
 * @namespace Dump
 * @description Dump
 */

import { AsyncDraftFunction, DraftFunction, Medium } from "@sudoo/immutable";
import { AppendFunction, AsyncStorageReadFunction, AsyncStorageSaveFunction, DeserializeFunction, SerializeFunction, StorageReadFunction, StorageSaveFunction, UpdateListener, UpdateListenerList } from "./declare";

export class Dump<T extends any> {

    public static create<T extends any>(unique: string, initial: T): Dump<T> {

        return new Dump<T>(unique, initial);
    }

    public static resetDefines(): void {

        this._storageSaveFunction = undefined;
        this._storageReadFunction = undefined;
        this._asyncStorageSaveFunction = undefined;
        this._asyncStorageReadFunction = undefined;
    }

    public static defineStorage(save: StorageSaveFunction, read: StorageReadFunction): void {

        this._storageSaveFunction = save;
        this._storageReadFunction = read;
    }

    public static defineAsyncStorage(save: AsyncStorageSaveFunction, read: AsyncStorageReadFunction): void {

        this._asyncStorageSaveFunction = save;
        this._asyncStorageReadFunction = read;
    }

    private static _storageSaveFunction?: StorageSaveFunction;
    private static _storageReadFunction?: StorageReadFunction;

    private static _asyncStorageSaveFunction?: AsyncStorageSaveFunction;
    private static _asyncStorageReadFunction?: AsyncStorageReadFunction;

    private readonly _unique: string;

    private _modified: boolean;
    private _restored: boolean;

    private _initialed: Date;
    private _lastModified: Date;

    private _pile: T;
    private _initial: T;
    private _appendFunction?: AppendFunction<T, any>;
    private _storageType: 'async' | 'sync' | null;

    private _serializeFunction: SerializeFunction<T> = JSON.stringify;
    private _deserializeFunction: DeserializeFunction<T> = JSON.parse;

    private _updateListenerList: UpdateListenerList<T>;

    private constructor(unique: string, initial: T) {

        this._unique = unique;

        this._pile = initial;
        this._initial = initial;

        this._initialed = new Date();
        this._lastModified = new Date();

        this._modified = false;
        this._restored = false;
        this._storageType = null;

        this._updateListenerList = {};
    }

    public get value(): T {
        return this._pile;
    }
    public get initial(): T {
        return this._initial;
    }
    public get modified(): boolean {
        return this._modified;
    }
    public get restored(): boolean {
        return this._restored;
    }
    public get initialed(): Date {
        return this._initialed;
    }
    public get lastModified(): Date {
        return this._lastModified;
    }
    public get updateListeners(): UpdateListenerList {
        return this._updateListenerList;
    }

    public useStorage(): this {

        this._verifyStorage();

        this._storageType = 'sync';

        const content: string | undefined | null = (Dump._storageReadFunction as StorageReadFunction)(this._unique);
        if (!content) {
            return this;
        }

        const parsed: T = this._deserializeFunction(content);
        this._pile = parsed;

        this._initialed = new Date();
        this._lastModified = new Date();

        this._initial = parsed;
        this._restored = true;

        return this;
    }

    public async useAsyncStorage(): Promise<this> {

        this._verifyAsyncStorage();

        this._storageType = 'async';

        const content: string | undefined | null = await (Dump._asyncStorageReadFunction as AsyncStorageReadFunction)(this._unique);
        if (!content) {
            return this;
        }

        const parsed: T = this._deserializeFunction(content);
        this._pile = parsed;

        this._initialed = new Date();
        this._lastModified = new Date();

        this._initial = parsed;
        this._restored = true;

        return this;
    }

    public medium(): Medium<T> {

        return Medium.from(this._pile);
    }

    public defineAppend<K extends any = any>(func: AppendFunction<T, K>): this {

        this._appendFunction = func;
        return this;
    }

    public append<K extends any = any>(append: K): this {

        if (!this._appendFunction) {
            return this;
        }

        return this.replace(this._appendFunction(this._pile, append));
    }

    public produce(func: DraftFunction<T>): this {

        return this.replace(this.medium().mutate(func));
    }

    public async asyncProduce(func: AsyncDraftFunction<T>): Promise<this> {

        const newValue: T = await this.medium().asyncMutate(func);
        return this.replace(newValue);
    }

    public defineSerializeFunction(serialize: SerializeFunction<T>, deserialize: DeserializeFunction<T>): this {

        this._serializeFunction = serialize;
        this._deserializeFunction = deserialize;
        return this;
    }

    public replace(replace: T): this {

        const oldValue: T = this._pile;

        this._pile = replace;
        this._modified = true;
        this._lastModified = new Date();

        this._triggerUpdateListenerList(replace, oldValue);
        return this._saveToStorage(replace);
    }

    public addUpdateListener(identifier: string, listener: UpdateListener<T>): this {

        this._updateListenerList = {
            ...this._updateListenerList,
            [identifier]: listener,
        };
        return this;
    }

    public removeUpdateListener(identifier: string): this {

        const currentIdentifiers: string[] = Object.keys(this._updateListenerList);
        const newListenerList: UpdateListenerList<T> = currentIdentifiers.reduce((previous: UpdateListenerList<T>, current: string) => {
            if (current === identifier) {
                return previous;
            }
            return {
                ...previous,
                [current]: this._updateListenerList[current],
            };
        }, {} as UpdateListenerList<T>);
        this._updateListenerList = newListenerList;
        return this;
    }

    public clearUpdateListeners(): this {

        this._updateListenerList = {};
        return this;
    }

    public reset(): this {

        this.replace(this._initial);
        this._modified = false;
        return this;
    }

    private _triggerUpdateListenerList(newValue: T, oldValue: T): this {

        const identifiers: string[] = Object.keys(this._updateListenerList);
        for (const identifier of identifiers) {
            if (this._updateListenerList[identifier]) {
                this._updateListenerList[identifier](identifier, newValue, oldValue);
            }
        }
        return this;
    }

    private _saveToStorage(newValue: T): this {

        if (this._storageType === 'sync') {

            this._verifyStorage();
            (Dump._storageSaveFunction as StorageSaveFunction)(this._unique, this._serializeFunction(newValue));
        } else if (this._storageType === 'async') {

            this._verifyAsyncStorage();
            (Dump._asyncStorageSaveFunction as AsyncStorageSaveFunction)(this._unique, this._serializeFunction(newValue));
        }

        return this;
    }

    private _verifyAsyncStorage(): this {

        if (!Dump._asyncStorageReadFunction) {
            throw new Error('Undefined Async Storage Read Function');
        }

        if (!Dump._asyncStorageSaveFunction) {
            throw new Error('Undefined Async Storage Save Function');
        }

        return this;
    }

    private _verifyStorage(): this {

        if (!Dump._storageReadFunction) {
            throw new Error('Undefined Storage Read Function');
        }

        if (!Dump._storageSaveFunction) {
            throw new Error('Undefined Storage Save Function');
        }

        return this;
    }
}
