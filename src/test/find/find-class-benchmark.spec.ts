import {expect} from 'chai';
import {Value} from '../../lib/common/model/wrapper/value';
import {FindClassBenchmark} from '../../lib/find/find-class-benchmark';

describe('FindClassBenchmark', () => {
    let instance: FindClassBenchmark;

    beforeEach(() => (instance = new FindClassBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Find Class ';
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

        describe('when getValues() is called', () => {
            let actual: Value[];
            beforeEach(() => (actual = instance.getValues()));
            it('should return a Value[] with COLLECTION_SIZE', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.equal(instance.COLLECTION_SIZE);
            });
        });

        describe('when ix is called', () => {
            it('should return the matched element', () => {
                const actual: Value = instance.ix();
                expect(actual).to.not.be.undefined;
                expect(actual.value).to.equal(instance.index - 1);
            });
        });

        describe('when lazy is called', () => {
            it('should return the matched element', () => {
                const actual: Value = instance.lazy();
                expect(actual).to.not.be.undefined;
                expect(actual.value).to.equal(instance.index - 1);
            });
        });

        describe('when lodash is called', () => {
            it('should return the matched element', () => {
                const actual: Value = instance.lodash();
                expect(actual).to.not.be.undefined;
                expect(actual.value).to.equal(instance.index - 1);
            });
        });

        describe('when tinyield is called', () => {
            it('should return the matched element', () => {
                const actual: Value = instance.tinyield();
                expect(actual).to.not.be.undefined;
                expect(actual.value).to.equal(instance.index - 1);
            });
        });

        describe('when sequency is called', () => {
            it('should return the matched element', () => {
                const actual: Value = instance.sequency();
                expect(actual).to.not.be.undefined;
                expect(actual.value).to.equal(instance.index - 1);
            });
        });

        describe('when underscore is called', () => {
            it('should return the matched element', () => {
                const actual: Value = instance.underscore();
                expect(actual).to.not.be.undefined;
                expect(actual.value).to.equal(instance.index - 1);
            });
        });

        describe('when arrays is called', () => {
            it('should return the matched element', () => {
                const actual: Value = instance.arrays();
                expect(actual).to.not.be.undefined;
                expect(actual.value).to.equal(instance.index - 1);
            });
        });
    });
});
