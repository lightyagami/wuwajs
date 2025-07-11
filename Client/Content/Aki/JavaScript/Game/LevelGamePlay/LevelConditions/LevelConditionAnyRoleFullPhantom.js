"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionAnyRoleFullPhantom = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionAnyRoleFullPhantom extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams) {
      return false;
    }
    e = e.LimitParams.get("CheckValue");
    if (!e) {
      return false;
    }
    var n = e === "TRUE";
    for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      if (!ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(a.GetConfigId)?.CheckHasEmpty()) {
        return n;
      }
    }
    return !n;
  }
}
exports.LevelConditionAnyRoleFullPhantom = LevelConditionAnyRoleFullPhantom;
//# sourceMappingURL=LevelConditionAnyRoleFullPhantom.js.map