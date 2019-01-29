export class EasyArray {
  private defaultValue: any;
  public items: any[];
  constructor(items: any[], defaultValue: any) {
    this.items = [...items];
    this.defaultValue = defaultValue;
  }

  public update(index: number, val: any) {
    this.items.splice(index, 1, val);
    return this.items;
  }

  public insert(index: number) {
    this.items.splice(index, 0, this.defaultValue);
    return this.items;
  }

  public append() {
    this.items.splice(this.items.length, 0, this.defaultValue);
    return this.items;
  }

  public remove(index: number) {
    this.items.splice(index, 1);
    return this.items;
  }
}
