"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatRange = undefined;
class FloatRange {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Min() {
    return this.min();
  }
  get Max() {
    return this.max();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsFloatRange(t, s) {
    return (s || new FloatRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  min() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  max() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FloatRange = FloatRange;
//# sourceMappingURL=FloatRange.js.map