"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskUseSkillDesignated extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.BlackboardKeyTarget = "";
    this.SkillInfoId = 0;
    this.DebugLog = false;
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyTarget = "";
    this.TsSkillInfoId = 0;
    this.TsDebugLog = false;
    this.WaitingSkill = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyTarget = "";
    this.TsSkillInfoId = 0;
    this.TsDebugLog = false;
    this.WaitingSkill = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKeyTarget = this.BlackboardKeyTarget;
      this.TsSkillInfoId = this.SkillInfoId;
      this.TsDebugLog = this.DebugLog;
    }
  }
  ReceiveExecuteAI(e, s) {
    this.WaitingSkill = false;
  }
  ReceiveTickAI(e, s, i) {
    const t = e.AiController;
    if (t) {
      if (t.AiSkill) {
        this.InitTsVariables();
        if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BehaviorTree", 6, "UseSkillDesignated", ["controller", e?.GetName()]);
        }
        var o = t.AiSkill.SkillInfos.get(this.TsSkillInfoId);
        if (o) {
          let e = t.AiHateList.GetCurrentTarget();
          if (this.TsBlackboardKeyTarget && (r = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(t.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyTarget), r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r))) {
            e = r;
          }
          var r = t.CharAiDesignComp.Entity.GetComponent(41);
          if (r.Valid) {
            if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("BehaviorTree", 6, "UseSkillDesignated TrySkill", ["skill", o.SkillId]);
            }
            if (!this.WaitingSkill) {
              this.WaitingSkill = true;
              r.BeginSkillAsync(Number(o.SkillId), {
                Target: e?.Entity,
                Reason: "TsTaskUseSkillDesignated.ReceiveTickAI"
              }).then(e => {
                this.FinishExecute(e);
                if (e && t.AiSkill) {
                  t.AiSkill.SetSkillCdFromNow(this.TsSkillInfoId);
                }
              });
            }
          } else {
            if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("BehaviorTree", 6, "UseSkillDesignated No SkillComponent");
            }
            this.FinishExecute(false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 6, "当前AI没有对应的技能ID", ["AiBaseId", t.AiBase.Id], ["SkillInfoId", this.TsSkillInfoId]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "没有技能信息", ["AiBaseId", t.AiBase.Id]);
        }
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
exports.default = TsTaskUseSkillDesignated;
//# sourceMappingURL=TsTaskUseSkillDesignated.js.map