import {AbstractBaseDataProvider} from '../abstract-base-data-provider';
import {getAllEvenExceptEnd} from '../../generator/number-array-generator';

export class EvenExceptEndSequenceDataProvider extends AbstractBaseDataProvider<number> {
    protected readonly data: number[];

    constructor(size: number) {
        super();
        this.data = getAllEvenExceptEnd(size);
    }
}
