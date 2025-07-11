"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTrainingDegree = undefined;
class RoleTrainingDegree {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get DifficultyLevel() {
    return this.difficultylevel();
  }
  get RoleLevel() {
    return this.rolelevel();
  }
  get WeaponLevel() {
    return this.weaponlevel();
  }
  get EquipLevel() {
    return this.equiplevel();
  }
  get SkillLevel() {
    return this.skilllevel();
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsRoleTrainingDegree(e, t) {
    return (t || new RoleTrainingDegree()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  difficultylevel() {
    var e = this.J7.__offset(this.z7, 4);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  rolelevel() {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  weaponlevel() {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  equiplevel() {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  skilllevel() {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
}
exports.RoleTrainingDegree = RoleTrainingDegree;
//# sourceMappingURL=RoleTrainingDegree.js.map