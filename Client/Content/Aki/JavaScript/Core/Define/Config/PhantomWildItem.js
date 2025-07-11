"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomWildItem = undefined;
class PhantomWildItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemId() {
    return this.itemid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPhantomWildItem(t, e) {
    return (e || new PhantomWildItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomWildItem = PhantomWildItem;
//# sourceMappingURL=PhantomWildItem.js.map