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
const Time_1 = require("../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
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
    this.ImpactedVelocity = Vector_1.Vector.Create();
    this.CacheImpactHitResult = undefined;
    this.SimulatedHitNormal = undefined;
    this.m$m = 0;
    this.CollisionVelocity = Vector_1.Vector.Create();
    this.HasRoleAndCtrlByMe = false;
    this.IsHidePassenger = false;
    this.LastActorRotation = Rotator_1.Rotator.Create();
    this.VehicleTagListeners = undefined;
    this.kIc = undefined;
    this.OnEnterHitCollision = (e, t, i, r, s) => {
      this.CacheImpact(s);
      this.OnHit(s);
      this.MoveComp?.EnableUeMovementTick("载具受到碰撞");
    };
  }
  get ActorLocationProxy() {
    return this.ActorComp?.ActorLocationProxy;
  }
  get ActorRotationProxy() {
    return this.ActorComp?.ActorRotationProxy;
  }
  OnStart() {
    if (!super.OnStart()) {
      return false;
    }
    this.ActorComp = this.Entity.GetComponent(247);
    this.AnimComp = this.Entity.GetComponent(248);
    this.MoveComp = this.Entity.GetComponent(249);
    this.TagComp = this.Entity.GetComponent(215);
    this.HasRoleAndCtrlByMe = false;
    var e = this.ActorComp?.Owner;
    if (e?.IsValid()) {
      e.CapsuleComponent.OnComponentHit.Add(this.OnEnterHitCollision);
    }
    return !!this.InitVehicleConfig();
  }
  OnTick(e) {
    this.UpdateRotYawSpeed(e);
    if (Time_1.Time.Frame !== this.m$m && this.ActorComp?.IsMoveAutonomousProxy) {
      this.IsBeingImpacted = false;
    }
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
      t.PassengerEntity?.GetComponent(46)?.SetGravityDirectWithoutRotate(e);
    }
  }
  SetGravityDirectForVehicleWithoutRotate(e) {
    this.MoveComp.SetGravityDirectWithoutRotate(e);
    for (const t of this.PassengerInfoMap.values()) {
      t.PassengerEntity?.GetComponent(46)?.SetGravityDirectWithoutRotate(e);
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
  CacheImpact(e) {
    if (this.ActorComp?.IsMoveAutonomousProxy) {
      this.m$m = Time_1.Time.Frame;
      this.IsBeingImpacted = true;
      this.ImpactedVelocity.FromUeVector(this.MoveComp.VehicleMovement.Velocity);
      this.CacheImpactHitResult = e;
    }
  }
  SimulatedImpactInfo(e, t, i, r, s, o) {
    this.CacheImpactHitResult ||= new UE.HitResult();
    this.SimulatedHitNormal ||= new UE.Vector();
    this.SimulatedHitNormal.Set(r, s, o);
    this.CacheImpactHitResult.Normal = this.SimulatedHitNormal;
    this.ImpactedVelocity.Set(e, t, i);
  }
  OnHit(e) {}
};
VehiclePerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(250)], VehiclePerformComponent);
exports.VehiclePerformComponent = VehiclePerformComponent; //# sourceMappingURL=VehiclePerformComponent.js.map