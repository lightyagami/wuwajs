"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckClientUseVisionSkill = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckClientUseVisionSkill extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l) {
    var o;
    var n;
    var i;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (o = e.LimitParams.get("PhantomSkillId")) {
      return !!(n = Global_1.Global.BaseCharacter) && !!(i = n.GetEntityNoBlueprint()?.GetComponent(44)) && !!(n = n.GetEntityNoBlueprint()?.GetComponent(41)) && !!(i = i.GetVisionData(Number(o))) && !!n.GetSkill(i.技能ID)?.Active;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckClientUseVisionSkill}的定义`);
      }
      return false;
    }
  }
}
exports.LevelConditionCheckClientUseVisionSkill = LevelConditionCheckClientUseVisionSkill;
//# sourceMappingURL=LevelConditionCheckClientUseVisionSkill.js.map