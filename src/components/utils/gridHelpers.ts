export function parseGridTemplateAreas(rows: string[]): string[][] {
  return rows.map(row => row.split(/\s+/).map(x => x.trim()));
}

export function toGridTemplateAreas(rows: string[]): string {
  return rows.map(x => `"${x}"`).join(' ');
}

export function listAreas(rows: string[]): Set<string> {
  const parsed = parseGridTemplateAreas(rows);
  const flatSet = new Set();
  for (const row of parsed) {
    for (const col of row) {
      flatSet.add(col);
    }
  }
  return flatSet;
}
