/**
 * @author WMXPY
 * @namespace Dump_Cache
 * @description Async Conditioned Cache
 */

import { AsyncConditionedGetterFunction, ConditionVerifyFunction } from "./declare";

export class AsyncConditionedCache<T extends any = any> {

    public static async createAndInit<T extends any = any>(
        conditionVerifyFunction: ConditionVerifyFunction<T>,
        getterFunction: AsyncConditionedGetterFunction<T>,
    ): Promise<AsyncConditionedCache> {

        const initialValue: T = await getterFunction(null as any);
        return new AsyncConditionedCache<T>(conditionVerifyFunction, getterFunction, initialValue);
    }

    public static create<T extends any = any>(
        conditionVerifyFunction: ConditionVerifyFunction<T>,
        getterFunction: AsyncConditionedGetterFunction<T>,
        initialValue: T,
    ): AsyncConditionedCache {

        return new AsyncConditionedCache<T>(conditionVerifyFunction, getterFunction, initialValue);
    }

    private _current: T;

    private readonly _conditionVerifyFunction: ConditionVerifyFunction<T>;
    private readonly _getterFunction: AsyncConditionedGetterFunction<T>;

    private constructor(
        conditionVerifyFunction: ConditionVerifyFunction<T>,
        getterFunction: AsyncConditionedGetterFunction<T>,
        initialValue: T,
    ) {

        this._current = initialValue;
        this._conditionVerifyFunction = conditionVerifyFunction;
        this._getterFunction = getterFunction;
    }

    public async get(): Promise<T> {

        const validate: boolean = await this.check();
        if (validate) {
            return this._current;
        }

        const value: T = await this._getterFunction(this._current);
        this.set(value);

        return value;
    }

    public set(value: T): this {

        this._current = value;
        return this;
    }

    public async check(): Promise<boolean> {

        return this._conditionVerifyFunction(this._current);
    }
}
