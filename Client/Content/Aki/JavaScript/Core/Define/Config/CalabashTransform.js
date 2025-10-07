"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashTransform = undefined;
const Vector_1 = require("./SubType/Vector");
class CalabashTransform {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Location() {
    return this.location();
  }
  get Rotation() {
    return this.rotation();
  }
  get Size() {
    return this.size();
  }
  get AxisRotate() {
    return this.axisrotate();
  }
  get RotateTime() {
    return this.rotatetime();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsCalabashTransform(t, s) {
    return (s || new CalabashTransform()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  location(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  rotation(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  size(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  axisrotate(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  rotatetime() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CalabashTransform = CalabashTransform;
//# sourceMappingURL=CalabashTransform.js.map