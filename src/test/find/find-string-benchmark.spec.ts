import {expect} from 'chai';
import {FindStringBenchmark} from '../../lib/find/find-string-benchmark';

describe('FindStringBenchmark', () => {
    let instance: FindStringBenchmark;

    beforeEach(() => (instance = new FindStringBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Find String ';
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

        describe('when getStrings() is called', () => {
            let actual: string[];
            beforeEach(() => (actual = instance.getStrings()));
            it('should return a string[] with COLLECTION_SIZE', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.equal(instance.COLLECTION_SIZE);
            });
        });

        describe('when ix is called', () => {
            it('should return the matched element', () => {
                const actual: string = instance.ix();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(`${instance.index - 1}`);
            });
        });

        describe('when lazy is called', () => {
            it('should return the matched element', () => {
                const actual: string = instance.lazy();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(`${instance.index - 1}`);
            });
        });

        describe('when lodash is called', () => {
            it('should return the matched element', () => {
                const actual: string = instance.lodash();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(`${instance.index - 1}`);
            });
        });

        describe('when tinyield is called', () => {
            it('should return the matched element', () => {
                const actual: string = instance.tinyield();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(`${instance.index - 1}`);
            });
        });

        describe('when sequency is called', () => {
            it('should return the matched element', () => {
                const actual: string = instance.sequency();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(`${instance.index - 1}`);
            });
        });

        describe('when underscore is called', () => {
            it('should return the matched element', () => {
                const actual: string = instance.underscore();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(`${instance.index - 1}`);
            });
        });

        describe('when arrays is called', () => {
            it('should return the matched element', () => {
                const actual: string = instance.arrays();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(`${instance.index - 1}`);
            });
        });
    });
});
