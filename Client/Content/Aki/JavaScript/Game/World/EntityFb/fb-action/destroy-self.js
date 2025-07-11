"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroySelf = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroySelf {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsDestroySelf(t, e) {
    return (e || new DestroySelf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDestroySelf(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DestroySelf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  delayDestroy() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDestroySelf(t) {
    t.startObject(1);
  }
  static addDelayDestroy(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endDestroySelf(t) {
    return t.endObject();
  }
  static createDestroySelf(t, e) {
    DestroySelf.startDestroySelf(t);
    DestroySelf.addDelayDestroy(t, e);
    return DestroySelf.endDestroySelf(t);
  }
}
exports.DestroySelf = DestroySelf;
//# sourceMappingURL=destroy-self.js.map