/**
 * @author WMXPY
 * @namespace Dump
 * @description Dump
 */

import { AsyncDraftFunction, DraftFunction, Medium } from "@sudoo/immutable";

export class Dump<T extends any> {

    public static create<T extends any>(initial: T) {

        return new Dump<T>(initial);
    }

    private _pile: T;
    private _appendFunction?: (original: T, append: any) => T;

    private constructor(initial: T) {

        this._pile = initial;
    }

    public get value(): T {

        return this._pile;
    }

    public medium(): Medium<T> {

        return Medium.from(this._pile);
    }

    public defineAppend(func: (original: T, append: any) => T) {

        this._appendFunction = func;
        return this;
    }

    public append(append: any): this {

        if (!this._appendFunction) {
            return this;
        }

        this._pile = this._appendFunction(this._pile, append);
        return this;
    }

    public replace(replace: T): this {

        this._pile = replace;
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
}
