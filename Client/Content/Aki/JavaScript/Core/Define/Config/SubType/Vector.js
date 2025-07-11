"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = undefined;
class Vector {
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
  get Z() {
    return this.z();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsVector(t, s) {
    return (s || new Vector()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  x() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  y() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  z() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.Vector = Vector;
//# sourceMappingURL=Vector.js.map