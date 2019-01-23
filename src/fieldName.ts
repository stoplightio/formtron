export function fieldName(propSchema: any) {
  return propSchema.type === 'object' ? propSchema.items.type + '{}' : propSchema.type;
}
