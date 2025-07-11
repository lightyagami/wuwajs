"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeSkillWeight extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.SkillInfoId = 0;
    this.Weight = 0;
    this.IsInitTsVariables = false;
    this.TsSkillInfoId = 0;
    this.TsWeight = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsSkillInfoId = 0;
    this.TsWeight = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsSkillInfoId = this.SkillInfoId;
      this.TsWeight = this.Weight;
    }
  }
  ReceiveTickAI(s, e, t) {
    this.InitTsVariables();
    var i = s.AiController;
    if (i) {
      if (i.AiSkill) {
        i.AiSkill.ChangeSkillWeight(this.TsSkillInfoId, this.TsWeight);
        this.FinishExecute(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "没有技能信息", ["AiBaseId", i.AiBase.Id]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", s.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskChangeSkillWeight;
//# sourceMappingURL=TsTaskChangeSkillWeight.js.map