/**
 * @author WMXPY
 * @namespace Dump
 * @description Dump
 */

import { AsyncDraftFunction, DraftFunction, Medium } from "@sudoo/immutable";
import { AppendFunction, AsyncStorageReadFunction, AsyncStorageSaveFunction, StorageReadFunction, StorageSaveFunction } from "./declare";

export class Dump<T extends any> {

    public static create<T extends any>(unique: string, initial: T) {

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

    private _pile: T;
    private _storageType: 'async' | 'sync' | null;
    private _appendFunction?: AppendFunction<T>;

    private constructor(unique: string, initial: T) {

        this._unique = unique;

        this._pile = initial;
        this._storageType = null;
    }

    public get value(): T {

        return this._pile;
    }

    public useStorage(): this {

        this._verifyStorage();

        this._storageType = 'sync';

        const content: string | undefined | null = (Dump._storageReadFunction as StorageReadFunction)(this._unique);
        if (!content) {
            return this;
        }
        this._pile = JSON.parse(content);
        return this;
    }

    public async useAsyncStorage(): Promise<this> {

        this._verifyAsyncStorage();

        this._storageType = 'async';

        const content: string | undefined | null = await (Dump._asyncStorageReadFunction as AsyncStorageReadFunction)(this._unique);
        if (!content) {
            return this;
        }
        this._pile = JSON.parse(content);
        return this;
    }

    public medium(): Medium<T> {

        return Medium.from(this._pile);
    }

    public defineAppend(func: AppendFunction<T>) {

        this._appendFunction = func;
        return this;
    }

    public append(append: any): this {

        if (!this._appendFunction) {
            return this;
        }

        this.replace(this._appendFunction(this._pile, append));
        return this;
    }

    public replace(replace: T): this {

        this._pile = replace;
        this._saveToStorage();
        return this;
    }

    public produce(func: DraftFunction<T>): this {

        this._pile = this.medium().mutate(func);
        return this;
    }

    public async asyncProduce(func: AsyncDraftFunction<T>): Promise<this> {

        this._pile = await this.medium().asyncMutate(func);
        return this;
    }

    private _saveToStorage(): this {

        if (this._storageType === 'sync') {

            this._verifyStorage();
            (Dump._storageSaveFunction as StorageSaveFunction)(this._unique, JSON.stringify(this._pile));
        } else if (this._storageType === 'async') {

            this._verifyAsyncStorage();
            (Dump._asyncStorageSaveFunction as AsyncStorageSaveFunction)(this._unique, JSON.stringify(this._pile));
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
