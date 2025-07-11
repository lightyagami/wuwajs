"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckEntityDistanceCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-condition/union-target-entity.js");
class CheckEntityDistanceCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckEntityDistanceCondition(t, i) {
    return (i || new CheckEntityDistanceCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckEntityDistanceCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckEntityDistanceCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  targetAType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  targetA(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  targetBType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  targetB(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCheckEntityDistanceCondition(t) {
    t.startObject(7);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetAType(t, i) {
    t.addFieldInt8(1, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTargetA(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addTargetBType(t, i) {
    t.addFieldInt8(3, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTargetB(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addDistance(t, i) {
    t.addFieldInt32(6, i, 0);
  }
  static endCheckEntityDistanceCondition(t) {
    return t.endObject();
  }
  static createCheckEntityDistanceCondition(t, i, n, e, s, a, r, o) {
    CheckEntityDistanceCondition.startCheckEntityDistanceCondition(t);
    CheckEntityDistanceCondition.addType(t, i);
    CheckEntityDistanceCondition.addTargetAType(t, n);
    CheckEntityDistanceCondition.addTargetA(t, e);
    CheckEntityDistanceCondition.addTargetBType(t, s);
    CheckEntityDistanceCondition.addTargetB(t, a);
    CheckEntityDistanceCondition.addCompare(t, r);
    CheckEntityDistanceCondition.addDistance(t, o);
    return CheckEntityDistanceCondition.endCheckEntityDistanceCondition(t);
  }
}
exports.CheckEntityDistanceCondition = CheckEntityDistanceCondition;
//# sourceMappingURL=check-entity-distance-condition.js.map