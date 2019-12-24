import {AsyncDataProvider} from './async-data-provider';
import {createReadStream, ReadStream} from 'fs';
import {createInterface, Interface} from 'readline';
import {Observable, Subject} from 'rxjs';
import {AsyncIterable} from 'ix/Ix';
import {Tinyield} from 'tinyield4ts';

export class AsyncFileDataProvider implements AsyncDataProvider<string> {
    public static observable(filename: string): Observable<string> {
        return new AsyncFileDataProvider(filename).observable();
    }

    public static iterable(filename: string): AsyncIterable<string> {
        return new AsyncFileDataProvider(filename).iterable();
    }

    public static tinyield(filename: string): Tinyield<string> {
        return new AsyncFileDataProvider(filename).tinyield();
    }

    constructor(private readonly filename: string) {}

    private dataStream(): ReadStream {
        return createReadStream(this.filename);
    }

    iterable(): AsyncIterable<string> {
        const stream = this.dataStream();
        const reader = createInterface(stream);
        reader.on('close', () => stream.close());
        return AsyncIterable.from(reader);
    }

    observable(): Observable<string> {
        const subject = new Subject<string>();
        const stream = this.dataStream();
        stream.on('error', error => {
            console.error(error);
            subject.error(error);
            stream.close();
        });
        stream.on('close', () => subject.complete());
        const reader = createInterface(stream);
        reader.on('close', () => stream.close());
        reader.on('error', error => {
            console.error(error);
            subject.error(error);
            reader.close();
        });
        reader.on('line', line => subject.next(line));
        return subject.asObservable();
    }

    tinyield(): Tinyield<string> {
        return new Tinyield<string>(yld => {
            const stream = this.dataStream();
            stream.on('error', error => {
                console.error(error);
                stream.close();
                throw new Error(error);
            });
            const reader = createInterface(stream);
            reader.on('close', () => stream.close());
            reader.on('error', error => {
                console.error(error);
                reader.close();
                throw new Error(error);
            });
            reader.on('line', line => yld(line));
        });
    }

    private async emmitLines(reader: Interface, subject: Subject<string>) {
        for await (const line of reader) {
            subject.next(line);
        }
    }
}
