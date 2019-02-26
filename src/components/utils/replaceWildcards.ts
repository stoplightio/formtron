export const replaceWildcards = (name: string, path: string[]) => {
  const _name = name.split('.');
  const newpath = [];
  for (let i = 0; i < _name.length; i++) {
    const part = _name[i];
    if (part === '*' || part === '?') {
      newpath.push(path[i]);
    } else {
      newpath.push(part);
    }
    if (part === '?') break;
  }
  return newpath;
};
