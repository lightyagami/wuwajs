"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DecalParams = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DecalParams {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, t) {
    this.bb_pos = a;
    this.bb = t;
    return this;
  }
  static getRootAsDecalParams(a, t) {
    return (t || new DecalParams()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsDecalParams(a, t) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DecalParams()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  spreadRadius() {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.readFloat32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  spreadTime() {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.readFloat32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  static startDecalParams(a) {
    a.startObject(3);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addSpreadRadius(a, t) {
    a.addFieldFloat32(1, t, 0);
  }
  static addSpreadTime(a, t) {
    a.addFieldFloat32(2, t, 0);
  }
  static endDecalParams(a) {
    return a.endObject();
  }
  static createDecalParams(a, t, s, e) {
    DecalParams.startDecalParams(a);
    DecalParams.addType(a, t);
    DecalParams.addSpreadRadius(a, s);
    DecalParams.addSpreadTime(a, e);
    return DecalParams.endDecalParams(a);
  }
}
exports.DecalParams = DecalParams;
//# sourceMappingURL=decal-params.js.map