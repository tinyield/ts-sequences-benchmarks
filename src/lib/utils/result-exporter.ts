import {sync} from 'write';

export class ResultExporter {
    private static _instance: ResultExporter;
    private readonly data: string[];

    static instance(): ResultExporter {
        if (ResultExporter._instance === undefined) {
            ResultExporter._instance = new ResultExporter();
        }
        return ResultExporter._instance;
    }

    private constructor() {
        this.data = [];
    }

    appendLine(line: string): void {
        this.data.push(line);
    }

    writeTo(file: string): void {
        sync<string>(file, this.data.join('\n'));
    }
}
