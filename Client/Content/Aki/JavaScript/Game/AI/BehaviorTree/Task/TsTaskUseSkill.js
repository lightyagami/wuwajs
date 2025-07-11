"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskUseSkill extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.WaitingSkill = false;
  }
  Constructor() {
    super.Constructor();
    this.WaitingSkill = false;
  }
  ReceiveExecuteAI(e, r) {
    this.WaitingSkill = false;
  }
  ReceiveTickAI(e, r, o) {
    const s = e.AiController;
    if (s) {
      const t = s.CharAiDesignComp.Entity.Id;
      var l = s.CharAiDesignComp.Entity.GetComponent(40);
      if (l.Valid) {
        let e = ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(t, "SkillId");
        e = e || "0";
        if (!this.WaitingSkill) {
          this.WaitingSkill = true;
          l.BeginSkillAsync(Number(e), {
            Target: s.AiHateList.GetCurrentTarget()?.Entity,
            Reason: "TsTaskUseSkill.ReceiveTickAI"
          }).then(e => {
            this.FinishExecute(e);
            if (e && s.AiSkill) {
              s.AiSkill.SetSkillCdFromNow(ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(t, "SkillInfoId"));
            }
            ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(t, "SkillId");
            ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(t, "SkillInfoId");
          });
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskUseSkill;
//# sourceMappingURL=TsTaskUseSkill.js.map