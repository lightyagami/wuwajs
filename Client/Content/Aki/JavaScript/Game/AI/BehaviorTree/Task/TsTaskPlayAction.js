"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ServerGmController_1 = require("../../../World/Controller/ServerGmController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const DEFAULT_FINISHED_TIME = 60000;
class TsTaskPlayAction extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MontageName = "";
    this.LoopTimeMillisecond = 0;
    this.BlackboardKeyTime = "";
    this.MaskInteract = false;
    this.IsInitTsVariables = false;
    this.TsMontageName = "";
    this.TsLoopTimeMillisecond = 0;
    this.TsBlackboardKeyTime = "";
    this.TsMaskInteract = false;
    this.EndTime = -0;
    this.AnimComp = undefined;
    this.InteractComponent = undefined;
    this.OnMontageEnded = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMontageName = "";
    this.TsLoopTimeMillisecond = 0;
    this.TsBlackboardKeyTime = "";
    this.TsMaskInteract = false;
    this.EndTime = -0;
    this.AnimComp = undefined;
    this.InteractComponent = undefined;
    this.OnMontageEnded = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMontageName = this.MontageName;
      this.TsLoopTimeMillisecond = this.LoopTimeMillisecond;
      this.TsBlackboardKeyTime = this.BlackboardKeyTime;
      this.TsMaskInteract = this.MaskInteract;
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var i = e.AiController;
    const s = ServerGmController_1.ServerGmController.AnimalDebug;
    if (s && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 6, "AnimalDebug PlayAction", ["Tree", this.TreeAsset?.GetName()], ["aiController", !!i], ["aiComp", !!i?.CharAiDesignComp], ["SelfId", i?.CharActorComp?.Entity.Id]);
    }
    if (i) {
      this.OnMontageEnded ||= (e, t) => {
        this.EndTime = Time_1.Time.WorldTime;
      };
      i = i.CharActorComp.Entity;
      let t = this.TsLoopTimeMillisecond;
      if (this.TsBlackboardKeyTime && (o = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(i.Id, this.TsBlackboardKeyTime))) {
        t = o;
      }
      let e = this.TsMontageName;
      var o = ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(i.Id, "TargetMontageName");
      if (o) {
        e = o;
        ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(i.Id, "TargetMontageName");
      }
      if (s && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "AnimalDebug PlayAction2", ["TsLoopTimeMillisecond", this.TsLoopTimeMillisecond], ["time", t], ["TsMontageName", this.TsMontageName], ["spMontageName", o], ["montageName", e]);
      }
      this.InteractComponent = i.GetComponent(198);
      if (this.TsMaskInteract && this.InteractComponent) {
        this.InteractComponent.SetInteractionState(false, "TsTaskPlayAction ReceiveExecuteAI");
      }
      this.EndTime = t + Time_1.Time.WorldTime;
      this.AnimComp = i.GetComponent(178);
      if (this.AnimComp && (o = this.AnimComp.GetMontageResPathByName(e), s && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "AnimalDebug PlayAction3", ["montageResPath", o]), o?.includes("/"))) {
        ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.AnimMontage, e => {
          if (s && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("AI", 6, "AnimalDebug PlayAction4", ["montageAsset", e?.GetName()], ["MainAnimInstance", this.AnimComp?.MainAnimInstance?.GetName()]);
          }
          if (ObjectUtils_1.ObjectUtils.IsValid(e) && this.AnimComp?.MainAnimInstance) {
            if (t === 0 && (this.EndTime = DEFAULT_FINISHED_TIME + Time_1.Time.WorldTime, this.OnMontageEnded)) {
              this.AnimComp.MainAnimInstance.OnMontageEnded.Add(this.OnMontageEnded);
            }
            this.AnimComp.MainAnimInstance.Montage_Play(e);
          }
        });
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(e, t, i) {
    if (this.EndTime < Time_1.Time.WorldTime) {
      if (this.TsMaskInteract && this.InteractComponent) {
        this.InteractComponent.SetInteractionState(true, "TsTaskPlayAction ReceiveTickAI");
      }
      this.Finish(true);
    }
  }
  OnClear() {
    this.EndTime = 0;
    if (this.AnimComp) {
      if (this.AnimComp.MainAnimInstance && this.OnMontageEnded) {
        this.AnimComp.MainAnimInstance.OnMontageEnded.Remove(this.OnMontageEnded);
      }
      this.AnimComp = undefined;
    }
  }
}
exports.default = TsTaskPlayAction;
//# sourceMappingURL=TsTaskPlayAction.js.map