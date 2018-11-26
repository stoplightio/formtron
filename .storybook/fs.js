// WMH - Why am I using Filer instead of BrowserFS? IDK I just learned about Filer
// recently and it's 1/2 the KB of BrowserFS so I thought I'd try it.
import Filer from 'filer';

const fs = new Filer.FileSystem();

// Right now, only exporting members needed by @stoplight/graph
// Filer.js doesn't support passing optiosn to readdir
export const readdir = (path, opts, callback) => {
  if (!callback) {
    return fs.readdir.call(fs, path, opts);
  } else {
    return fs.readdir.call(fs, path, callback);
  }
};

export const stat = fs.stat.bind(fs);
export const readFile = fs.readFile.bind(fs);
export const writeFile = fs.writeFile.bind(fs);
export const mkdir = fs.mkdir.bind(fs);
