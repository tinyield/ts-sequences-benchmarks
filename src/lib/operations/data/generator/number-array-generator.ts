import {EVEN, ODD} from '../../common/constants';

export function getNumbers(size: number): number[] {
    const numbers = [];
    for (let i = 0; i < size; i++) {
        numbers.push(i);
    }
    return numbers;
}

export function getAllEven(size: number): number[] {
    const numbers = [];
    for (let i = 0; i < size; i++) {
        numbers.push(EVEN);
    }
    return numbers;
}

export function getAllEvenExceptEnd(size: number): number[] {
    const numbers = getAllEven(size);
    numbers[numbers.length - 1] = ODD;
    return numbers;
}

export function getAllEvenExceptMiddle(size: number): number[] {
    const numbers = getAllEven(size);
    numbers[numbers.length / 2 - 1] = ODD;
    return numbers;
}

export function getAllEvenExceptStart(size: number): number[] {
    const numbers = getAllEven(size);
    numbers[0] = ODD;
    return numbers;
}
