"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreSkillPullGiant = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class ExploreSkillPullGiant {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsExploreSkillPullGiant(t, i) {
    return (i || new ExploreSkillPullGiant()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExploreSkillPullGiant(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ExploreSkillPullGiant()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  pullTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actions(t, i) {
    var l = this.bb.__offset(this.bb_pos, 8);
    if (l) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + l) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startExploreSkillPullGiant(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPullTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createActionsVector(i, l) {
    i.startVector(4, l.length, 4);
    for (let t = l.length - 1; t >= 0; t--) {
      i.addOffset(l[t]);
    }
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endExploreSkillPullGiant(t) {
    return t.endObject();
  }
  static createExploreSkillPullGiant(t, i, l, e) {
    ExploreSkillPullGiant.startExploreSkillPullGiant(t);
    ExploreSkillPullGiant.addType(t, i);
    ExploreSkillPullGiant.addPullTime(t, l);
    ExploreSkillPullGiant.addActions(t, e);
    return ExploreSkillPullGiant.endExploreSkillPullGiant(t);
  }
}
exports.ExploreSkillPullGiant = ExploreSkillPullGiant;
//# sourceMappingURL=explore-skill-pull-giant.js.map