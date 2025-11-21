"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const PlayMontageUtils_1 = require("../../../NewWorld/Character/Npc/Logics/PlayMontageUtils");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPlayWalkingOverlayMontage extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MontageId = 0;
    this.LoopDuration = 0;
    this.RepeatTimes = 0;
    this.IsInitTsVariables = false;
    this.TsMontageId = 0;
    this.TsLoopDuration = 0;
    this.TsRepeatTimes = 0;
    this.AnimComp = undefined;
    this.PlayingMontageId = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMontageId = 0;
    this.TsLoopDuration = 0;
    this.TsRepeatTimes = 0;
    this.AnimComp = undefined;
    this.PlayingMontageId = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMontageId = this.MontageId;
      this.TsLoopDuration = this.LoopDuration;
      this.TsRepeatTimes = this.RepeatTimes;
    }
  }
  ReceiveExecuteAI(t, s) {
    this.InitTsVariables();
    var i = t.AiController;
    if (i) {
      this.AnimComp = i.CharActorComp.Entity?.GetComponent(181);
      if (this.AnimComp) {
        i = new PlayMontageUtils_1.PlayMontageConfig(this.TsRepeatTimes, this.TsLoopDuration);
        if (this.PlayingMontageId) {
          PlayMontageUtils_1.PlayMontageUtils.ClearAndEndMontage(this.PlayingMontageId);
        }
        this.PlayingMontageId = PlayMontageUtils_1.PlayMontageUtils.LoadAndPlayMontageByOverlapId(this.AnimComp, this.TsMontageId, i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
    }
    this.FinishExecute(true);
  }
}
exports.default = TsTaskPlayWalkingOverlayMontage;
//# sourceMappingURL=TsTaskPlayWalkingOverlayMontage.js.map