export const transfersInProcess: Map<string, boolean> = new Map();

export const addTransfer = (transfer_id: string) => {
    setTimeout(() => {
        transfersInProcess.delete(transfer_id);
    }, 1000 * 60 * 5);

    transfersInProcess.set(transfer_id, true);
};

export const deleteTransfer = (transfer_id: string) => {
    transfersInProcess.delete(transfer_id);
};

export const isValidTransfer = (transfer_id: string) => {
    return transfersInProcess.has(transfer_id);
};