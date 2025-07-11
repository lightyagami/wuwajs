"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLevel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_role_level_js_1 = require("../fb-condition/union-role-level.js");
class RoleLevel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRoleLevel(e, t) {
    return (t || new RoleLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRoleLevel(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RoleLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  optionType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_role_level_js_1.UnionRoleLevel.NONE;
    }
  }
  option(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startRoleLevel(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addOptionType(e, t) {
    e.addFieldInt8(1, t, union_role_level_js_1.UnionRoleLevel.NONE);
  }
  static addOption(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endRoleLevel(e) {
    return e.endObject();
  }
  static createRoleLevel(e, t, i, l) {
    RoleLevel.startRoleLevel(e);
    RoleLevel.addType(e, t);
    RoleLevel.addOptionType(e, i);
    RoleLevel.addOption(e, l);
    return RoleLevel.endRoleLevel(e);
  }
}
exports.RoleLevel = RoleLevel;
//# sourceMappingURL=role-level.js.map