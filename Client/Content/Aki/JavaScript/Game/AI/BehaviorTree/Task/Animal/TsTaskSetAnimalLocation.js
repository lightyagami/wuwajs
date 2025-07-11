"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskSetAnimalLocation extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "";
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var a = e.AiController;
    if (a) {
      if ((a = a.CharActorComp)?.Valid) {
        var r = a.Entity.Id;
        if (this.TsBlackboardKey) {
          r = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(r, this.TsBlackboardKey);
          if (!r) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("BehaviorTree", 42, "不存在BlackboardKey", ["Key", this.TsBlackboardKey]);
            }
            this.FinishExecute(false);
            return;
          }
          MathUtils_1.MathUtils.CommonTempVector.Set(r.X, r.Y, r.Z);
          r = this.DetectFloor(a);
          if (r) {
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, MathUtils_1.MathUtils.CommonTempVector);
            a.SetActorLocation(MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), "TsTaskSetAnimalLocation", false);
            this.FinishExecute(true);
            return;
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
    }
    this.FinishExecute(false);
  }
  DetectFloor(e) {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = e.Actor;
    t.Radius = e.ScaledRadius;
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(e, MathUtils_1.MathUtils.CommonTempVector, e.ScaledHalfHeight);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, MathUtils_1.MathUtils.CommonTempVector);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(e, MathUtils_1.MathUtils.CommonTempVector, e.ScaledHalfHeight * -2);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, MathUtils_1.MathUtils.CommonTempVector);
    t.ActorsToIgnore.Empty();
    for (const a of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      t.ActorsToIgnore.Add(a);
    }
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(e.Actor.CapsuleComponent, t, "TsTaskSetAnimalLocation", "TsTaskSetAnimalLocation")) {
      return t.HitResult;
    } else {
      return undefined;
    }
  }
}
exports.default = TsTaskSetAnimalLocation;
//# sourceMappingURL=TsTaskSetAnimalLocation.js.map