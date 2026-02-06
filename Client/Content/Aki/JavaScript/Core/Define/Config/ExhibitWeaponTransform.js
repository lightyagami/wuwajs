"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExhibitWeaponTransform = undefined;
const Vector_1 = require("./SubType/Vector");
class ExhibitWeaponTransform {
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
  get ScabbardRotationOffset() {
    return this.scabbardrotationoffset();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsExhibitWeaponTransform(t, i) {
    return (i || new ExhibitWeaponTransform()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  rotation(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
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
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  showscabbard() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  axisrotate(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  scabbardrotationoffset(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
}
exports.ExhibitWeaponTransform = ExhibitWeaponTransform;
//# sourceMappingURL=ExhibitWeaponTransform.js.map