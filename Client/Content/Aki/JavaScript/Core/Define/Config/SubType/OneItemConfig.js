"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OneItemConfig = undefined;
class OneItemConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemId() {
    return this.itemid();
  }
  get Count() {
    return this.count();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsOneItemConfig(t, e) {
    return (e || new OneItemConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  count() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.OneItemConfig = OneItemConfig;
//# sourceMappingURL=OneItemConfig.js.map