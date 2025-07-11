"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchPermission = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SwitchPermission {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSwitchPermission(t, i) {
    return (i || new SwitchPermission()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSwitchPermission(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SwitchPermission()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  isAllowClientSwitch() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  levels(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, i);
    } else {
      return undefined;
    }
  }
  levelsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSwitchPermission(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addIsAllowClientSwitch(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addLevels(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createLevelsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startLevelsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endSwitchPermission(t) {
    return t.endObject();
  }
  static createSwitchPermission(t, i, s, e) {
    SwitchPermission.startSwitchPermission(t);
    SwitchPermission.addType(t, i);
    SwitchPermission.addIsAllowClientSwitch(t, s);
    SwitchPermission.addLevels(t, e);
    return SwitchPermission.endSwitchPermission(t);
  }
}
exports.SwitchPermission = SwitchPermission;
//# sourceMappingURL=switch-permission.js.map