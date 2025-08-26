"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
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
    this.TmpVector = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TmpVector = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
      this.TmpVector = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var i = e.AiController;
    if (i) {
      if ((i = i.CharActorComp)?.Valid) {
        var r = i.Entity.Id;
        if (this.TsBlackboardKey) {
          r = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(r, this.TsBlackboardKey);
          if (!r) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("BehaviorTree", 42, "不存在BlackboardKey", ["Key", this.TsBlackboardKey]);
            }
            this.FinishExecute(false);
            return;
          }
          this.TmpVector.Set(r.X, r.Y, r.Z);
          r = this.DetectFloor(i, this.TmpVector);
          if (r) {
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, this.TmpVector);
            i.SetActorLocation(this.TmpVector.ToUeVector(), "TsTaskSetAnimalLocation", false);
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
  DetectFloor(e, t) {
    var i = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    i.WorldContextObject = e.Actor;
    i.Radius = e.ScaledRadius;
    var r = e.ScaledHalfHeight * 2;
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(t);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(e, MathUtils_1.MathUtils.CommonTempVector, r);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, MathUtils_1.MathUtils.CommonTempVector);
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(t);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(e, MathUtils_1.MathUtils.CommonTempVector, r * -1);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, MathUtils_1.MathUtils.CommonTempVector);
    i.ActorsToIgnore.Empty();
    for (const o of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      i.ActorsToIgnore.Add(o);
    }
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(e.Actor.CapsuleComponent, i, "TsTaskSetAnimalLocation", "TsTaskSetAnimalLocation")) {
      return i.HitResult;
    } else {
      return undefined;
    }
  }
}
exports.default = TsTaskSetAnimalLocation;
//# sourceMappingURL=TsTaskSetAnimalLocation.js.map