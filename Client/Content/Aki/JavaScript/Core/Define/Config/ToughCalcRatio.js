"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToughCalcRatio = undefined;
class ToughCalcRatio {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RatioNormal() {
    return this.rationormal();
  }
  get RatioSpecial() {
    return this.ratiospecial();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsToughCalcRatio(t, i) {
    return (i || new ToughCalcRatio()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  rationormal() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ratiospecial() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ToughCalcRatio = ToughCalcRatio;
//# sourceMappingURL=ToughCalcRatio.js.map