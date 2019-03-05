export function toGridTemplateAreas(rows: string[]): string {
  return rows.map(x => `"${x}"`).join(' ');
}
