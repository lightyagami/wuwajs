"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevProject = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class RoleDevProject {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RoleId() {
    return this.roleid();
  }
  get ProjectGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.projectgroupLength(), this.projectgroup, this);
  }
  get WeaponType() {
    return this.weapontype();
  }
  get RecommandWeapon() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommandweaponLength(), this.recommandweapon, this);
  }
  get SkillItemJumpType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillitemjumptypeLength(), this.skillitemjumptype, this);
  }
  get KeyProperty() {
    return this.keyproperty();
  }
  get PropertyValue() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propertyvalueLength(), this.propertyvalue, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsRoleDevProject(t, r) {
    return (r || new RoleDevProject()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetProjectgroupAt(t) {
    return this.projectgroup(t);
  }
  projectgroup(t) {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  projectgroupLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  projectgroupArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  weapontype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRecommandweaponAt(t) {
    return this.recommandweapon(t);
  }
  recommandweapon(t) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  recommandweaponLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommandweaponArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSkillitemjumptypeAt(t, r) {
    return this.skillitemjumptype(t);
  }
  skillitemjumptype(t, r) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (r || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  skillitemjumptypeLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  keyproperty() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPropertyvalueAt(t) {
    return this.propertyvalue(t);
  }
  propertyvalue(t) {
    var r = this.J7.__offset(this.z7, 16);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  propertyvalueLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  propertyvalueArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.RoleDevProject = RoleDevProject;
//# sourceMappingURL=RoleDevProject.js.map