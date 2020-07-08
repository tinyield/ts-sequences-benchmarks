import {AbstractBaseDataProvider} from '../abstract-base-data-provider';
import {getAllEven} from '../../generator/number-array-generator';

export class EvenSequenceDataProvider extends AbstractBaseDataProvider<number> {
    protected readonly data: number[];

    constructor(size: number) {
        super();
        this.data = getAllEven(size);
    }
}
