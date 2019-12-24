import {readFileSync} from 'fs';
import {EOL} from 'os';

export class FileDataProvider {
    public static get(filename: string): string[] {
        return new FileDataProvider(filename).get();
    }

    private constructor(private readonly filename: string) {}

    get(): string[] {
        return readFileSync(this.filename)
            .toString()
            .split(EOL);
    }
}
