"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevCulProjectConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleDevCulProjectConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleLvUp() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rolelvupLength(), this.rolelvup, this);
  }
  get WeaponLvUp() {
    return GameUtils_1.GameUtils.ConvertToArray(this.weaponlvupLength(), this.weaponlvup, this);
  }
  get SkillLvUp() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilllvupLength(), this.skilllvup, this);
  }
  get UnknownItemId() {
    return this.unknownitemid();
  }
  get UnknownItemIcon() {
    return this.unknownitemicon();
  }
  get OverflowExperience() {
    return this.overflowexperience();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoleDevCulProjectConfig(t, i) {
    return (i || new RoleDevCulProjectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRolelvupAt(t) {
    return this.rolelvup(t);
  }
  rolelvup(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rolelvupLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolelvupArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetWeaponlvupAt(t) {
    return this.weaponlvup(t);
  }
  weaponlvup(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  weaponlvupLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponlvupArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSkilllvupAt(t) {
    return this.skilllvup(t);
  }
  skilllvup(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skilllvupLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilllvupArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  unknownitemid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unknownitemicon(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  overflowexperience() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoleDevCulProjectConfig = RoleDevCulProjectConfig;
//# sourceMappingURL=RoleDevCulProjectConfig.js.map