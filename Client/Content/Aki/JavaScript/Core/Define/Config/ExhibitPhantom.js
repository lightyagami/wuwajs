"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExhibitPhantom = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ExhibitPhantom {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BodyType() {
    return this.bodytype();
  }
  get Zoom() {
    return GameUtils_1.GameUtils.ConvertToArray(this.zoomLength(), this.zoom, this);
  }
  get Location() {
    return GameUtils_1.GameUtils.ConvertToArray(this.locationLength(), this.location, this);
  }
  get Rotator() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rotatorLength(), this.rotator, this);
  }
  get Lock() {
    return this.lock();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsExhibitPhantom(t, i) {
    return (i || new ExhibitPhantom()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bodytype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetZoomAt(t) {
    return this.zoom(t);
  }
  zoom(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  zoomLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  zoomArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetLocationAt(t) {
    return this.location(t);
  }
  location(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  locationLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  locationArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRotatorAt(t) {
    return this.rotator(t);
  }
  rotator(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rotatorLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rotatorArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  lock() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.ExhibitPhantom = ExhibitPhantom;
//# sourceMappingURL=ExhibitPhantom.js.map