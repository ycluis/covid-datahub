export function validateCsvHeaders(
  row: Record<string, any>,
  expectedHeaders: string[],
): void {
  const headers = Object.keys(row).map((h) => h.toLowerCase());
  const expected = new Set(expectedHeaders);

  const unknown = headers.filter((h) => !expected.has(h));
  const missing = expectedHeaders.filter((h) => !headers.includes(h));

  if (unknown.length > 0 || missing.length > 0) {
    throw new Error(
      `❌ CSV header mismatch.\nMissing: [${missing.join(', ')}]\nUnexpected: [${unknown.join(', ')}]`,
    );
  }
}

export function normalizeCsvRow(row: Record<string, any>): Record<string, any> {
  const normalized: Record<string, any> = {};

  for (const [key, value] of Object.entries(row)) {
    const loweredKey = key.toLowerCase();

    if (loweredKey === 'date' || loweredKey === 'state') {
      normalized[loweredKey] = value;
    } else {
      const parsed = value === '' || value === undefined ? 0 : Number(value);
      normalized[loweredKey] = isNaN(parsed) ? 0 : parsed;
    }
  }

  return normalized;
}
