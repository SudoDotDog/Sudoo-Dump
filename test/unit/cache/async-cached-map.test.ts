/**
 * @author WMXPY
 * @namespace Dump_Cache
 * @description Async Cached Map
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { AsyncCachedMap } from "../../../src";
import { Example } from "../../mock/example";

describe('Given {AsyncCachedMap} class', (): void => {

    const chance: Chance.Chance = new Chance('dump-cache-async-cached-map');

    it('should be able to create', (): void => {

        const value: string = chance.string();

        const map: AsyncCachedMap<string, string> = AsyncCachedMap.create(() => value);

        expect(map).to.be.instanceOf(AsyncCachedMap);
    });

    it('should be able to create and init', async (): Promise<void> => {

        const key: Example = new Example(chance.string());
        const value: string = chance.string();

        const map: AsyncCachedMap<Example, string> = AsyncCachedMap.create<Example, string>(
            () => value,
            new Map().set(key, value),
        );

        expect(map).to.be.instanceOf(AsyncCachedMap);
        expect(map).to.be.lengthOf(1);

        const actual: string = await map.get(key);

        expect(actual).to.be.equal(value);
    });


    it('should be able to cache value', async (): Promise<void> => {

        const key: string = chance.string();
        const value: string = chance.string();

        const map: AsyncCachedMap<string, string> = AsyncCachedMap.create<string, string>(
            () => value,
        );

        expect(map).to.be.instanceOf(AsyncCachedMap);
        expect(map).to.be.lengthOf(0);

        const actual1: string = await map.get(key);

        expect(actual1).to.be.equal(value);
        expect(map).to.be.lengthOf(1);

        const actual2: string = await map.get(key);

        expect(actual2).to.be.equal(value);
        expect(map).to.be.lengthOf(1);
    });
});
