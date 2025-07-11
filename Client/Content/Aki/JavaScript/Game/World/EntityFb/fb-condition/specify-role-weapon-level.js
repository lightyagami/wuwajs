"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecifyRoleWeaponLevel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpecifyRoleWeaponLevel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSpecifyRoleWeaponLevel(e, t) {
    return (t || new SpecifyRoleWeaponLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSpecifyRoleWeaponLevel(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SpecifyRoleWeaponLevel()).__init(e.readInt32(e.position()) + e.position(), e);
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
  static startSpecifyRoleWeaponLevel(e) {
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
  static endSpecifyRoleWeaponLevel(e) {
    return e.endObject();
  }
  static createSpecifyRoleWeaponLevel(e, t, i, s, o) {
    SpecifyRoleWeaponLevel.startSpecifyRoleWeaponLevel(e);
    SpecifyRoleWeaponLevel.addType(e, t);
    SpecifyRoleWeaponLevel.addIndex(e, i);
    SpecifyRoleWeaponLevel.addCompare(e, s);
    SpecifyRoleWeaponLevel.addLevel(e, o);
    return SpecifyRoleWeaponLevel.endSpecifyRoleWeaponLevel(e);
  }
}
exports.SpecifyRoleWeaponLevel = SpecifyRoleWeaponLevel;
//# sourceMappingURL=specify-role-weapon-level.js.map