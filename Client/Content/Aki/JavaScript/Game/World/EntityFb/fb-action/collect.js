"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Collect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCollect(t, e) {
    return (e || new Collect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCollect(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new Collect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  targetEntity() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCollect(t) {
    t.startObject(1);
  }
  static addTargetEntity(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endCollect(t) {
    return t.endObject();
  }
  static createCollect(t, e) {
    Collect.startCollect(t);
    Collect.addTargetEntity(t, e);
    return Collect.endCollect(t);
  }
}
exports.Collect = Collect;
//# sourceMappingURL=collect.js.map