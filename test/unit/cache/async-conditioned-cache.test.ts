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
    });
});
