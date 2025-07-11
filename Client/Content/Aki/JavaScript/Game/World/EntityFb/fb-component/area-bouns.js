"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaBouns = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AreaBouns {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsAreaBouns(t, e) {
    return (e || new AreaBouns()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAreaBouns(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new AreaBouns()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAreaBouns(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endAreaBouns(t) {
    return t.endObject();
  }
  static createAreaBouns(t, e) {
    AreaBouns.startAreaBouns(t);
    AreaBouns.addType(t, e);
    return AreaBouns.endAreaBouns(t);
  }
}
exports.AreaBouns = AreaBouns;
//# sourceMappingURL=area-bouns.js.map