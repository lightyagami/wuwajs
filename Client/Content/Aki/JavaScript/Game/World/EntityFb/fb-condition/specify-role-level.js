"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecifyRoleLevel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpecifyRoleLevel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSpecifyRoleLevel(e, t) {
    return (t || new SpecifyRoleLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSpecifyRoleLevel(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SpecifyRoleLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  index() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  level() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startSpecifyRoleLevel(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addIndex(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addLevel(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endSpecifyRoleLevel(e) {
    return e.endObject();
  }
  static createSpecifyRoleLevel(e, t, i, s, l) {
    SpecifyRoleLevel.startSpecifyRoleLevel(e);
    SpecifyRoleLevel.addType(e, t);
    SpecifyRoleLevel.addIndex(e, i);
    SpecifyRoleLevel.addCompare(e, s);
    SpecifyRoleLevel.addLevel(e, l);
    return SpecifyRoleLevel.endSpecifyRoleLevel(e);
  }
}
exports.SpecifyRoleLevel = SpecifyRoleLevel;
//# sourceMappingURL=specify-role-level.js.map