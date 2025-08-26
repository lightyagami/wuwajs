"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFightEnergyBall = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFightEnergyBall extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n;
    var r;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if ((n = Number(e.LimitParams.get("能量球状态"))) < 0 || n > 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的能量球状态只能是0，1`);
      }
      return false;
    } else {
      r = (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Entity?.GetComponent(92)?.RoleElementEnergy;
      e = e?.Entity?.GetComponent(92)?.RoleElementEnergyMax;
      return r === 0 && n === 0 || r > 0 && r < e && n === 2 || e <= r && n === 1;
    }
  }
}
exports.LevelConditionCheckFightEnergyBall = LevelConditionCheckFightEnergyBall;
//# sourceMappingURL=LevelConditionCheckFightEnergyBall.js.map