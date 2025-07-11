"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicAttachTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DynamicAttachTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsDynamicAttachTarget(t, a) {
    return (a || new DynamicAttachTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDynamicAttachTarget(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new DynamicAttachTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startDynamicAttachTarget(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endDynamicAttachTarget(t) {
    return t.endObject();
  }
  static createDynamicAttachTarget(t, a) {
    DynamicAttachTarget.startDynamicAttachTarget(t);
    DynamicAttachTarget.addType(t, a);
    return DynamicAttachTarget.endDynamicAttachTarget(t);
  }
}
exports.DynamicAttachTarget = DynamicAttachTarget;
//# sourceMappingURL=dynamic-attach-target.js.map