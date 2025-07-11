"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EquivConversion = undefined;
class EquivConversion {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DamageRatio() {
    return this.damageratio();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsEquivConversion(t, i) {
    return (i || new EquivConversion()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageratio() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.EquivConversion = EquivConversion;
//# sourceMappingURL=EquivConversion.js.map