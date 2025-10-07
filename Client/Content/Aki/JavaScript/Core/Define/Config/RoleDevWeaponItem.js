"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleDevWeaponItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get WeaponType() {
    return this.weapontype();
  }
  get WeaponItemGroup() {
    return this.weaponitemgroup();
  }
  get WeaponTypeExperience() {
    return GameUtils_1.GameUtils.ConvertToArray(this.weapontypeexperienceLength(), this.weapontypeexperience, this);
  }
  get WeaponTypeIcon() {
    return this.weapontypeicon();
  }
  get WeaponTypeDescribe() {
    return this.weapontypedescribe();
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsRoleDevWeaponItem(e, t) {
    return (t || new RoleDevWeaponItem()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  weapontype() {
    var e = this.J7.__offset(this.z7, 4);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  weaponitemgroup() {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  GetWeapontypeexperienceAt(e) {
    return this.weapontypeexperience(e);
  }
  weapontypeexperience(e) {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + t) + e * 4);
    } else {
      return 0;
    }
  }
  weapontypeexperienceLength() {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return this.J7.__vector_len(this.z7 + e);
    } else {
      return 0;
    }
  }
  weapontypeexperienceArray() {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + e), this.J7.__vector_len(this.z7 + e));
    } else {
      return null;
    }
  }
  weapontypeicon(e) {
    var t = this.J7.__offset(this.z7, 10);
    var t = t ? this.J7.__string(this.z7 + t, e) : null;
    if (typeof t == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(t);
    }
    return t;
  }
  weapontypedescribe(e) {
    var t = this.J7.__offset(this.z7, 12);
    var t = t ? this.J7.__string(this.z7 + t, e) : null;
    if (typeof t == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(t);
    }
    return t;
  }
}
exports.RoleDevWeaponItem = RoleDevWeaponItem;
//# sourceMappingURL=RoleDevWeaponItem.js.map