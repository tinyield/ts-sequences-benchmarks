import {AbstractBaseDataProvider} from '../abstract-base-data-provider';
import {getAllEvenExceptMiddle} from '../../generator/number-array-generator';

export class EvenExceptMiddleSequenceDataProvider extends AbstractBaseDataProvider<number> {
    protected readonly data: number[];

    constructor(size: number) {
        super();
        this.data = getAllEvenExceptMiddle(size);
    }
}
