"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckBattleRole = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckBattleRole extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o;
    var l;
    var r;
    var a;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (o = Number(e.LimitParams.get("RoleId"))) {
      l = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId();
      if (r = Number(e.LimitParams.get("Slot"))) {
        if (r <= 0 || r > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM || isNaN(r)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的Slot参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckBattleRole}的定义`);
          }
          return false;
        } else {
          return !!(a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem) && (a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true).indexOf(a) + 1, l === o) && r === a;
        }
      } else {
        return l === o;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的RoleId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckBattleRole}的定义`);
      }
      return false;
    }
  }
}
exports.LevelConditionCheckBattleRole = LevelConditionCheckBattleRole;
//# sourceMappingURL=LevelConditionCheckBattleRole.js.map