export function makeInvoiceNumber(seq = 1) {
    const year = new Date().getFullYear();
    return `AJ-${year}-${String(seq).padStart(5, "0")}`;
  }
  