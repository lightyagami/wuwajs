"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionWeaponLevelHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbSpecifyRoleWeaponLevel_1 = require("./FbSpecifyRoleWeaponLevel");
class UnionWeaponLevelHelper {
  static GetUnionWeaponLevelObject(e) {
    if (e === fb_condition_1.UnionWeaponLevel.SpecifyRoleWeaponLevel) {
      return new fb_condition_1.SpecifyRoleWeaponLevel();
    }
  }
  static ReadUnionWeaponLevel(e, o) {
    if (o !== undefined && e === fb_condition_1.UnionWeaponLevel.SpecifyRoleWeaponLevel) {
      return FbSpecifyRoleWeaponLevel_1.FbSpecifyRoleWeaponLevel.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionWeaponLevelHelper = UnionWeaponLevelHelper;
//# sourceMappingURL=UnionWeaponLevelHelper.js.map