"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionRoleBreach = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleInstance_1 = require("../../Module/RoleUi/View/ViewData/RoleInstance");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRoleBreach extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...a) {
    if (!e.LimitParams) {
      return false;
    }
    var n = e.LimitParams.get("Breach");
    if (!n) {
      return false;
    }
    let l = 0;
    e = e.LimitParams.get("RoleId");
    if (e) {
      l = parseInt(e);
    }
    if (a.length > 0) {
      l = a[0];
    }
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(l);
    return !!e && e instanceof RoleInstance_1.RoleInstance && !!(a = e.GetLevelData()).GetBreachLevel() && a.GetBreachLevel() >= parseInt(n);
  }
}
exports.LevelConditionRoleBreach = LevelConditionRoleBreach;
//# sourceMappingURL=LevelConditionRoleBreach.js.map