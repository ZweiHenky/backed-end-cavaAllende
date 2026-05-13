const purchasesInProcess = new Set();

function addPurchase(id: string) {
    purchasesInProcess.add(id);

    setTimeout(() => {
        purchasesInProcess.delete(id);
    }, 18000000); // 5 horas
}

function isValidPurchase(id: string) {
    return purchasesInProcess.has(id);
}

const deletePurchase = (id: string) => {
    purchasesInProcess.delete(id);
}

export {
    addPurchase,
    isValidPurchase,
    deletePurchase
}