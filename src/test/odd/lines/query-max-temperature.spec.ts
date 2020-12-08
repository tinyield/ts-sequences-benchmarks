import {expect} from 'chai';
import {QueryMaxTemperature} from '../../../lib/odd/lines/query-max-temperature';

describe('QueryMaxTemperature', () => {
    let instance: QueryMaxTemperature;

    beforeEach(() => (instance = new QueryMaxTemperature()));

    describe('when name() is called', () => {
        const expected = 'Query Max Temperature Benchmark';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.equal(expected);
        });
    });

    describe('when setup() is called', () => {
        const expected = 27;
        beforeEach(() => instance.setup());

        it('should set data', () => {
            expect(instance.src).to.not.be.undefined;
        });

        describe('when ix is called', () => {
            it('should return 27', () => expect(instance.ix()).to.equal(expected));
        });

        describe('when lazy is called', () => {
            it('should return 27', () => expect(instance.lazy()).to.equal(expected));
        });

        describe('when lodash is called', () => {
            it('should return 27', () => expect(instance.lodash()).to.equal(expected));
        });

        describe('when tinyield is called', () => {
            it('should return 27', () => expect(instance.tinyield()).to.equal(expected));
        });

        describe('when sequency is called', () => {
            it('should return 27', () => expect(instance.sequency()).to.equal(expected));
        });

        describe('when underscore is called', () => {
            it('should return 27', () => expect(instance.underscore()).to.equal(expected));
        });

        describe('when arrays is called', () => {
            it('should return 27', () => expect(instance.arrays()).to.equal(expected));
        });
    });
});
