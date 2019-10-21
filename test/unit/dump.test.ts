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

    afterEach(() => {
        Dump.resetDefines();
    });

    it('should be able to init', (): void => {

        const value: string = chance.string();

        const dump: Dump<string> = Dump.create(chance.string(), value);

        expect(dump.value).to.be.equal(value);
    });

    it('should be able to init from storage', (): void => {

        let change: string = JSON.stringify(chance.string());

        const value: string = chance.string();

        Dump.defineStorage((_, text: string) => change = text, () => change);
        const dump: Dump<string> = Dump.create(chance.string(), value).useStorage();

        expect(dump.value).to.be.equal(JSON.parse(change));
    });

    it('should be able to save / read from storage', (): void => {

        let change: string = "";

        const value: string = chance.string();
        const draft: string = chance.string();

        Dump.defineStorage((_, text: string) => change = text, () => change);
        const dump: Dump<string> = Dump.create(chance.string(), value).useStorage();

        dump.replace(draft);

        expect(dump.value).to.be.equal(draft);
        expect(change).to.be.equal(JSON.stringify(draft));
    });

    it('should be able to save / read from async storage', async (): Promise<void> => {

        let change: string = "";

        const value: string = chance.string();
        const draft: string = chance.string();

        Dump.defineAsyncStorage(async (_, text: string) => change = text, async () => change);
        const dump: Dump<string> = await Dump.create(chance.string(), value).useAsyncStorage();

        dump.replace(draft);

        expect(dump.value).to.be.equal(draft);
        expect(change).to.be.equal(JSON.stringify(draft));
    });

    it('should be able to reject unseated storage', (): void => {

        const value: string = chance.string();

        const dump: Dump<string> = Dump.create(chance.string(), value);

        const exec = () => {
            dump.useStorage();
        };

        expect(exec).to.be.throw("Undefined Storage Read Function");
    });

    it('should be able to change modified status - 1', (): void => {

        const value: string = chance.string();

        const dump: Dump<string> = Dump.create(chance.string(), value);

        expect(dump.value).to.be.equal(value);
        // tslint:disable-next-line: no-unused-expression
        expect(dump.modified).to.be.false;
    });

    it('should be able to change modified status - 1', (): void => {

        const value: string = chance.string();
        const newValue: string = chance.string();

        const dump: Dump<string> = Dump.create(chance.string(), value);
        dump.replace(newValue);

        expect(dump.value).to.be.equal(newValue);
        // tslint:disable-next-line: no-unused-expression
        expect(dump.modified).to.be.true;
    });
});
