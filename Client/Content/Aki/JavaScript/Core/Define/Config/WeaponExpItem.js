"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponExpItem = undefined;
class WeaponExpItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Cost() {
    return this.cost();
  }
  get BasicExp() {
    return this.basicexp();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsWeaponExpItem(t, s) {
    return (s || new WeaponExpItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cost() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  basicexp() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.WeaponExpItem = WeaponExpItem;
//# sourceMappingURL=WeaponExpItem.js.map