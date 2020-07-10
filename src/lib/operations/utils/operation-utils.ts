import {NumberDataProvider} from '../data/provider/number/number-data-provider';
import {ValueDataProvider} from '../data/provider/object/value-data-provider';
import {EvenSequenceDataProvider} from '../data/provider/number/even-sequence-data-provider';
import {EvenExceptEndSequenceDataProvider} from '../data/provider/number/even-except-end-sequence-data-provider';
import {EvenExceptMiddleSequenceDataProvider} from '../data/provider/number/even-except-middle-sequence-data-provider';
import {EvenExceptStartSequenceDataProvider} from '../data/provider/number/even-except-start-sequence-data-provider';
import {NestedNumberDataProvider} from '../data/provider/number/nested-number-data-provider';
import {getCLIArguments} from '../../utils/benchmark-cli-arguments';

export abstract class OperationUtils {
    protected readonly numbers: NumberDataProvider;
    protected readonly even: EvenSequenceDataProvider;
    protected readonly values: ValueDataProvider;
    protected readonly evenExceptStart: EvenExceptStartSequenceDataProvider;
    protected readonly evenExceptMiddle: EvenExceptMiddleSequenceDataProvider;
    protected readonly evenExceptEnd: EvenExceptEndSequenceDataProvider;
    protected readonly nested: NestedNumberDataProvider;

    constructor() {
        const size = getCLIArguments().size;
        this.numbers = new NumberDataProvider(size);
        this.even = new EvenSequenceDataProvider(size);
        this.evenExceptStart = new EvenExceptStartSequenceDataProvider(size);
        this.evenExceptMiddle = new EvenExceptMiddleSequenceDataProvider(size);
        this.evenExceptEnd = new EvenExceptEndSequenceDataProvider(size);
        this.values = new ValueDataProvider(size);
        this.nested = new NestedNumberDataProvider(size);
    }
}
