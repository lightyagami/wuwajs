"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPortal extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Distance = 0;
    this.EffectDieTime = -0;
    this.EffectBornTime = -0;
    this.ActiveModel = false;
    this.WaitTime = -0;
    this.EffectId = 0;
    this.StartMaterialControllerData = undefined;
    this.EndMaterialControllerData = undefined;
    this.FollowPointName = "FollowPoint";
    this.FollowPoint = undefined;
    this.IsInitTsVariables = false;
    this.TsEffectDieTime = -0;
    this.TsEffectBornTime = -0;
    this.TsActiveModel = false;
    this.TsWaitTime = -0;
    this.TsStartMaterialControllerData = undefined;
    this.TsEndMaterialControllerData = undefined;
    this.TsFollowPointName = "";
  }
  Constructor() {
    super.Constructor();
    this.EffectId = 0;
    this.FollowPoint = undefined;
    this.IsInitTsVariables = false;
    this.TsEffectDieTime = -0;
    this.TsEffectBornTime = -0;
    this.TsActiveModel = false;
    this.TsWaitTime = -0;
    this.TsStartMaterialControllerData = undefined;
    this.TsEndMaterialControllerData = undefined;
    this.TsFollowPointName = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsEffectDieTime = this.EffectDieTime;
      this.TsEffectBornTime = this.EffectBornTime;
      this.TsActiveModel = this.ActiveModel;
      this.TsWaitTime = this.WaitTime;
      this.TsStartMaterialControllerData = this.StartMaterialControllerData;
      this.TsEndMaterialControllerData = this.EndMaterialControllerData;
      this.TsFollowPointName = this.FollowPointName;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    if (t.AiController) {
      if (!this.TsActiveModel) {
        this.FinishExecute(false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
    }
  }
  ReceiveTickAI(i, t, s) {
    i = i.AiController;
    if (i) {
      var e = i.CharActorComp;
      this.FollowPoint = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(i.CharAiDesignComp.Entity.Id, this.TsFollowPointName);
      let t = Vector_1.Vector.ZeroVectorDouble;
      if (this.FollowPoint) {
        t = new UE.VectorDouble(this.FollowPoint.X, this.FollowPoint.Y, this.FollowPoint.Z);
      }
      if (this.TsActiveModel) {
        if (this.TsWaitTime <= Time_1.Time.WorldTime) {
          e.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.EffectId);
          e.Actor.CharRenderingComponent.AddMaterialControllerData(this.TsStartMaterialControllerData);
          this.TsActiveModel = false;
          i = UE.KismetMathLibrary.D_ProjectPointOnToPlane(e.ActorLocation, t, new UE.VectorDouble(0, 0, 1));
          i = UE.KismetMathLibrary.D_FindLookAtRotation(i, t);
          e.SetActorLocationAndRotation(t, i, "行为树节点.巡逻", true);
          this.TsWaitTime = this.TsEffectBornTime + Time_1.Time.WorldTime;
        }
      } else if (this.TsWaitTime <= Time_1.Time.WorldTime && t && t !== Vector_1.Vector.ZeroVectorDouble) {
        this.TsActiveModel = true;
        this.EffectId = e.Actor.CharRenderingComponent.AddMaterialControllerData(this.TsEndMaterialControllerData);
        this.TsWaitTime = this.TsEffectDieTime + Time_1.Time.WorldTime;
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskPortal;
//# sourceMappingURL=TsTaskPortal.js.map