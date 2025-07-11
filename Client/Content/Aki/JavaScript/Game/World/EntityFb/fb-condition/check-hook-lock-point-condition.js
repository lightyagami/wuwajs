"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckHookLockPointCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckHookLockPointCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsCheckHookLockPointCondition(t, o) {
    return (o || new CheckHookLockPointCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckHookLockPointCondition(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new CheckHookLockPointCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  entityIds(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + o) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startCheckHookLockPointCondition(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addEntityIds(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createEntityIdsVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      o.addInt32(i[t]);
    }
    return o.endVector();
  }
  static startEntityIdsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endCheckHookLockPointCondition(t) {
    return t.endObject();
  }
  static createCheckHookLockPointCondition(t, o, i) {
    CheckHookLockPointCondition.startCheckHookLockPointCondition(t);
    CheckHookLockPointCondition.addType(t, o);
    CheckHookLockPointCondition.addEntityIds(t, i);
    return CheckHookLockPointCondition.endCheckHookLockPointCondition(t);
  }
}
exports.CheckHookLockPointCondition = CheckHookLockPointCondition;
//# sourceMappingURL=check-hook-lock-point-condition.js.map