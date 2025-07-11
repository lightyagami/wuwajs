"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowHighlightExploreSkillIcon = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowHighlightExploreSkillIcon {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsShowHighlightExploreSkillIcon(i, t) {
    return (t || new ShowHighlightExploreSkillIcon()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsShowHighlightExploreSkillIcon(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ShowHighlightExploreSkillIcon()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  skillType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  duration() {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  isSwitchBack() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startShowHighlightExploreSkillIcon(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addSkillType(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addDuration(i, t) {
    i.addFieldFloat32(2, t, 0);
  }
  static addIsSwitchBack(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static endShowHighlightExploreSkillIcon(i) {
    return i.endObject();
  }
  static createShowHighlightExploreSkillIcon(i, t, l, h, o) {
    ShowHighlightExploreSkillIcon.startShowHighlightExploreSkillIcon(i);
    ShowHighlightExploreSkillIcon.addType(i, t);
    ShowHighlightExploreSkillIcon.addSkillType(i, l);
    ShowHighlightExploreSkillIcon.addDuration(i, h);
    ShowHighlightExploreSkillIcon.addIsSwitchBack(i, o);
    return ShowHighlightExploreSkillIcon.endShowHighlightExploreSkillIcon(i);
  }
}
exports.ShowHighlightExploreSkillIcon = ShowHighlightExploreSkillIcon;
//# sourceMappingURL=show-highlight-explore-skill-icon.js.map