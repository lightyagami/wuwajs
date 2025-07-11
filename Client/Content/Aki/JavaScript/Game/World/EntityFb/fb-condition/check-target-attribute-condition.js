"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckTargetAttributeCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
const union_target_attribute_js_1 = require("../fb-condition/union-target-attribute.js");
class CheckTargetAttributeCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckTargetAttributeCondition(t, i) {
    return (i || new CheckTargetAttributeCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckTargetAttributeCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckTargetAttributeCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_attribute_js_1.UnionTargetAttribute.NONE;
    }
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE;
    }
  }
  onlinePlayerConditionTargetOption(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startCheckTargetAttributeCondition(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addOptionType(t, i) {
    t.addFieldInt8(1, i, union_target_attribute_js_1.UnionTargetAttribute.NONE);
  }
  static addOption(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, i) {
    t.addFieldInt8(3, i, union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE);
  }
  static addOnlinePlayerConditionTargetOption(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endCheckTargetAttributeCondition(t) {
    return t.endObject();
  }
  static createCheckTargetAttributeCondition(t, i, e, n, r, o) {
    CheckTargetAttributeCondition.startCheckTargetAttributeCondition(t);
    CheckTargetAttributeCondition.addType(t, i);
    CheckTargetAttributeCondition.addOptionType(t, e);
    CheckTargetAttributeCondition.addOption(t, n);
    CheckTargetAttributeCondition.addOnlinePlayerConditionTargetOptionType(t, r);
    CheckTargetAttributeCondition.addOnlinePlayerConditionTargetOption(t, o);
    return CheckTargetAttributeCondition.endCheckTargetAttributeCondition(t);
  }
}
exports.CheckTargetAttributeCondition = CheckTargetAttributeCondition;
//# sourceMappingURL=check-target-attribute-condition.js.map