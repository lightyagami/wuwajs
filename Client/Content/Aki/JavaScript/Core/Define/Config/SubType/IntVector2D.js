"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntVector2D = undefined;
class IntVector2D {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get X() {
    return this.x();
  }
  get Y() {
    return this.y();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsIntVector2D(t, s) {
    return (s || new IntVector2D()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  x() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  y() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.IntVector2D = IntVector2D;
//# sourceMappingURL=IntVector2D.js.map