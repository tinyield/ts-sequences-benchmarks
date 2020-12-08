import {AllMatchBenchmark} from '../../../lib/all.match/all-match-benchmark';
import {expect} from 'chai';
import {EVEN} from '../../../lib/common/constants';

describe('AllMatchBenchmark', () => {
    let instance: AllMatchBenchmark;

    beforeEach(() => (instance = new AllMatchBenchmark()));

    describe('when name() is called', () => {
        const expected = 'All match';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.contain(expected);
        });
    });

    describe('when setup() is called', () => {
        beforeEach(() => instance.setup());

        it('should set data', () => {
            expect(instance.data).to.be.an('array');
        });

        describe('when getAllEven() is called', () => {
            let actual: number[];
            beforeEach(() => (actual = instance.getAllEven()));
            it('should return a number[] with COLLECTION_SIZE filled with the constant EVEN', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.be.greaterThan(0);
                for (const element of actual) {
                    expect(element).to.equal(EVEN);
                }
            });
        });

        describe('when ix is called', () => {
            it('should return true', () => expect(instance.ix()).to.be.true);
        });

        describe('when lazy is called', () => {
            it('should return true', () => expect(instance.lazy()).to.be.true);
        });

        describe('when lodash is called', () => {
            it('should return true', () => expect(instance.lodash()).to.be.true);
        });

        describe('when tinyield is called', () => {
            it('should return true', () => expect(instance.tinyield()).to.be.true);
        });

        describe('when sequency is called', () => {
            it('should return true', () => expect(instance.sequency()).to.be.true);
        });

        describe('when underscore is called', () => {
            it('should return true', () => expect(instance.underscore()).to.be.true);
        });

        describe('when arrays is called', () => {
            it('should return true', () => expect(instance.arrays()).to.be.true);
        });
    });
});
