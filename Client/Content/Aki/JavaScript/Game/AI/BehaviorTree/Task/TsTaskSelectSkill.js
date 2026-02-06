"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const AiLibrary_1 = require("../../Common/AiLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSelectSkill extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.SkillType = -1;
    this.DebugLog = false;
    this.IsInitTsVariables = false;
    this.TsSkillType = 0;
    this.TsDebugLog = false;
  }
  Constructor() {
    super.Constructor();
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
  ReceiveTickAI(s, i, t) {
    var e;
    var r;
    var a = s.AiController;
    if (a) {
      this.InitTsVariables();
      if (a.AiSkill) {
        if ((e = a.CharAiDesignComp.Entity.GetComponent(43)).Valid) {
          if ((r = a.AiHateList.GetCurrentTarget())?.Valid) {
            if (AiLibrary_1.AiLibrary.SelectSkillWithTarget(a, e, r.Entity.GetComponent(3), this.TsSkillType, this.TsDebugLog)) {
              this.FinishExecute(true);
            } else {
              this.FinishExecute(false);
            }
          } else if (AiLibrary_1.AiLibrary.SelectSkillWithoutTarget(a, e, this.TsSkillType)) {
            this.FinishExecute(true);
          } else {
            this.FinishExecute(false);
          }
        } else {
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "没有配置技能", ["AiBaseId", a.AiBase.Id]);
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
exports.default = TsTaskSelectSkill;
//# sourceMappingURL=TsTaskSelectSkill.js.map