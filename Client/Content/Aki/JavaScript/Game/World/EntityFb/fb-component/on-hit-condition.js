"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnHitCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnHitCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsOnHitCondition(t, i) {
    return (i || new OnHitCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOnHitCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new OnHitCondition()).__init(t.readInt32(t.position()) + t.position(), t);
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
  static startOnHitCondition(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBulletId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static endOnHitCondition(t) {
    return t.endObject();
  }
  static createOnHitCondition(t, i, n) {
    OnHitCondition.startOnHitCondition(t);
    OnHitCondition.addType(t, i);
    OnHitCondition.addBulletId(t, n);
    return OnHitCondition.endOnHitCondition(t);
  }
}
exports.OnHitCondition = OnHitCondition;
//# sourceMappingURL=on-hit-condition.js.map