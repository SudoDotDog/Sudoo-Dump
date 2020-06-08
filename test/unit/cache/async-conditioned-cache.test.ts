/**
 * @author WMXPY
 * @namespace Dump_Cache
 * @description Async Conditioned Cache
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { AsyncConditionedCache } from "../../../src";

describe('Given {AsyncConditionedCache} class', (): void => {

    const chance: Chance.Chance = new Chance('dump-cache-async-conditioned-cache');

    it('should be able to create', (): void => {

        const value: string = chance.string();

        const cache: AsyncConditionedCache<string> = AsyncConditionedCache.create(
            () => true,
            () => value,
            value,
        );

        expect(cache).to.be.instanceOf(AsyncConditionedCache);
        expect(cache.cached).to.be.equal(value);
    });

    it('should be able to create and init', async (): Promise<void> => {

        const value: string = chance.string();

        const cache: AsyncConditionedCache<string> = await AsyncConditionedCache.createAndInit(
            () => true,
            () => value,
        );

        expect(cache).to.be.instanceOf(AsyncConditionedCache);
        expect(cache.cached).to.be.equal(value);
    });

    it('should be able to get true conditioned value', async (): Promise<void> => {

        const initialValue: string = chance.string();
        const value: string = chance.string();

        const cache: AsyncConditionedCache<string> = AsyncConditionedCache.create(
            () => true,
            () => value,
            initialValue,
        );

        expect(cache).to.be.instanceOf(AsyncConditionedCache);
        expect(cache.cached).to.be.equal(initialValue);

        const current: string = await cache.get();

        expect(cache.cached).to.be.equal(initialValue);
        expect(current).to.be.equal(initialValue);
    });


    it('should be able to get false conditioned value', async (): Promise<void> => {

        const initialValue: string = chance.string();
        const value: string = chance.string();

        const cache: AsyncConditionedCache<string> = AsyncConditionedCache.create(
            () => false,
            () => value,
            initialValue,
        );

        expect(cache).to.be.instanceOf(AsyncConditionedCache);
        expect(cache.cached).to.be.equal(initialValue);

        const current: string = await cache.get();

        expect(cache.cached).to.be.equal(value);
        expect(current).to.be.equal(value);
    });
});
