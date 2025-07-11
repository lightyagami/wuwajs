"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowHidedGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowHidedGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsShowHidedGroup(t, e) {
    return (e || new ShowHidedGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsShowHidedGroup(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ShowHidedGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  groupKey(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  delayShow() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startShowHidedGroup(t) {
    t.startObject(2);
  }
  static addGroupKey(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDelayShow(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endShowHidedGroup(t) {
    return t.endObject();
  }
  static createShowHidedGroup(t, e, r) {
    ShowHidedGroup.startShowHidedGroup(t);
    ShowHidedGroup.addGroupKey(t, e);
    ShowHidedGroup.addDelayShow(t, r);
    return ShowHidedGroup.endShowHidedGroup(t);
  }
}
exports.ShowHidedGroup = ShowHidedGroup;
//# sourceMappingURL=show-hided-group.js.map