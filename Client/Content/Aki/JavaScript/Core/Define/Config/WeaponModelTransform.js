"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponModelTransform = undefined;
const Vector_1 = require("./SubType/Vector");
class WeaponModelTransform {
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
  get RotateTime() {
    return this.rotatetime();
  }
  get ScabbardOffset() {
    return this.scabbardoffset();
  }
  get ShowScabbard() {
    return this.showscabbard();
  }
  get AxisRotate() {
    return this.axisrotate();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsWeaponModelTransform(t, r) {
    return (r || new WeaponModelTransform()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  rotation(t) {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  size() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  rotatetime() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scabbardoffset(t) {
    var r = this.J7.__offset(this.z7, 14);
    if (r) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  showscabbard() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  axisrotate(t) {
    var r = this.J7.__offset(this.z7, 18);
    if (r) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
}
exports.WeaponModelTransform = WeaponModelTransform;
//# sourceMappingURL=WeaponModelTransform.js.map