import {AbstractBaseDataProvider} from '../abstract-base-data-provider';
import {getNumbers} from '../../generator/number-array-generator';

export class NumberDataProvider extends AbstractBaseDataProvider<number> {
    protected readonly data: number[];

    constructor(size: number) {
        super();
        this.data = getNumbers(size);
    }
}
