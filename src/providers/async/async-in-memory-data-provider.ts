import {AsyncDataProvider} from './async-data-provider';
import {Observable, of} from 'rxjs';
import {AsyncIterable} from 'ix/Ix';
import {Tinyield} from 'tinyield4ts';

export class AsyncInMemoryDataProvider<T> implements AsyncDataProvider<T> {
    data: T[];
    private readonly onLoad: Promise<boolean>;
    private resolve: () => void;

    constructor(private readonly source: Observable<T>) {
        this.data = [];
        this.onLoad = new Promise(resolve => {
            this.resolve = resolve;
        });
        source.subscribe(value => this.data.push(value));
        source.toPromise().then(() => this.resolve());
    }

    iterable(): AsyncIterable<T> {
        return AsyncIterable.of(...this.data);
    }

    observable(): Observable<T> {
        return of(...this.data);
    }

    tinyield(): Tinyield<T> {
        return Tinyield.of(this.data);
    }

    hasLoadedData(): Promise<boolean> {
        return this.onLoad;
    }
}
