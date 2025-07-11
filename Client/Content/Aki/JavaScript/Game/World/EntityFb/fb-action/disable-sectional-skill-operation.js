"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableSectionalSkillOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const disable_explore_skill_js_1 = require("../fb-action/disable-explore-skill.js");
class DisableSectionalSkillOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsDisableSectionalSkillOperation(i, t) {
    return (t || new DisableSectionalSkillOperation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsDisableSectionalSkillOperation(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DisableSectionalSkillOperation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  displayMode(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  disableExploreSkill(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return (i || new disable_explore_skill_js_1.DisableExploreSkill()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  disableSkillWheel() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startDisableSectionalSkillOperation(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addDisplayMode(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addDisableExploreSkill(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static addDisableSkillWheel(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static endDisableSectionalSkillOperation(i) {
    return i.endObject();
  }
}
exports.DisableSectionalSkillOperation = DisableSectionalSkillOperation;
//# sourceMappingURL=disable-sectional-skill-operation.js.map