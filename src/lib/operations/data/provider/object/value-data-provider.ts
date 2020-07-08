import {AbstractBaseDataProvider} from '../abstract-base-data-provider';
import {Value} from '../../../model/wrapper/value';
import {getValues} from '../../generator/value-generator';

export class ValueDataProvider extends AbstractBaseDataProvider<Value> {
    protected readonly data: Value[];

    constructor(size: number) {
        super();
        this.data = getValues(size);
    }
}
