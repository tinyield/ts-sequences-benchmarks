import {expect} from 'chai';
import {EVEN, ODD} from '../../lib/common/constants';
import {FirstInEndBenchmark} from '../../lib/first/first-in-end-benchmark';

describe('FirstInEndBenchmark', () => {
    let instance: FirstInEndBenchmark;

    beforeEach(() => (instance = new FirstInEndBenchmark()));

    describe('when name() is called', () => {
        const expected = 'First in the End ';
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

        describe('when getSource() is called', () => {
            let actual: number[];
            beforeEach(() => (actual = instance.getSource()));
            it('should return a number[] with COLLECTION_SIZE', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.equal(instance.COLLECTION_SIZE);
                expect(actual[actual.length - 1]).to.equal(ODD);
                for (let i = 1; i < actual.length - 1; i++) {
                    expect(actual[i]).to.equal(EVEN);
                }
            });
        });

        describe('when ix is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.ix();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(ODD);
            });
        });

        describe('when lazy is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.lazy();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(ODD);
            });
        });

        describe('when lodash is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.lodash();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(ODD);
            });
        });

        describe('when tinyield is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.tinyield();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(ODD);
            });
        });

        describe('when sequency is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.sequency();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(ODD);
            });
        });

        describe('when underscore is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.underscore();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(ODD);
            });
        });

        describe('when arrays is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.arrays();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(ODD);
            });
        });
    });
});
