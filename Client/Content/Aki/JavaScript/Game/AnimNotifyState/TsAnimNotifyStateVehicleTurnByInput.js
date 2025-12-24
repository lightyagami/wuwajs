"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
const GravityUtils_1 = require("../Utils/GravityUtils");
class TsAnimNotifyStateVehicleTurnByInput extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.TurnSpeed = 0;
    this.EnableMinSpeedFixUp = true;
    this.MinSpeed = 0;
    this.EnableRollBalanceFixUp = true;
    this.RollInterpolationSpeed = 5;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, i) {
    var n;
    var u;
    var t = t.GetOwner();
    return t instanceof TsBaseVehicle_1.default && (u = (n = t.VehicleActorComponent)?.Entity?.GetComponent(249), !!n && !!u && !(this.KeepVelocity(t), 0));
  }
  K2_NotifyTick(t, e, i) {
    var n;
    var u;
    var t = t.GetOwner();
    return t instanceof TsBaseVehicle_1.default && (n = t.VehicleActorComponent, t = t.VehicleActorComponent.InputDirectProxy, GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(n, TsAnimNotifyStateVehicleTurnByInput.TmpQuat), TsAnimNotifyStateVehicleTurnByInput.TmpQuat.Inverse(TsAnimNotifyStateVehicleTurnByInput.TmpQuat2), t = this.TurnSpeed * t.Y * i, TsAnimNotifyStateVehicleTurnByInput.TmpRotator.Set(0, t, 0), TsAnimNotifyStateVehicleTurnByInput.TmpQuat.Multiply(TsAnimNotifyStateVehicleTurnByInput.TmpRotator.Quaternion(), TsAnimNotifyStateVehicleTurnByInput.TmpQuat3), TsAnimNotifyStateVehicleTurnByInput.TmpQuat3.Multiply(TsAnimNotifyStateVehicleTurnByInput.TmpQuat2, TsAnimNotifyStateVehicleTurnByInput.TmpQuat), TsAnimNotifyStateVehicleTurnByInput.TmpQuat.RotateVector(n.ActorVelocityProxy, TsAnimNotifyStateVehicleTurnByInput.TmpVector1), n.VehicleMoveComp.SetForceSpeed(TsAnimNotifyStateVehicleTurnByInput.TmpVector1), TsAnimNotifyStateVehicleTurnByInput.TmpQuat.Multiply(n.ActorQuatProxy, TsAnimNotifyStateVehicleTurnByInput.TmpQuat2), TsAnimNotifyStateVehicleTurnByInput.TmpQuat3.DeepCopy(TsAnimNotifyStateVehicleTurnByInput.TmpQuat2), this.EnableRollBalanceFixUp && (Vector_1.Vector.CrossProduct(n.ActorForwardProxy, n.ActorGravityDirectProxy, TsAnimNotifyStateVehicleTurnByInput.TmpVector1), t = Vector_1.Vector.DotProduct(n.ActorRightProxy, TsAnimNotifyStateVehicleTurnByInput.TmpVector1), u = Vector_1.Vector.DotProduct(n.ActorUpProxy, TsAnimNotifyStateVehicleTurnByInput.TmpVector1), u = 90 - Math.acos(MathUtils_1.MathUtils.Clamp(u, -1, 1)) * MathUtils_1.MathUtils.RadToDeg, i = MathUtils_1.MathUtils.RotatorAxisInterpTo(u, 0, i, this.RollInterpolationSpeed), t = Math.sign(t) * (i - u), TsAnimNotifyStateVehicleTurnByInput.TmpRotator.Set(0, 0, t), TsAnimNotifyStateVehicleTurnByInput.TmpQuat2.Multiply(TsAnimNotifyStateVehicleTurnByInput.TmpRotator.Quaternion(), TsAnimNotifyStateVehicleTurnByInput.TmpQuat3)), n?.SetActorRotation(TsAnimNotifyStateVehicleTurnByInput.TmpQuat3.Rotator().ToUeRotator(), "TsAnsVehicleTurnByInput", true), true);
  }
  K2_NotifyEnd(t, e) {
    return t.GetOwner() instanceof TsBaseCharacter_1.default;
  }
  GetNotifyName() {
    return "输入改变载具速度和旋转";
  }
  KeepVelocity(t) {
    var e;
    return !this.EnableMinSpeedFixUp || !!(e = t.VehicleActorComponent?.VehicleMoveComp) && (e.VehicleMovement?.MotorSubState === 3 ? this.KeepVelocityFromAir(t) : this.KeepVelocityFromGround(t));
  }
  KeepVelocityFromGround(t) {
    var e;
    var t = t.VehicleActorComponent;
    return !!t && (e = Vector_1.Vector.DotProduct(t.ActorForwardProxy, t.ActorGravityDirectProxy), TsAnimNotifyStateVehicleTurnByInput.TmpVector1.DeepCopy(t.ActorForwardProxy), e > 0 && (GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(t, TsAnimNotifyStateVehicleTurnByInput.TmpVector1), TsAnimNotifyStateVehicleTurnByInput.TmpVector1.Normalize()), TsAnimNotifyStateVehicleTurnByInput.TmpVector1.Multiply(Vector_1.Vector.DotProduct(t.ActorVelocityProxy, TsAnimNotifyStateVehicleTurnByInput.TmpVector1), TsAnimNotifyStateVehicleTurnByInput.TmpVector2), TsAnimNotifyStateVehicleTurnByInput.TmpVector2.SizeSquared() < this.MinSpeed * this.MinSpeed && TsAnimNotifyStateVehicleTurnByInput.TmpVector1.Multiply(this.MinSpeed, TsAnimNotifyStateVehicleTurnByInput.TmpVector2), t.VehicleMoveComp.SetForceSpeed(TsAnimNotifyStateVehicleTurnByInput.TmpVector2), t.VehicleMoveComp.SetMotorSubState(1), true);
  }
  KeepVelocityFromAir(t) {
    t = t.VehicleActorComponent;
    return !!t && (TsAnimNotifyStateVehicleTurnByInput.TmpVector1.DeepCopy(t.ActorForwardProxy), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(t, TsAnimNotifyStateVehicleTurnByInput.TmpVector1), TsAnimNotifyStateVehicleTurnByInput.TmpVector1.Normalize(), TsAnimNotifyStateVehicleTurnByInput.TmpVector1.Multiply(Vector_1.Vector.DotProduct(t.ActorVelocityProxy, TsAnimNotifyStateVehicleTurnByInput.TmpVector1), TsAnimNotifyStateVehicleTurnByInput.TmpVector2), TsAnimNotifyStateVehicleTurnByInput.TmpVector2.SizeSquared() < this.MinSpeed * this.MinSpeed && TsAnimNotifyStateVehicleTurnByInput.TmpVector1.Multiply(this.MinSpeed, TsAnimNotifyStateVehicleTurnByInput.TmpVector2), t.VehicleMoveComp.SetForceSpeed(TsAnimNotifyStateVehicleTurnByInput.TmpVector2), t.VehicleMoveComp.SetMotorSubState(1), true);
  }
}
TsAnimNotifyStateVehicleTurnByInput.TmpVector1 = Vector_1.Vector.Create();
TsAnimNotifyStateVehicleTurnByInput.TmpVector2 = Vector_1.Vector.Create();
TsAnimNotifyStateVehicleTurnByInput.TmpRotator = Rotator_1.Rotator.Create();
TsAnimNotifyStateVehicleTurnByInput.TmpQuat = Quat_1.Quat.Create();
TsAnimNotifyStateVehicleTurnByInput.TmpQuat2 = Quat_1.Quat.Create();
TsAnimNotifyStateVehicleTurnByInput.TmpQuat3 = Quat_1.Quat.Create();
exports.default = TsAnimNotifyStateVehicleTurnByInput; //# sourceMappingURL=TsAnimNotifyStateVehicleTurnByInput.js.map