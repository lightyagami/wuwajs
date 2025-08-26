"use strict";

var __decorate = this && this.__decorate || function (e, t, i, r) {
  var s;
  var o = arguments.length;
  var h = o < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, r);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (s = e[n]) {
        h = (o < 3 ? s(h) : o > 3 ? s(t, i, h) : s(t, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehiclePerformComponent = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../Input/InputEnums");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator");
const BaseVehiclePerformComponent_1 = require("./BaseVehiclePerformComponent");
let VehiclePerformComponent = class VehiclePerformComponent extends BaseVehiclePerformComponent_1.BaseVehiclePerformComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.MoveComp = undefined;
    this.TagComp = undefined;
    this.IsBeingImpacted = false;
    this.CollisionStrength = 0;
    this.CollisionDirection = 0;
    this.CollisionVelocity = Vector_1.Vector.Create();
    this.HasRoleAndCtrlByMe = false;
    this.IsHidePassenger = false;
    this.LastActorRotation = Rotator_1.Rotator.Create();
    this.VehicleTagListeners = undefined;
    this.kIc = undefined;
    this.OnEnterHitCollision = (e, t, i, r, s) => {
      this.CalculateImpactStrength(s);
      this.CalculateImpactDirection(s);
      this.IsBeingImpacted = true;
      this.MoveComp?.EnableUeMovementTick("载具受到碰撞");
    };
  }
  OnStart() {
    if (!super.OnStart()) {
      return false;
    }
    this.ActorComp = this.Entity.GetComponent(235);
    this.AnimComp = this.Entity.GetComponent(236);
    this.MoveComp = this.Entity.GetComponent(237);
    this.TagComp = this.Entity.GetComponent(206);
    this.HasRoleAndCtrlByMe = false;
    var e = this.ActorComp?.Owner;
    if (e?.IsValid()) {
      e.CapsuleComponent.OnComponentHit.Add(this.OnEnterHitCollision);
    }
    return !!this.InitVehicleConfig();
  }
  OnTick(e) {
    this.UpdateRotYawSpeed(e);
  }
  LoadVehicleConfigAsset() {
    if (this.ActorComp?.Actor.VehicleMovementComponent?.IsValid()) {
      return super.LoadVehicleConfigAsset();
    }
  }
  Enter(e, t) {
    super.Enter(e, t);
    for (const i of this.PassengerInfoMap.values()) {
      if (i.IsDriver && i.IsRolePassenger()) {
        if (this.Entity.GameBudgetManagedToken) {
          cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig.GroupName, this.Entity.GameBudgetManagedToken, true);
        }
        break;
      }
    }
    if (e.GetComponent(3)?.IsRoleAndCtrlByMe) {
      this.AddVehicleTagListeners();
    }
  }
  Leave(e, t = 0) {
    super.Leave(e, t);
    let i = false;
    for (const r of this.PassengerInfoMap.values()) {
      if (r.IsDriver && r.IsRolePassenger()) {
        i = true;
        break;
      }
    }
    if (!i) {
      if (this.Entity.GameBudgetManagedToken) {
        cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig.GroupName, this.Entity.GameBudgetManagedToken, false);
      }
    }
    if (e.GetComponent(3)?.IsRoleAndCtrlByMe) {
      this.RemoveVehicleTagListeners();
    }
  }
  CheckIfCanLeave() {
    return true;
  }
  CheckIfCanSprint() {
    return true;
  }
  CheckIfCanRiderSharing() {
    return !!ModelManager_1.ModelManager.VehicleModel?.IsReadyRiderSharing && !ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing;
  }
  AddVehicleTagListeners() {}
  RemoveVehicleTagListeners() {}
  RefreshRideSharingSkillState() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleSkillEnableChanged, this.CheckIfCanRiderSharing(), InputEnums_1.EInputAction.技能1);
  }
  CalculateImpactStrength(e) {
    var t = e.Component;
    var i = this.TmpVector1;
    var r = this.TmpVector2;
    i.FromUeVector(e.ImpactNormal);
    r.Reset();
    if (t) {
      r.FromUeVector(t.GetComponentVelocity());
    }
    this.ActorComp.ActorVelocityProxy.Subtraction(r, this.CollisionVelocity);
    this.CollisionStrength = Math.abs(Vector_1.Vector.DotProduct(this.CollisionVelocity, i));
  }
  CalculateImpactDirection(e) {
    var t = this.CollisionVelocity.ToUeVector();
    var i = this.ActorComp.ActorRight;
    var i = t.CosineAngle2D(i);
    var i = MathCommon_1.MathCommon.RadianToDegree(Math.acos(i));
    var r = this.ActorComp.ActorForward;
    var t = t.CosineAngle2D(r);
    var r = MathCommon_1.MathCommon.RadianToDegree(Math.acos(t));
    if (i > MathCommon_1.MathCommon.RightAngle) {
      this.CollisionDirection = r * -1;
    } else {
      this.CollisionDirection = r;
    }
  }
  EnterVehiclePerform(e) {
    if (e.IsRolePassenger(true)) {
      this.HasRoleAndCtrlByMe = true;
      this.IgnorePlatformCollisionToCamera(true);
    }
    if (this.IsHidePassenger && e.PassengerEntity) {
      this.OIc(e.PassengerEntity, false);
    }
  }
  LeaveVehiclePerform(e) {
    if (e.IsRolePassenger(true)) {
      this.HasRoleAndCtrlByMe = false;
      this.IgnorePlatformCollisionToCamera(false);
    }
    if (this.IsHidePassenger && e.PassengerEntity) {
      this.OIc(e.PassengerEntity, true);
    }
  }
  OIc(e, t) {
    var i = e.GetComponent(1);
    if (i?.Valid) {
      e = e.Id;
      if (t) {
        if (t = this.kIc?.get(e)) {
          i.EnableActor(t);
          this.kIc.delete(e);
        }
      } else {
        this.kIc ||= new Map();
        t = i.DisableActor("SetPassengerVisible");
        this.kIc.set(e, t);
      }
    }
  }
  IgnorePlatformCollisionToCamera(e) {
    var t = this.ActorComp?.Actor.PlatformActor;
    if (t?.IsValid() && (t = t.GetComponentByClass(UE.StaticMeshComponent.StaticClass()))?.IsValid()) {
      if (e) {
        t.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.Camera, 0);
      } else {
        t.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.Camera, 2);
      }
    }
  }
  CheckCanPerformHit() {
    return true;
  }
  OnBulletHit(e, t) {}
  SetGravityDirectForVehicle(e) {
    this.MoveComp.SetGravityDirect(e);
    for (const t of this.PassengerInfoMap.values()) {
      t.PassengerEntity?.GetComponent(45)?.SetGravityDirectWithoutRotate(e);
    }
  }
  SetGravityDirectForVehicleWithoutRotate(e) {
    this.MoveComp.SetGravityDirectWithoutRotate(e);
    for (const t of this.PassengerInfoMap.values()) {
      t.PassengerEntity?.GetComponent(45)?.SetGravityDirectWithoutRotate(e);
    }
  }
  GetVehicleVelocity(e) {
    if (this.ActorComp) {
      e.DeepCopy(this.ActorComp.ActorVelocityProxy);
    }
  }
  UpdateRotYawSpeed(e) {
    var t = this.LastActorRotation.Yaw;
    var i = this.ActorComp.ActorRotationProxy.Yaw;
    this.ActorComp.SimulatedRotYawSpeed = MathUtils_1.MathUtils.WrapAngle(i - t) / (e * 0.001);
    this.LastActorRotation.DeepCopy(this.ActorComp.ActorRotationProxy);
  }
};
VehiclePerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(238)], VehiclePerformComponent);
exports.VehiclePerformComponent = VehiclePerformComponent; //# sourceMappingURL=VehiclePerformComponent.js.map