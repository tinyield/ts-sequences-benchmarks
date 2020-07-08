import {Value} from '../../model/wrapper/value';
import {getNumbers} from './number-array-generator';

export function getValues(size: number): Value[] {
    return getNumbers(size).map(i => new Value(i));
}
