"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PosRectangle = undefined;
class PosRectangle {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get XMin() {
    return this.xmin();
  }
  get YMin() {
    return this.ymin();
  }
  get XMax() {
    return this.xmax();
  }
  get YMax() {
    return this.ymax();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPosRectangle(t, s) {
    return (s || new PosRectangle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  xmin() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ymin() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  xmax() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ymax() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PosRectangle = PosRectangle;
//# sourceMappingURL=PosRectangle.js.map