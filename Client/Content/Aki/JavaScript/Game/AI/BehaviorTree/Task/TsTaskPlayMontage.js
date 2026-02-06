"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ServerGmController_1 = require("../../../World/Controller/ServerGmController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPlayMontage extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Montage = undefined;
    this.MontagePath = "";
    this.ExpressionId = 0;
    this.LoopDuration = 0;
    this.RepeatTimes = 0;
    this.KeepMontageWhenEnd = false;
    this.InitStateName = "";
    this.EndStateName = "";
    this.MaskInteract = false;
    this.IsInitTsVariables = false;
    this.TsMontage = "";
    this.TsMaskInteract = false;
    this.TsLoopDuration = 0;
    this.TsRepeatTimes = 0;
    this.TsExpressionId = 0;
    this.TsKeepMontageWhenEnd = false;
    this.TsInitStateName = "";
    this.TsEndStateName = "";
    this.InteractComponent = undefined;
    this.PlayingMontageId = -1;
    this.Entity = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMontage = "";
    this.TsMaskInteract = false;
    this.TsLoopDuration = 0;
    this.TsRepeatTimes = 0;
    this.TsExpressionId = 0;
    this.TsKeepMontageWhenEnd = false;
    this.TsInitStateName = "";
    this.TsEndStateName = "";
    this.InteractComponent = undefined;
    this.PlayingMontageId = -1;
    this.Entity = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMontage = this.Montage.ToAssetPathName();
      if (this.TsMontage === "") {
        this.TsMontage = this.MontagePath;
      }
      this.TsMaskInteract = this.MaskInteract;
      this.TsLoopDuration = this.LoopDuration;
      this.TsRepeatTimes = this.RepeatTimes;
      this.TsExpressionId = this.ExpressionId;
      this.TsKeepMontageWhenEnd = this.KeepMontageWhenEnd;
      this.TsInitStateName = this.InitStateName;
      this.TsEndStateName = this.EndStateName;
    }
  }
  ReceiveExecuteAI(t, s) {
    this.InitTsVariables();
    var i = t.AiController;
    if (i) {
      this.Entity = i.CharActorComp.Entity;
      if (ServerGmController_1.ServerGmController.AnimalDebug && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "AnimalDebug PlayMontage", ["Tree", this.TreeAsset?.GetName()], ["TsMontage", this.TsMontage]);
      }
      if (this.TsMontage === "") {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 29, "播放蒙太奇未配置", ["ConfigID", this.Entity?.GetComponent(0)?.GetPbDataId()], ["BehaviorTree", this.TreeAsset.GetName()]);
        }
        this.FinishExecute(true);
      } else {
        this.InteractComponent = this.Entity.GetComponent(209);
        if (this.TsMaskInteract && this.InteractComponent) {
          this.InteractComponent.SetInteractionState(false, "TsTaskPlayMontage ReceiveExecuteAI");
        }
        this.PlayMontageByPerformComp();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(true);
    }
  }
  OnAbort() {
    if (this.TsMaskInteract && this.InteractComponent) {
      this.InteractComponent.SetInteractionState(true, "TsTaskPlayMontage OnClear");
    }
    this.InteractComponent = undefined;
    this.Entity?.GetComponent(49)?.VolatileMontageStopByLoad(3, this.PlayingMontageId, this.TsKeepMontageWhenEnd ? 1 : 0);
    this.PlayingMontageId = -1;
  }
  PlayMontageByPerformComp() {
    var t = ServerGmController_1.ServerGmController.AnimalDebug;
    var s = this.Entity.GetComponent(49);
    var i = {
      InitStateName: this.TsInitStateName,
      EndStateName: this.TsEndStateName
    };
    this.PlayingMontageId = s.VolatileMontagePlayByLoad(3, this.TsMontage, i, t => {
      this.Entity?.GetComponent(199)?.ExpressionController?.ChangeFaceForExpression(t, this.TsExpressionId);
    }, () => {
      if (ServerGmController_1.ServerGmController.AnimalDebug && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "AnimalDebug PlayMontage3");
      }
      this.FinishExecute(true);
    }, this.TsLoopDuration, this.TsRepeatTimes);
    if (t && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 6, "AnimalDebug PlayMontage2", ["PlayingMontageId", this.PlayingMontageId]);
    }
    if (this.PlayingMontageId < 0) {
      this.FinishExecute(true);
    }
  }
}
exports.default = TsTaskPlayMontage;
//# sourceMappingURL=TsTaskPlayMontage.js.map