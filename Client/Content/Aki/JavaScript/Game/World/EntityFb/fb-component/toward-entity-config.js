"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowardEntityConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TowardEntityConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTowardEntityConfig(t, i) {
    return (i || new TowardEntityConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTowardEntityConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TowardEntityConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  referenceActorKey(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  targetEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTowardEntityConfig(t) {
    t.startObject(2);
  }
  static addReferenceActorKey(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endTowardEntityConfig(t) {
    return t.endObject();
  }
  static createTowardEntityConfig(t, i, r) {
    TowardEntityConfig.startTowardEntityConfig(t);
    TowardEntityConfig.addReferenceActorKey(t, i);
    TowardEntityConfig.addTargetEntityId(t, r);
    return TowardEntityConfig.endTowardEntityConfig(t);
  }
}
exports.TowardEntityConfig = TowardEntityConfig;
//# sourceMappingURL=toward-entity-config.js.map