"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const AiLibrary_1 = require("../../Common/AiLibrary");
class TsDecoratorSelectSkill extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.SkillType = -1;
    this.DebugLog = false;
    this.IsInitTsVariables = false;
    this.TsSkillType = 0;
    this.TsDebugLog = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsSkillType = 0;
    this.TsDebugLog = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsSkillType = this.SkillType;
      this.TsDebugLog = this.DebugLog;
    }
  }
  PerformConditionCheckAI(r, i) {
    var t;
    var e;
    var s = r.AiController;
    if (s) {
      this.InitTsVariables();
      if (s.AiSkill) {
        return !!(t = s.CharAiDesignComp.Entity.GetComponent(40)).Valid && ((e = s.AiHateList.GetCurrentTarget())?.Valid ? AiLibrary_1.AiLibrary.SelectSkillWithTarget(s, t, e.Entity.GetComponent(3), this.TsSkillType, this.TsDebugLog) : AiLibrary_1.AiLibrary.SelectSkillWithoutTarget(s, t, this.TsSkillType));
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "没有配置技能", ["AiBaseId", s.AiBase.Id]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", r.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorSelectSkill;
//# sourceMappingURL=TsDecoratorSelectSkill.js.map