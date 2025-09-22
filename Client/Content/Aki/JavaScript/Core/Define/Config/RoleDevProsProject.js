"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevProsProject = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleDevProsProject {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ElementId() {
    return this.elementid();
  }
  get RoleName() {
    return this.rolename();
  }
  get RoleExperience() {
    return this.roleexperience();
  }
  get RoleGoalLevel() {
    return this.rolegoallevel();
  }
  get WeaponGoalLevel() {
    return this.weapongoallevel();
  }
  get WeaponExperience() {
    return this.weaponexperience();
  }
  get RoleItemGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.roleitemgroupLength(), this.roleitemgroup, this);
  }
  get WeaponBreachItemGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.weaponbreachitemgroupLength(), this.weaponbreachitemgroup, this);
  }
  get WeaponType() {
    return this.weapontype();
  }
  get SkillItemGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillitemgroupLength(), this.skillitemgroup, this);
  }
  get PrefectSkillLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.prefectskilllevelLength(), this.prefectskilllevel, this);
  }
  get RoleHeadIcon() {
    return this.roleheadicon();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleDevProsProject(t, e) {
    return (e || new RoleDevProsProject()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolename(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  roleexperience() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolegoallevel() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weapongoallevel() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponexperience() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRoleitemgroupAt(t) {
    return this.roleitemgroup(t);
  }
  roleitemgroup(t) {
    var e = this.J7.__offset(this.z7, 18);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  roleitemgroupLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleitemgroupArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetWeaponbreachitemgroupAt(t) {
    return this.weaponbreachitemgroup(t);
  }
  weaponbreachitemgroup(t) {
    var e = this.J7.__offset(this.z7, 20);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  weaponbreachitemgroupLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponbreachitemgroupArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  weapontype() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillitemgroupAt(t) {
    return this.skillitemgroup(t);
  }
  skillitemgroup(t) {
    var e = this.J7.__offset(this.z7, 24);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  skillitemgroupLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillitemgroupArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPrefectskilllevelAt(t) {
    return this.prefectskilllevel(t);
  }
  prefectskilllevel(t) {
    var e = this.J7.__offset(this.z7, 26);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  prefectskilllevelLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  prefectskilllevelArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  roleheadicon(t) {
    var e = this.J7.__offset(this.z7, 28);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.RoleDevProsProject = RoleDevProsProject;
//# sourceMappingURL=RoleDevProsProject.js.map