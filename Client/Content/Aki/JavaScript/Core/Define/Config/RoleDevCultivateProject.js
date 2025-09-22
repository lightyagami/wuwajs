"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevCultivateProject = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleDevCultivateProject {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ProjectProjectId() {
    return this.projectprojectid();
  }
  get RoleBreachLevel() {
    return this.rolebreachlevel();
  }
  get RoleLevel() {
    return this.rolelevel();
  }
  get WeaponBreachLevel() {
    return this.weaponbreachlevel();
  }
  get WeaponLevel() {
    return this.weaponlevel();
  }
  get NormalSkillLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.normalskilllevelLength(), this.normalskilllevel, this);
  }
  get PrefectSkillLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.prefectskilllevelLength(), this.prefectskilllevel, this);
  }
  get SkillTreeConfigArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilltreeconfigarrayLength(), this.skilltreeconfigarray, this);
  }
  get SkillOuterAttributeConfigArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillouterattributeconfigarrayLength(), this.skillouterattributeconfigarray, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleDevCultivateProject(t, e) {
    return (e || new RoleDevCultivateProject()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  projectprojectid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolebreachlevel() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolelevel() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponbreachlevel() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponlevel() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNormalskilllevelAt(t) {
    return this.normalskilllevel(t);
  }
  normalskilllevel(t) {
    var e = this.J7.__offset(this.z7, 14);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  normalskilllevelLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  normalskilllevelArray() {
    var t = this.J7.__offset(this.z7, 14);
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
    var e = this.J7.__offset(this.z7, 16);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  prefectskilllevelLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  prefectskilllevelArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSkilltreeconfigarrayAt(t) {
    return this.skilltreeconfigarray(t);
  }
  skilltreeconfigarray(t) {
    var e = this.J7.__offset(this.z7, 18);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  skilltreeconfigarrayLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilltreeconfigarrayArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSkillouterattributeconfigarrayAt(t) {
    return this.skillouterattributeconfigarray(t);
  }
  skillouterattributeconfigarray(t) {
    var e = this.J7.__offset(this.z7, 20);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  skillouterattributeconfigarrayLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillouterattributeconfigarrayArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.RoleDevCultivateProject = RoleDevCultivateProject;
//# sourceMappingURL=RoleDevCultivateProject.js.map