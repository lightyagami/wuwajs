"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseCurve = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BaseCurve {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsBaseCurve(e, t) {
    return (t || new BaseCurve()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsBaseCurve(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new BaseCurve()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  n() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startBaseCurve(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addN(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static endBaseCurve(e) {
    return e.endObject();
  }
  static createBaseCurve(e, t, s) {
    BaseCurve.startBaseCurve(e);
    BaseCurve.addType(e, t);
    BaseCurve.addN(e, s);
    return BaseCurve.endBaseCurve(e);
  }
}
exports.BaseCurve = BaseCurve;
//# sourceMappingURL=base-curve.js.map