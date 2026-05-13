export const chargesInProcess = new Set();

export function addCharge(id: string) {
    chargesInProcess.add(id);

    setTimeout(() => {
        chargesInProcess.delete(id);
    }, 18000000); // 5 horas
}

export function isValidCharge(id: string) {
    return chargesInProcess.has(id);
}

export const deleteCharge = (id: string) => {
    chargesInProcess.delete(id);
}