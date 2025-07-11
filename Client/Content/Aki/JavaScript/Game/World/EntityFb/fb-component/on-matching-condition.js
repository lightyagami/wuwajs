"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnMatchingCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnMatchingCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsOnMatchingCondition(t, i) {
    return (i || new OnMatchingCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOnMatchingCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new OnMatchingCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt64(this.bb_pos + t);
    } else {
      return BigInt("0");
    }
  }
  static startOnMatchingCondition(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBulletId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static endOnMatchingCondition(t) {
    return t.endObject();
  }
  static createOnMatchingCondition(t, i, n) {
    OnMatchingCondition.startOnMatchingCondition(t);
    OnMatchingCondition.addType(t, i);
    OnMatchingCondition.addBulletId(t, n);
    return OnMatchingCondition.endOnMatchingCondition(t);
  }
}
exports.OnMatchingCondition = OnMatchingCondition;
//# sourceMappingURL=on-matching-condition.js.map