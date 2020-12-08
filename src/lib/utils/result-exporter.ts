import {sync} from 'write';

export class ResultExporter {
    private static _instance: ResultExporter;
    private readonly data: string[];

    private constructor() {
        this.data = [];
    }

    static instance(): ResultExporter {
        if (ResultExporter._instance === undefined) {
            ResultExporter._instance = new ResultExporter();
        }
        return ResultExporter._instance;
    }

    appendLine(line: string): void {
        this.data.push(line);
    }

    writeTo(file: string): void {
        sync<string>(file, this.data.join('\n'));
    }
}
