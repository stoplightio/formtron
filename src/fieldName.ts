export function fieldName(propSchema: any) {
  return propSchema.type === 'array'
    ? propSchema.items.type + '[]'
    : propSchema.type === 'object'
      ? propSchema.items.type + '{}'
      : propSchema.type;
}
