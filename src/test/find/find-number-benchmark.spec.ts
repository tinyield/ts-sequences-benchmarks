import {expect} from 'chai';
import {FindNumberBenchmark} from '../../lib/find/find-number-benchmark';

describe('FindNumberBenchmark', () => {
    let instance: FindNumberBenchmark;

    beforeEach(() => (instance = new FindNumberBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Find Number ';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.contain(expected);
        });
    });

    describe('when setup() is called', () => {
        beforeEach(() => instance.setup());

        it('should set a and b arrays', () => {
            expect(instance.a).to.be.an('array');
            expect(instance.b).to.be.an('array');
        });

        describe('when getNumbers() is called', () => {
            let actual: number[];
            beforeEach(() => (actual = instance.getNumbers()));
            it('should return a number[] with COLLECTION_SIZE', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.equal(instance.COLLECTION_SIZE);
            });
        });

        describe('when ix is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.ix();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.index - 1);
            });
        });

        describe('when lazy is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.lazy();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.index - 1);
            });
        });

        describe('when lodash is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.lodash();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.index - 1);
            });
        });

        describe('when tinyield is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.tinyield();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.index - 1);
            });
        });

        describe('when sequency is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.sequency();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.index - 1);
            });
        });

        describe('when underscore is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.underscore();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.index - 1);
            });
        });

        describe('when arrays is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.arrays();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.index - 1);
            });
        });
    });
});
