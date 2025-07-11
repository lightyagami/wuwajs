"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskTurnToLocation extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.LocationKey = "";
    this.DirectionKey = "";
    this.Continuously = false;
    this.TurnSpeed = 0;
    this.IsInitTsVariables = false;
    this.TsLocationKey = "";
    this.TsDirectionKey = "";
    this.TsTurnSpeed = 0;
    this.TsContinuously = false;
    this.TmpVector = undefined;
    this.TmpVector2 = undefined;
    this.TmpVector3 = undefined;
    this.TmpRotator = undefined;
    this.TmpRotator2 = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsLocationKey = "";
    this.TsDirectionKey = "";
    this.TsTurnSpeed = 0;
    this.TsContinuously = false;
    this.TmpVector = undefined;
    this.TmpVector2 = undefined;
    this.TmpVector3 = undefined;
    this.TmpRotator = undefined;
    this.TmpRotator2 = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsLocationKey = this.LocationKey;
      this.TsDirectionKey = this.DirectionKey;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TsContinuously = this.Continuously;
      this.TmpVector = Vector_1.Vector.Create();
      this.TmpVector2 = Vector_1.Vector.Create();
      this.TmpVector3 = Vector_1.Vector.Create();
      this.TmpRotator = Rotator_1.Rotator.Create();
      this.TmpRotator2 = Rotator_1.Rotator.Create();
    }
  }
  ReceiveTickAI(t, s, i) {
    this.InitTsVariables();
    var h;
    var o;
    var r = t.AiController;
    if (r?.CharActorComp) {
      h = r.CharActorComp;
      if (this.TsLocationKey && (o = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(r.CharAiDesignComp.Entity.Id, this.TsLocationKey))) {
        this.TmpVector3.DeepCopy(o);
        this.TmpVector3.SubtractionEqual(h.ActorLocationProxy);
      }
      if (this.TsDirectionKey && (o = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(r.CharAiDesignComp.Entity.Id, this.TsDirectionKey))) {
        this.TmpVector3.DeepCopy(o);
      }
      this.TmpVector2.DeepCopy(h.ActorGravityDirectProxy);
      this.TmpVector2.UnaryNegation(this.TmpVector2);
      Vector_1.Vector.VectorPlaneProject(this.TmpVector3, this.TmpVector2, this.TmpVector);
      if (this.TmpVector.IsNearlyZero()) {
        this.FinishExecute(true);
      } else {
        this.TmpVector.Normalize();
        MathUtils_1.MathUtils.LookRotationForwardFirst(this.TmpVector, this.TmpVector2, this.TmpRotator);
        if (this.TsContinuously) {
          MathUtils_1.MathUtils.RotatorInterpConstantTo(h.ActorRotationProxy, this.TmpRotator, i, this.TsTurnSpeed, this.TmpRotator2);
          h.SetActorRotation(this.TmpRotator2.ToUeRotator(), "TsTaskTurnToLocation", false);
          if (h.ActorRotationProxy.Equals2(this.TmpRotator)) {
            this.FinishExecute(true);
          }
        } else {
          h.SetActorRotation(this.TmpRotator.ToUeRotator(), "TsTaskTurnToLocation", false);
          this.FinishExecute(true);
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskTurnToLocation;
//# sourceMappingURL=TsTaskTurnToLocation.js.map