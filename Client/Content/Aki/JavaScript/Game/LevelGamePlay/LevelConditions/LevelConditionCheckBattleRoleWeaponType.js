"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckBattleRoleWeaponType = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckBattleRoleWeaponType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else {
      return !!(e = e.LimitParams.get("WeaponType")) && (e = parseInt(e), !!(n = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId())) && ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n).WeaponType === e;
    }
  }
}
exports.LevelConditionCheckBattleRoleWeaponType = LevelConditionCheckBattleRoleWeaponType;
//# sourceMappingURL=LevelConditionCheckBattleRoleWeaponType.js.map