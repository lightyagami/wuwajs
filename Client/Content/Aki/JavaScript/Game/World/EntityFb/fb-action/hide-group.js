"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_hide_group_config_js_1 = require("../fb-action/union-hide-group-config.js");
class HideGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsHideGroup(i, t) {
    return (t || new HideGroup()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsHideGroup(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new HideGroup()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  groupKey(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  hideConfigType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_hide_group_config_js_1.UnionHideGroupConfig.NONE;
    }
  }
  hideConfig(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(i, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  isHidePasserByNpc() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startHideGroup(i) {
    i.startObject(4);
  }
  static addGroupKey(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addHideConfigType(i, t) {
    i.addFieldInt8(1, t, union_hide_group_config_js_1.UnionHideGroupConfig.NONE);
  }
  static addHideConfig(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static addIsHidePasserByNpc(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static endHideGroup(i) {
    return i.endObject();
  }
  static createHideGroup(i, t, e, r, s) {
    HideGroup.startHideGroup(i);
    HideGroup.addGroupKey(i, t);
    HideGroup.addHideConfigType(i, e);
    HideGroup.addHideConfig(i, r);
    HideGroup.addIsHidePasserByNpc(i, s);
    return HideGroup.endHideGroup(i);
  }
}
exports.HideGroup = HideGroup;
//# sourceMappingURL=hide-group.js.map