"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckBattleRoleIsNot = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckBattleRoleIsNot extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (n = parseInt(e.LimitParams.get("RoleId"))) {
      return ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId() !== n;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的RoleId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckBattleRole}的定义`);
      }
      return false;
    }
  }
}
exports.LevelConditionCheckBattleRoleIsNot = LevelConditionCheckBattleRoleIsNot;
//# sourceMappingURL=LevelConditionCheckBattleRoleIsNot.js.map