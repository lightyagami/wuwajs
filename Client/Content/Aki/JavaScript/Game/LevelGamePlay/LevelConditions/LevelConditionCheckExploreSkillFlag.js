"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckExploreSkillFlag = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckExploreSkillFlag extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l) {
    var o;
    var r;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 95, "LevelConditionCheckExploreSkillFlag配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (o = Number(e.LimitParams.get("SkillId"))) {
      r = Number(e.LimitParams.get("Value")) !== 0;
      return ModelManager_1.ModelManager.ExploreSkillFlagModel.GetExploreSkillFlagEnable(o) === r;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 95, `配置错误！条件${e.Id}的SkillId应该是数字`);
      }
      return false;
    }
  }
}
exports.LevelConditionCheckExploreSkillFlag = LevelConditionCheckExploreSkillFlag;
//# sourceMappingURL=LevelConditionCheckExploreSkillFlag.js.map