"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckPlayerSkillReadyCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_skill_ready_option_js_1 = require("../fb-condition/union-skill-ready-option.js");
class CheckPlayerSkillReadyCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCheckPlayerSkillReadyCondition(i, t) {
    return (t || new CheckPlayerSkillReadyCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCheckPlayerSkillReadyCondition(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckPlayerSkillReadyCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  skillOptionType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_skill_ready_option_js_1.UnionSkillReadyOption.NONE;
    }
  }
  skillOption(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(i, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startCheckPlayerSkillReadyCondition(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addSkillOptionType(i, t) {
    i.addFieldInt8(1, t, union_skill_ready_option_js_1.UnionSkillReadyOption.NONE);
  }
  static addSkillOption(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCheckPlayerSkillReadyCondition(i) {
    return i.endObject();
  }
  static createCheckPlayerSkillReadyCondition(i, t, e, l) {
    CheckPlayerSkillReadyCondition.startCheckPlayerSkillReadyCondition(i);
    CheckPlayerSkillReadyCondition.addType(i, t);
    CheckPlayerSkillReadyCondition.addSkillOptionType(i, e);
    CheckPlayerSkillReadyCondition.addSkillOption(i, l);
    return CheckPlayerSkillReadyCondition.endCheckPlayerSkillReadyCondition(i);
  }
}
exports.CheckPlayerSkillReadyCondition = CheckPlayerSkillReadyCondition;
//# sourceMappingURL=check-player-skill-ready-condition.js.map