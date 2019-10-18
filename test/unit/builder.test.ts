/**
 * @author WMXPY
 * @namespace Dump
 * @description Dump
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { Dump } from "../../src";

describe('Given {Dump} class', (): void => {

    const chance: Chance.Chance = new Chance('dump-dump');

    it('should be able to init', (): void => {

        const value: string = chance.string();

        const dump: Dump<string> = Dump.create(value);

        expect(dump.value).to.be.equal(value);
    });
});
