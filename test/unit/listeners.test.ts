/**
 * @author WMXPY
 * @namespace Dump
 * @description Listeners
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { Dump } from "../../src";

type Check = {

    readonly identifier: string;
    readonly oldValue: string;
    readonly newValue: string;
};

describe('Given {Dump} class - Listeners', (): void => {

    const chance: Chance.Chance = new Chance('dump-dump-listeners');

    it('should be able to trigger listener', (): void => {

        const value: string = chance.string();
        const newValue: string = chance.string();
        const exampleListener: string = chance.string();

        const triggers: Check[] = [];

        const dump: Dump<string> = Dump.create(chance.string(), value);

        dump.addUpdateListener(exampleListener,
            (identifier: string, nextValue: string, previousValue: string) => triggers.push({
                identifier,
                oldValue: previousValue,
                newValue: nextValue,
            }),
        );

        dump.replace(newValue);

        expect(dump.value).to.be.equal(newValue);
        expect(triggers).to.be.deep.equal([{
            identifier: exampleListener,
            oldValue: value,
            newValue,
        }]);
    });

    it('should be able to trigger multiple listener', (): void => {

        const value: string = chance.string();
        const newValue: string = chance.string();
        const exampleListener1: string = chance.string();
        const exampleListener2: string = chance.string();

        const triggers: Check[] = [];

        const dump: Dump<string> = Dump.create(chance.string(), value);

        dump.addUpdateListener(exampleListener1,
            (identifier: string, nextValue: string, previousValue: string) => triggers.push({
                identifier,
                oldValue: previousValue,
                newValue: nextValue,
            }),
        );
        dump.addUpdateListener(exampleListener2,
            (identifier: string, nextValue: string, previousValue: string) => triggers.push({
                identifier,
                oldValue: previousValue,
                newValue: nextValue,
            }),
        );

        dump.replace(newValue);

        expect(dump.value).to.be.equal(newValue);
        expect(triggers).to.be.deep.equal([{
            identifier: exampleListener1,
            oldValue: value,
            newValue,
        }, {
            identifier: exampleListener2,
            oldValue: value,
            newValue,
        }]);
    });

    it('should be able to remove listener', (): void => {

        const value: string = chance.string();
        const newValue: string = chance.string();
        const exampleListener: string = chance.string();

        const triggers: Check[] = [];

        const dump: Dump<string> = Dump.create(chance.string(), value);

        dump.addUpdateListener(exampleListener,
            (identifier: string, nextValue: string, previousValue: string) => triggers.push({
                identifier,
                oldValue: previousValue,
                newValue: nextValue,
            }),
        );

        dump.removeUpdateListener(exampleListener);
        dump.replace(newValue);

        expect(dump.value).to.be.equal(newValue);
        expect(triggers).to.be.deep.equal([]);
    });

    it('should be able to remove from multiple listener', (): void => {

        const value: string = chance.string();
        const newValue: string = chance.string();
        const exampleListener1: string = chance.string();
        const exampleListener2: string = chance.string();

        const triggers: Check[] = [];

        const dump: Dump<string> = Dump.create(chance.string(), value);

        dump.addUpdateListener(exampleListener1,
            (identifier: string, nextValue: string, previousValue: string) => triggers.push({
                identifier,
                oldValue: previousValue,
                newValue: nextValue,
            }),
        );
        dump.addUpdateListener(exampleListener2,
            (identifier: string, nextValue: string, previousValue: string) => triggers.push({
                identifier,
                oldValue: previousValue,
                newValue: nextValue,
            }),
        );

        dump.removeUpdateListener(exampleListener1);
        dump.replace(newValue);

        expect(dump.value).to.be.equal(newValue);
        expect(triggers).to.be.deep.equal([{
            identifier: exampleListener2,
            oldValue: value,
            newValue,
        }]);
    });

    it('should be able to false remove listener', (): void => {

        const value: string = chance.string();
        const newValue: string = chance.string();
        const exampleListener: string = chance.string();

        const triggers: Check[] = [];

        const dump: Dump<string> = Dump.create(chance.string(), value);

        dump.addUpdateListener(exampleListener,
            (identifier: string, nextValue: string, previousValue: string) => triggers.push({
                identifier,
                oldValue: previousValue,
                newValue: nextValue,
            }),
        );

        dump.removeUpdateListener(chance.string());
        dump.replace(newValue);

        expect(dump.value).to.be.equal(newValue);
        expect(triggers).to.be.deep.equal([{
            identifier: exampleListener,
            oldValue: value,
            newValue,
        }]);
    });

    it('should be able to clear listener', (): void => {

        const value: string = chance.string();
        const newValue: string = chance.string();
        const exampleListener: string = chance.string();

        const triggers: Check[] = [];

        const dump: Dump<string> = Dump.create(chance.string(), value);

        dump.addUpdateListener(exampleListener,
            (identifier: string, nextValue: string, previousValue: string) => triggers.push({
                identifier,
                oldValue: previousValue,
                newValue: nextValue,
            }),
        );

        dump.clearUpdateListeners();
        dump.replace(newValue);

        expect(dump.value).to.be.equal(newValue);
        expect(triggers).to.be.deep.equal([]);
    });
});
