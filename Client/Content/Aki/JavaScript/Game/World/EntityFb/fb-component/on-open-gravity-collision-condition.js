"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnOpenGravityCollisionCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnOpenGravityCollisionCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsOnOpenGravityCollisionCondition(i, t) {
    return (t || new OnOpenGravityCollisionCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsOnOpenGravityCollisionCondition(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new OnOpenGravityCollisionCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  bulletId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt64(this.bb_pos + i);
    } else {
      return BigInt("0");
    }
  }
  static startOnOpenGravityCollisionCondition(i) {
    i.startObject(2);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addBulletId(i, t) {
    i.addFieldInt64(1, t, BigInt("0"));
  }
  static endOnOpenGravityCollisionCondition(i) {
    return i.endObject();
  }
  static createOnOpenGravityCollisionCondition(i, t, n) {
    OnOpenGravityCollisionCondition.startOnOpenGravityCollisionCondition(i);
    OnOpenGravityCollisionCondition.addType(i, t);
    OnOpenGravityCollisionCondition.addBulletId(i, n);
    return OnOpenGravityCollisionCondition.endOnOpenGravityCollisionCondition(i);
  }
}
exports.OnOpenGravityCollisionCondition = OnOpenGravityCollisionCondition;
//# sourceMappingURL=on-open-gravity-collision-condition.js.map