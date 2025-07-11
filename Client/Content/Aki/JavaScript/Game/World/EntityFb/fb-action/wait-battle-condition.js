"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitBattleCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_detect_battle_condition_type_js_1 = require("../fb-action/union-detect-battle-condition-type.js");
class WaitBattleCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsWaitBattleCondition(t, i) {
    return (i || new WaitBattleCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsWaitBattleCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new WaitBattleCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  stateOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_detect_battle_condition_type_js_1.UnionDetectBattleConditionType.NONE;
    }
  }
  stateOption(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startWaitBattleCondition(t) {
    t.startObject(2);
  }
  static addStateOptionType(t, i) {
    t.addFieldInt8(0, i, union_detect_battle_condition_type_js_1.UnionDetectBattleConditionType.NONE);
  }
  static addStateOption(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endWaitBattleCondition(t) {
    return t.endObject();
  }
  static createWaitBattleCondition(t, i, e) {
    WaitBattleCondition.startWaitBattleCondition(t);
    WaitBattleCondition.addStateOptionType(t, i);
    WaitBattleCondition.addStateOption(t, e);
    return WaitBattleCondition.endWaitBattleCondition(t);
  }
}
exports.WaitBattleCondition = WaitBattleCondition;
//# sourceMappingURL=wait-battle-condition.js.map