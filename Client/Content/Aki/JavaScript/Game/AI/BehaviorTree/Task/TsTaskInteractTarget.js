"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskInteractTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "";
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.EndTime = -0;
    this.AnimComp = undefined;
    this.OnMontageEnded = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.EndTime = -0;
    this.AnimComp = undefined;
    this.OnMontageEnded = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
    }
  }
  ReceiveExecuteAI(t, e) {
    this.InitTsVariables();
    var i;
    var r = t.AiController;
    if (r) {
      if (this.TsBlackboardKey && (this.OnMontageEnded ||= (t, e) => {
        this.EndTime = Time_1.Time.WorldTime;
      }, this.EndTime = Time_1.Time.WorldTime, i = r.CharActorComp.Entity.Id, i = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(i, this.TsBlackboardKey)) && (i = WorldFunctionLibrary_1.default.GetDynamicEntity(i))) {
        this.AnimComp = r.CharActorComp.Entity.GetComponent(181);
        this.ExecuteInteractTarget(i, r.CharActorComp);
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ExecuteInteractTarget(t, e) {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(t);
    var i = ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(t);
    let r = i.ActorLocation;
    let s = i.ActorRotation;
    i = t.Entity.GetComponent(106);
    if (i?.IsInit) {
      if (t = i.GetInteractPosition()) {
        r = t;
      }
      if (t = i.GetInteractRotator()) {
        s = t;
      }
      e.SetInputRotator(s);
      e.SetActorLocationAndRotation(r, s, "行为树节点.目标交互.强制切换目前", false);
    }
  }
  ReceiveTickAI(t, e, i) {
    if (this.EndTime < Time_1.Time.WorldTime) {
      this.Finish(true);
    }
  }
  OnClear() {
    this.EndTime = 0;
    if (this.AnimComp) {
      this.AnimComp.MainAnimInstance.OnMontageEnded.Remove(this.OnMontageEnded);
      this.AnimComp = undefined;
    }
  }
}
exports.default = TsTaskInteractTarget;
//# sourceMappingURL=TsTaskInteractTarget.js.map