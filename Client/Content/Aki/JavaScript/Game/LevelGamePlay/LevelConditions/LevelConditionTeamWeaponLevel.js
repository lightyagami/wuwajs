"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionTeamWeaponLevel = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTeamWeaponLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r;
    var l;
    return !!e.LimitParams && !!(r = e.LimitParams.get("Level")) && !!(l = Number(e.LimitParams.get("Position")), (l = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)[l - 1])?.IsMyRole()) && !!(l = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(l.GetConfigId)) && (e = e.LimitParams.get("Op"), this.CheckCompareValue(e, l.GetLevel(), Number(r)));
  }
}
exports.LevelConditionTeamWeaponLevel = LevelConditionTeamWeaponLevel;
//# sourceMappingURL=LevelConditionTeamWeaponLevel.js.map