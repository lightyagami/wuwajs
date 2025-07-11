"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckExploreSkill = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckExploreSkill extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var r;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (r = Number(e.LimitParams.get("探索技能Id"))) {
      return r === ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的探索技能Id应该是数字`);
      }
      return false;
    }
  }
}
exports.LevelConditionCheckExploreSkill = LevelConditionCheckExploreSkill;
//# sourceMappingURL=LevelConditionCheckExploreSkill.js.map