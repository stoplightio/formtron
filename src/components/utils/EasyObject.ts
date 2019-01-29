import fromPairs = require('lodash/fromPairs');

export class EasyObject {
  private defaultValue: any;
  public items: any[];
  constructor(value: object, defaultValue: any) {
    // Make this thing an array
    this.items = [...Object.entries(value)];
    this.defaultValue = defaultValue;
  }

  public update(index: number, val: any) {
    this.items.splice(index, 1, val);
    return fromPairs(this.items);
  }

  public updateKey(index: number, key: any) {
    this.items.splice(index, 1, [key, this.items[index][1]]);
    return fromPairs(this.items);
  }

  public updateVal(index: number, val: any) {
    this.items.splice(index, 1, [this.items[index][0], val]);
    return fromPairs(this.items);
  }

  public insert(index: number) {
    this.items.splice(index, 0, ['', this.defaultValue]);
    return fromPairs(this.items);
  }

  public append() {
    this.items.splice(this.items.length, 0, ['', this.defaultValue]);
    return fromPairs(this.items);
  }

  public remove(index: number) {
    this.items.splice(index, 1);
    return fromPairs(this.items);
  }
}
