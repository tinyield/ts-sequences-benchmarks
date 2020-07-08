import {NumberDataProvider} from '../data/provider/number/number-data-provider';
import {ValueDataProvider} from '../data/provider/object/value-data-provider';
import {EvenSequenceDataProvider} from '../data/provider/number/even-sequence-data-provider';
import {COLLECTION_SIZE} from '../common/constants';
import {EvenExceptEndSequenceDataProvider} from '../data/provider/number/even-except-end-sequence-data-provider';
import {EvenExceptMiddleSequenceDataProvider} from '../data/provider/number/even-except-middle-sequence-data-provider';
import {EvenExceptStartSequenceDataProvider} from '../data/provider/number/even-except-start-sequence-data-provider';
import {NestedNumberDataProvider} from '../data/provider/number/nested-number-data-provider';

export abstract class OperationUtils {
    protected readonly numbers: NumberDataProvider;
    protected readonly even: EvenSequenceDataProvider;
    protected readonly values: ValueDataProvider;
    protected readonly evenExceptStart: EvenExceptStartSequenceDataProvider;
    protected readonly evenExceptMiddle: EvenExceptMiddleSequenceDataProvider;
    protected readonly evenExceptEnd: EvenExceptEndSequenceDataProvider;
    protected readonly nested: NestedNumberDataProvider;

    constructor() {
        this.numbers = new NumberDataProvider(COLLECTION_SIZE);
        this.even = new EvenSequenceDataProvider(COLLECTION_SIZE);
        this.evenExceptStart = new EvenExceptStartSequenceDataProvider(COLLECTION_SIZE);
        this.evenExceptMiddle = new EvenExceptMiddleSequenceDataProvider(COLLECTION_SIZE);
        this.evenExceptEnd = new EvenExceptEndSequenceDataProvider(COLLECTION_SIZE);
        this.values = new ValueDataProvider(COLLECTION_SIZE);
        this.nested = new NestedNumberDataProvider(COLLECTION_SIZE);
    }
}
