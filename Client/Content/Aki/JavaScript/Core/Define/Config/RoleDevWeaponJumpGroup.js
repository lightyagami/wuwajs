"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponJumpGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleDevWeaponJumpGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get WeaponId() {
    return this.weaponid();
  }
  get JumpType() {
    return this.jumptype();
  }
  get JumpPath() {
    return this.jumppath();
  }
  get PathDescribe() {
    return this.pathdescribe();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleDevWeaponJumpGroup(t, e) {
    return (e || new RoleDevWeaponJumpGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  weaponid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumptype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumppath() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pathdescribe(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.RoleDevWeaponJumpGroup = RoleDevWeaponJumpGroup;
//# sourceMappingURL=RoleDevWeaponJumpGroup.js.map