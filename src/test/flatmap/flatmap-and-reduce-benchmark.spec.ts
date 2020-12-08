import {expect} from 'chai';
import {FlatmapAndReduceBenchmark} from '../../lib/flatmap/flatmap-and-reduce-benchmark';

describe('FlatmapAndReduceBenchmark', () => {
    let instance: FlatmapAndReduceBenchmark;

    beforeEach(() => (instance = new FlatmapAndReduceBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Flatmap and Reduce';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.contain(expected);
        });
    });

    describe('when setup() is called', () => {
        const expected = 499500;
        beforeEach(() => instance.setup());

        it('should set data', () => {
            expect(instance.data).to.not.be.undefined;
            expect(instance.data.length).to.be.greaterThan(0);
        });

        describe('when ix is called', () => {
            it('should return 499500', () => expect(instance.ix()).to.equal(expected));
        });

        describe('when lazy is called', () => {
            it('should return 499500', () => expect(instance.lazy()).to.equal(expected));
        });

        describe('when lodash is called', () => {
            it('should return 499500', () => expect(instance.lodash()).to.equal(expected));
        });

        describe('when tinyield is called', () => {
            it('should return 499500', () => expect(instance.tinyield()).to.equal(expected));
        });

        describe('when sequency is called', () => {
            it('should return 499500', () => expect(instance.sequency()).to.equal(expected));
        });

        describe('when underscore is called', () => {
            it('should return 499500', () => expect(instance.underscore()).to.equal(expected));
        });

        describe('when arrays is called', () => {
            it('should return 499500', () => expect(instance.arrays()).to.equal(expected));
        });
    });
});
