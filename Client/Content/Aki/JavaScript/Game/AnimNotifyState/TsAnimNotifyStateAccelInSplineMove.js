"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterSplineMoveComponent_1 = require("../NewWorld/Character/Common/Component/CharacterSplineMoveComponent");
class TsAnimNotifyStateAccelInSplineMove extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.AddSpeedMap = undefined;
  }
  Constructor() {
    this.AddSpeedMap = undefined;
  }
  K2_NotifyTick(t, e, i) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var n = t.GetEntityNoBlueprint();
    if (!n?.Valid) {
      return false;
    }
    n = n.GetComponent(108);
    if (!n?.Active) {
      return false;
    }
    if (n.CurrentSplineMoveType !== "PathLine") {
      return false;
    }
    n = t.CharacterActorComponent;
    if (!n) {
      return false;
    }
    TsAnimNotifyStateAccelInSplineMove.Initialize();
    this.InitializeSelf();
    if (n.Entity.GetComponent(177)?.HasKuroRootMotion) {
      var o = n.Entity.GetComponent(178);
      if (!o) {
        return false;
      }
      let e = this.AddSpeedMap.get(t);
      if (!e) {
        e = Vector_1.Vector.Create(0, 0, 0);
        this.AddSpeedMap.set(t, e);
      }
      TsAnimNotifyStateAccelInSplineMove.CurrentSpeed.DeepCopy(e);
      if (!this.CalculateNewSpeed(e, n, i, t)) {
        return false;
      }
      TsAnimNotifyStateAccelInSplineMove.CurrentSpeed.Addition(e, TsAnimNotifyStateAccelInSplineMove.TmpVector);
      TsAnimNotifyStateAccelInSplineMove.TmpVector.MultiplyEqual(i / 2);
      o.MoveCharacter(TsAnimNotifyStateAccelInSplineMove.TmpVector, i, "ANSAccelInSplineMove");
      n.ActorVelocityProxy.Addition(e, TsAnimNotifyStateAccelInSplineMove.TmpVector);
      t.CharacterMovement.Velocity = TsAnimNotifyStateAccelInSplineMove.TmpVector.ToUeVectorOld();
      const r = n.Entity.GetComponent(113);
      r?.CacheVelocityInfo("SetActorVelocity");
    } else {
      this.AddSpeedMap.delete(t);
      TsAnimNotifyStateAccelInSplineMove.CurrentSpeed.FromUeVector(t.CharacterMovement.Velocity);
      if (!this.CalculateNewSpeed(TsAnimNotifyStateAccelInSplineMove.CurrentSpeed, n, i, t)) {
        return false;
      }
      t.CharacterMovement.Velocity = TsAnimNotifyStateAccelInSplineMove.CurrentSpeed.ToUeVectorOld();
      const r = n.Entity.GetComponent(113);
      r?.CacheVelocityInfo("SetActorVelocity");
    }
    return true;
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    if (e) {
      this.AddSpeedMap?.delete(e);
    }
    return true;
  }
  CalculateNewSpeed(e, t, i, n) {
    if (t.InputDirectProxy.IsNearlyZero()) {
      if ((o = e.SizeSquared2D()) > MathUtils_1.MathUtils.SmallNumber) {
        o = Math.sqrt(o);
        o = Math.max(0, o - CharacterSplineMoveComponent_1.CharacterSplineMoveComponent.SplineMoveConfig.AnsAccel * i) / o;
        e.X *= o;
        e.Y *= o;
      }
      return true;
    }
    t.InputDirectProxy.Multiply(CharacterSplineMoveComponent_1.CharacterSplineMoveComponent.SplineMoveConfig.AnsAccel * i, TsAnimNotifyStateAccelInSplineMove.TmpVector);
    e.AdditionEqual(TsAnimNotifyStateAccelInSplineMove.TmpVector);
    var o = MathUtils_1.MathUtils.Square(CharacterSplineMoveComponent_1.CharacterSplineMoveComponent.SplineMoveConfig.MaxFlySpeed);
    var t = e.SizeSquared2D();
    if (o < t) {
      i = Math.sqrt(o / t);
      e.X *= i;
      e.Y *= i;
    }
    return !e.ContainsNaN() || (Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 6, "TsAnimNotifyStateAccelInSplineMove Nan Speed", ["target", e], ["OwnerVelocity", n.CharacterMovement.Velocity], ["newSizeSquared", t], ["maxSpeedSquared", o]), false);
  }
  static Initialize() {
    if (!TsAnimNotifyStateAccelInSplineMove.CurrentSpeed) {
      TsAnimNotifyStateAccelInSplineMove.CurrentSpeed = Vector_1.Vector.Create();
      TsAnimNotifyStateAccelInSplineMove.TmpVector = Vector_1.Vector.Create();
    }
  }
  InitializeSelf() {
    this.AddSpeedMap ||= new Map();
  }
}
TsAnimNotifyStateAccelInSplineMove.CurrentSpeed = undefined;
TsAnimNotifyStateAccelInSplineMove.TmpVector = undefined;
exports.default = TsAnimNotifyStateAccelInSplineMove; //# sourceMappingURL=TsAnimNotifyStateAccelInSplineMove.js.map