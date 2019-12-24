import {Observable} from 'rxjs';
import {AsyncIterable} from 'ix';

export interface AsyncDataProvider<T> {
    observable(): Observable<T>;
    iterable(): AsyncIterable<T>;
}
