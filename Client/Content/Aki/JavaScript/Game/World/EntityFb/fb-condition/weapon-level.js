"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponLevel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_weapon_level_js_1 = require("../fb-condition/union-weapon-level.js");
class WeaponLevel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsWeaponLevel(e, t) {
    return (t || new WeaponLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsWeaponLevel(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new WeaponLevel()).__init(e.readInt32(e.position()) + e.position(), e);
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
      return union_weapon_level_js_1.UnionWeaponLevel.NONE;
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
  static startWeaponLevel(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addOptionType(e, t) {
    e.addFieldInt8(1, t, union_weapon_level_js_1.UnionWeaponLevel.NONE);
  }
  static addOption(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endWeaponLevel(e) {
    return e.endObject();
  }
  static createWeaponLevel(e, t, i, n) {
    WeaponLevel.startWeaponLevel(e);
    WeaponLevel.addType(e, t);
    WeaponLevel.addOptionType(e, i);
    WeaponLevel.addOption(e, n);
    return WeaponLevel.endWeaponLevel(e);
  }
}
exports.WeaponLevel = WeaponLevel;
//# sourceMappingURL=weapon-level.js.map