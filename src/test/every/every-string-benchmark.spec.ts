import {expect} from 'chai';
import {EveryStringBenchmark} from '../../lib/every/every-string-benchmark';

describe('EveryStringBenchmark', () => {
    let instance: EveryStringBenchmark;

    beforeEach(() => (instance = new EveryStringBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Every String ';
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

        describe('when getValues() is called', () => {
            let actual: string[];
            beforeEach(() => (actual = instance.getStrings()));
            it('should return a string[] with COLLECTION_SIZE', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.equal(instance.COLLECTION_SIZE);
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
