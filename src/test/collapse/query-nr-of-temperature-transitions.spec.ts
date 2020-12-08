import {expect} from 'chai';
import {QueryNrOfTemperatureTransitions} from '../../lib/collapse/query-nr-of-temperature-transitions';

describe('QueryNrOfTemperatureTransitions', () => {
    let instance: QueryNrOfTemperatureTransitions;

    beforeEach(() => (instance = new QueryNrOfTemperatureTransitions()));

    describe('when name() is called', () => {
        const expected = 'Query Number of Temperature Transitions Benchmark';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.equal(expected);
        });
    });

    describe('when setup() is called', () => {
        const expected = 79;
        beforeEach(() => instance.setup());

        it('should set data', () => {
            expect(instance.src).to.not.be.undefined;
        });

        describe('when ix is called', () => {
            it('should return 79', () => expect(instance.ix()).to.equal(expected));
        });

        describe('when lazy is called', () => {
            it('should return 79', () => expect(instance.lazy()).to.equal(expected));
        });

        describe('when lodash is called', () => {
            it('should return 79', () => expect(instance.lodash()).to.equal(expected));
        });

        describe('when tinyield is called', () => {
            it('should return 79', () => expect(instance.tinyield()).to.equal(expected));
        });

        describe('when sequency is called', () => {
            it('should return 79', () => expect(instance.sequency()).to.equal(expected));
        });

        describe('when underscore is called', () => {
            it('should return 79', () => expect(instance.underscore()).to.equal(expected));
        });

        describe('when arrays is called', () => {
            it('should return 79', () => expect(instance.arrays()).to.equal(expected));
        });
    });
});
