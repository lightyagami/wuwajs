"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckRoleOwned = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRoleOwned extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var a;
    return !!e.LimitParams && !!(a = e.LimitParams.get("Owned")) && !!(e = e.LimitParams.get("RoleId")) && (e = parseInt(e), a = parseInt(a) === 1, ModelManager_1.ModelManager.RoleModel.IsRoleOwned(e) === a);
  }
}
exports.LevelConditionCheckRoleOwned = LevelConditionCheckRoleOwned;
//# sourceMappingURL=LevelConditionCheckRoleOwned.js.map