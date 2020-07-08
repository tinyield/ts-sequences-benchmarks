export function isPrime(value: number): boolean {
    if (value <= 1) {
        return false;
    }
    if (value <= 3) {
        return true;
    }
    if (value % 2 === 0) {
        return false;
    }
    let i = 3;
    while (i * i <= value) {
        if (value % i === 0) {
            return false;
        }
        i += 2;
    }
    return true;
}
