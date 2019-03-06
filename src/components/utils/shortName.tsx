export function shortName(propertyPath: string) {
  return propertyPath.split('.').pop() as string;
}
