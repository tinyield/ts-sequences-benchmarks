import {AbstractBaseDataProvider} from '../abstract-base-data-provider';
import {getAllEvenExceptStart} from '../../generator/number-array-generator';

export class EvenExceptStartSequenceDataProvider extends AbstractBaseDataProvider<number> {
    protected readonly data: number[];

    constructor(size: number) {
        super();
        this.data = getAllEvenExceptStart(size);
    }
}
