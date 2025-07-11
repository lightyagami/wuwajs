"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VectorInfo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VectorInfo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsVectorInfo(t, r) {
    return (r || new VectorInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVectorInfo(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new VectorInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  x() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  y() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  z() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startVectorInfo(t) {
    t.startObject(3);
  }
  static addX(t, r) {
    t.addFieldFloat32(0, r, 0);
  }
  static addY(t, r) {
    t.addFieldFloat32(1, r, 0);
  }
  static addZ(t, r) {
    t.addFieldFloat32(2, r, 0);
  }
  static endVectorInfo(t) {
    return t.endObject();
  }
  static createVectorInfo(t, r, e, s) {
    VectorInfo.startVectorInfo(t);
    VectorInfo.addX(t, r);
    VectorInfo.addY(t, e);
    VectorInfo.addZ(t, s);
    return VectorInfo.endVectorInfo(t);
  }
}
exports.VectorInfo = VectorInfo;
//# sourceMappingURL=vector-info.js.map