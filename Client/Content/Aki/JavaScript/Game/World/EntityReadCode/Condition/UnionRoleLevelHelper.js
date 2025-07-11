"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionRoleLevelHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbSpecifyRoleLevel_1 = require("./FbSpecifyRoleLevel");
class UnionRoleLevelHelper {
  static GetUnionRoleLevelObject(e) {
    if (e === fb_condition_1.UnionRoleLevel.SpecifyRoleLevel) {
      return new fb_condition_1.SpecifyRoleLevel();
    }
  }
  static ReadUnionRoleLevel(e, o) {
    if (o !== undefined && e === fb_condition_1.UnionRoleLevel.SpecifyRoleLevel) {
      return FbSpecifyRoleLevel_1.FbSpecifyRoleLevel.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionRoleLevelHelper = UnionRoleLevelHelper;
//# sourceMappingURL=UnionRoleLevelHelper.js.map