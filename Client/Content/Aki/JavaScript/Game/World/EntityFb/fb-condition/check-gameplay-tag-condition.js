"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckGameplayTagCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-condition/union-target-entity.js");
class CheckGameplayTagCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsCheckGameplayTagCondition(t, a) {
    return (a || new CheckGameplayTagCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckGameplayTagCondition(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new CheckGameplayTagCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  target(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  gameplayTag(t) {
    var a = this.bb.__offset(this.bb_pos, 10);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  compare(t) {
    var a = this.bb.__offset(this.bb_pos, 12);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startCheckGameplayTagCondition(t) {
    t.startObject(5);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addTargetType(t, a) {
    t.addFieldInt8(1, a, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addGameplayTag(t, a) {
    t.addFieldOffset(3, a, 0);
  }
  static addCompare(t, a) {
    t.addFieldOffset(4, a, 0);
  }
  static endCheckGameplayTagCondition(t) {
    return t.endObject();
  }
  static createCheckGameplayTagCondition(t, a, i, e, n, o) {
    CheckGameplayTagCondition.startCheckGameplayTagCondition(t);
    CheckGameplayTagCondition.addType(t, a);
    CheckGameplayTagCondition.addTargetType(t, i);
    CheckGameplayTagCondition.addTarget(t, e);
    CheckGameplayTagCondition.addGameplayTag(t, n);
    CheckGameplayTagCondition.addCompare(t, o);
    return CheckGameplayTagCondition.endCheckGameplayTagCondition(t);
  }
}
exports.CheckGameplayTagCondition = CheckGameplayTagCondition;
//# sourceMappingURL=check-gameplay-tag-condition.js.map