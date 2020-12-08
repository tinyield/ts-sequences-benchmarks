import {expect} from 'chai';
import {ZipPrimesBenchmark} from '../../lib/zip/zip-primes-benchmark';

describe('ZipPrimesBenchmark', () => {
    let instance: ZipPrimesBenchmark;

    beforeEach(() => (instance = new ZipPrimesBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Zip Primes with Values';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.contain(expected);
        });
    });

    describe('when setup() is called', () => {
        const expected = 168;
        beforeEach(() => instance.setup());

        it('should set numbers and values', () => {
            expect(instance.numbers).to.be.an('array');
            expect(instance.values).to.be.an('array');
            expect(instance.numbers.length).to.equal(instance.COLLECTION_SIZE);
            expect(instance.values.length).to.equal(instance.COLLECTION_SIZE);
        });

        describe('when getNumbers() is called', () => {
            let actual: number[];
            beforeEach(() => (actual = instance.getNumbers()));
            it('should return a number[] with COLLECTION_SIZE ', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.equal(instance.COLLECTION_SIZE);
            });
        });

        describe('when ix is called', () => {
            it('should return 168', () => expect(instance.ixPipeline().count()).to.equal(expected));
        });

        describe('when lazy is called', () => {
            it('should return 168', () => expect(instance.lazyPipeline().size()).to.equal(expected));
        });

        describe('when lodash is called', () => {
            it('should return 168', () =>
                expect(
                    instance
                        .lodashPipeline()
                        .size()
                        .value()
                ).to.equal(expected));
        });

        describe('when tinyield is called', () => {
            it('should return 168', () => expect(instance.tinyieldPipeline().count()).to.equal(expected));
        });

        describe('when sequency is called', () => {
            it('should return 168', () => expect(instance.sequencyPipeline().count()).to.equal(expected));
        });

        describe('when underscore is called', () => {
            it('should return 168', () =>
                expect(
                    instance
                        .underscorePipeline()
                        .size()
                        .value()
                ).to.equal(expected));
        });

        describe('when arrays is called', () => {
            it('should return 168', () => expect(instance.arraysPipeline().length).to.equal(expected));
        });
    });
});
