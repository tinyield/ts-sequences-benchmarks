import {Country} from '../../model/country/country';
import * as fs from 'fs';

export const SILENT = true;

export function getResourceName(base: string, name: string): string {
    return `${__dirname}/../../../../assets/${base}/${name}.json`;
}

export function loadData<T>(base: string, country: Country): {[p: string]: T[]} {
    try {
        const data: T[] = JSON.parse(fs.readFileSync(getResourceName(base, country.name)).toString());
        return {
            [country.name]: data,
        };
    } catch (error) {
        if (!SILENT) {
            console.error(`data for country ${country.name} was ignored due to an error`, error);
        }
        return {};
    }
}
