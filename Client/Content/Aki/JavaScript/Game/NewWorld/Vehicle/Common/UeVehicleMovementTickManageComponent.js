"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var n = arguments.length;
  var h = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        h = (n < 3 ? s(h) : n > 3 ? s(e, i, h) : s(e, i)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UeVehicleMovementTickManageComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const UeMovementTickManageComponent_1 = require("../../Common/Component/UeMovementTickManageComponent");
const MIN_MODEL_BUFFER_TIME = 60;
let UeVehicleMovementTickManageComponent = class UeVehicleMovementTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.VehicleMovement = undefined;
    this.AnimComp = undefined;
    this.VehiclePerformComp = undefined;
    this.VehicleMoveComp = undefined;
    this.DebugComp = undefined;
    this.SkelTickMgr = undefined;
    this.CacheActorLocation = Vector_1.Vector.Create();
    this.CacheActorRotator = Rotator_1.Rotator.Create();
    this.ForbiddenTickPoseInternal = false;
    this.Frozen = false;
    this.OnEntityBudgetTickEnableChange = t => {};
  }
  static get Dependencies() {
    return [235];
  }
  get ForbiddenTickPose() {
    return this.ForbiddenTickPoseInternal;
  }
  set ForbiddenTickPose(t) {
    if (this.ForbiddenTickPoseInternal !== t) {
      this.ForbiddenTickPoseInternal = t;
      this.VehicleMovement.bForbiddenTickPose = t;
    }
  }
  OnInit() {
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(235);
    this.VehicleMoveComp = this.Entity.GetComponent(237);
    this.AnimComp = this.Entity.GetComponent(236);
    this.VehiclePerformComp = this.Entity.GetComponent(234);
    this.DebugComp = this.Entity.GetComponent(30);
    this.SkelTickMgr = this.Entity.GetComponent(115);
    this.VehicleMovement = this.ActorComp.Owner.GetComponentByClass(UE.KuroVehicleMovementComponent.StaticClass());
    if (!this.VehicleMovement) {
      return false;
    }
    this.VehicleMovement.SetKuroOnlyTickOutside(true);
    this.VehicleMovement.SetComponentTickEnabled(false);
    var t = this.ActorComp.Owner.GetComponentByClass(UE.CharacterMovementComponent.StaticClass());
    return !!t && (t.SetKuroOnlyTickOutside(true), t.SetComponentTickEnabled(false), this.ForbiddenTickPose = this.Entity.GetTickInterval() > 1, UeMovementTickManageComponent_1.UeMovementTickController.AddManager(this, 1), true);
  }
  OnEnd() {
    UeMovementTickManageComponent_1.UeMovementTickController.DeleteManager(this, 1);
    return true;
  }
  OnDisable() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "OnDisableVehicleMove", ["Actor", this.ActorComp?.Actor.GetName()]);
    }
  }
  OnEnable() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "OnEnableVehicleMove", ["Actor", this.ActorComp?.Actor.GetName()]);
    }
  }
  PreProxyTick(t) {
    this.TickMovement(t);
  }
  ProxyTick() {}
  TickMovement(t) {
    if (this.VehicleMovement) {
      if (this.DebugComp) {
        this.DebugComp.MarkDebugRecord("移动组件更新前 ", undefined, true);
      }
      for (const n of this.VehiclePerformComp.PassengerInfoMap.values()) {
        n.PassengerEntity?.GetComponent(30)?.MarkDebugRecord("载具移动组件更新前", undefined, true);
      }
      var e;
      var i;
      var o = this.ActorComp.Owner.CustomTimeDilation;
      if (this.VehicleMoveComp.CanMove() && !this.VehicleMoveComp.IsSpecialMove) {
        e = this.Entity.GetTickInterval() > 1;
        this.ForbiddenTickPose = e || this.Frozen;
        if (e && this.AnimComp?.Valid && this.ActorComp.Owner.WasRecentlyRenderedOnScreen()) {
          if (t * o < MIN_MODEL_BUFFER_TIME) {
            this.VehicleMovement.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond * o);
          } else {
            i = this.AnimComp.GetMeshTransform();
            this.CacheActorLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
            this.CacheActorRotator.DeepCopy(this.ActorComp.ActorRotationProxy);
            this.VehicleMovement.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond * o);
            this.ActorComp.ResetAllCachedTime();
            if (!this.CacheActorLocation.Equals(this.ActorComp.ActorLocationProxy) || !this.CacheActorRotator.Equals(this.ActorComp.ActorRotationProxy)) {
              this.AnimComp.SetModelBuffer(i, t);
            }
          }
        } else {
          i = e ? t : Time_1.Time.DeltaTime;
          this.VehicleMovement.KuroTickComponentOutside(i * MathUtils_1.MathUtils.MillisecondToSecond * o);
          this.ActorComp.ResetAllCachedTime();
        }
      }
      if (this.DebugComp) {
        this.DebugComp.MarkDebugRecord("移动组件更新后", undefined, true);
      }
      for (const h of this.VehiclePerformComp.PassengerInfoMap.values()) {
        var s = h.PassengerEntity?.GetComponent(30);
        h.PassengerEntity?.GetComponent(1)?.ResetAllCachedTime();
        s?.MarkDebugRecord("载具移动组件更新后", undefined, true);
      }
    }
  }
};
UeVehicleMovementTickManageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(245)], UeVehicleMovementTickManageComponent);
exports.UeVehicleMovementTickManageComponent = UeVehicleMovementTickManageComponent; //# sourceMappingURL=UeVehicleMovementTickManageComponent.js.map