export function parseGridTemplateAreas(rows: string[]): string[][] {
  return rows.map(row => row.split(/\s+/).map(x => x.trim()));
}
