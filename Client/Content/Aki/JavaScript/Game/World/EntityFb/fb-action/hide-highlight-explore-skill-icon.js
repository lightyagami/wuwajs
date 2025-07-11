"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideHighlightExploreSkillIcon = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideHighlightExploreSkillIcon {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsHideHighlightExploreSkillIcon(i, t) {
    return (t || new HideHighlightExploreSkillIcon()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsHideHighlightExploreSkillIcon(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new HideHighlightExploreSkillIcon()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startHideHighlightExploreSkillIcon(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endHideHighlightExploreSkillIcon(i) {
    return i.endObject();
  }
  static createHideHighlightExploreSkillIcon(i, t) {
    HideHighlightExploreSkillIcon.startHideHighlightExploreSkillIcon(i);
    HideHighlightExploreSkillIcon.addType(i, t);
    return HideHighlightExploreSkillIcon.endHideHighlightExploreSkillIcon(i);
  }
}
exports.HideHighlightExploreSkillIcon = HideHighlightExploreSkillIcon;
//# sourceMappingURL=hide-highlight-explore-skill-icon.js.map