/**
 * @author WMXPY
 * @namespace Dump_Cache
 * @description Async Cached Map
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { AsyncCachedMap } from "../../../src";

describe('Given {AsyncCachedMap} class', (): void => {

    const chance: Chance.Chance = new Chance('dump-cache-async-cached-map');

    it('should be able to create', (): void => {

        const value: string = chance.string();

        const map: AsyncCachedMap<string, string> = AsyncCachedMap.create(() => value);

        expect(map).to.be.instanceOf(AsyncCachedMap);
    });
});
