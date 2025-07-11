"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = undefined;
class Color {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get R() {
    return this.r();
  }
  get G() {
    return this.g();
  }
  get B() {
    return this.b();
  }
  get A() {
    return this.a();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsColor(t, s) {
    return (s || new Color()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  r() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  g() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  b() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  a() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.Color = Color;
//# sourceMappingURL=Color.js.map