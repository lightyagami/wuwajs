"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (o = e[n]) {
        h = (r < 3 ? o(h) : r > 3 ? o(t, i, h) : o(t, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(t, i, h);
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
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UeMovementTickManageComponent_1 = require("../../Common/Component/UeMovementTickManageComponent");
const TsBaseVehicle_1 = require("../TsBaseVehicle");
const MIN_MODEL_BUFFER_TIME = 60;
const PROFILE_KEY = "UeMovementTickManager.RevertCheck";
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
    this.OnEntityBudgetTickEnableChange = e => {};
  }
  static get Dependencies() {
    return [247];
  }
  get ForbiddenTickPose() {
    return this.ForbiddenTickPoseInternal;
  }
  set ForbiddenTickPose(e) {
    if (this.ForbiddenTickPoseInternal !== e) {
      this.ForbiddenTickPoseInternal = e;
      this.VehicleMovement.bForbiddenTickPose = e;
    }
  }
  OnInit() {
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(247);
    this.VehicleMoveComp = this.Entity.GetComponent(249);
    this.AnimComp = this.Entity.GetComponent(248);
    this.VehiclePerformComp = this.Entity.GetComponent(246);
    this.DebugComp = this.Entity.GetComponent(30);
    this.SkelTickMgr = this.Entity.GetComponent(123);
    this.VehicleMovement = this.ActorComp.Owner.GetComponentByClass(UE.KuroVehicleMovementComponent.StaticClass());
    if (!this.VehicleMovement) {
      return false;
    }
    this.VehicleMovement.SetKuroOnlyTickOutside(true);
    this.VehicleMovement.SetComponentTickEnabled(false);
    var e = this.ActorComp.Owner.GetComponentByClass(UE.CharacterMovementComponent.StaticClass());
    return !!e && (e.SetKuroOnlyTickOutside(true), e.SetComponentTickEnabled(false), this.ForbiddenTickPose = this.Entity.GetTickInterval() > 1, UeMovementTickManageComponent_1.UeMovementTickController.AddManager(this, 1), true);
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
  PreProxyTick(e) {
    this.TickMovement(e);
  }
  ProxyTick() {}
  CanTickDefault() {
    return this.Active;
  }
  CanTickWithDistance() {
    if (this.VehicleMoveComp) {
      return this.Active && this.VehicleMoveComp.CanMoveWithDistance;
    } else {
      return this.Active;
    }
  }
  TickMovement(e) {
    if (this.VehicleMovement) {
      if (this.DebugComp) {
        this.DebugComp.MarkDebugRecord("移动组件更新前 ", undefined, true);
      }
      for (const r of this.VehiclePerformComp.PassengerInfoMap.values()) {
        r.PassengerEntity?.GetComponent(30)?.MarkDebugRecord("载具移动组件更新前", undefined, true);
      }
      var t = this.ActorComp.Owner.CustomTimeDilation;
      if (this.VehicleMoveComp.CanMove() && !this.VehicleMoveComp.IsSpecialMove) {
        var i = this.Entity.GetTickInterval() > 1;
        this.ForbiddenTickPose = i || this.Frozen;
        if (i && this.AnimComp?.Valid && this.ActorComp.Owner.WasRecentlyRenderedOnScreen()) {
          if (e * t < MIN_MODEL_BUFFER_TIME) {
            this.VehicleMovement.KuroTickComponentOutside(e * MathUtils_1.MathUtils.MillisecondToSecond * t);
          } else {
            var s = this.AnimComp.GetMeshTransform();
            this.CacheActorLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
            this.CacheActorRotator.DeepCopy(this.ActorComp.ActorRotationProxy);
            this.VehicleMovement.KuroTickComponentOutside(e * MathUtils_1.MathUtils.MillisecondToSecond * t);
            this.ActorComp.ResetAllCachedTime();
            if (!this.TraceRevertCheck()) {
              this.ActorComp.SetActorLocationAndRotation(this.CacheActorLocation.ToUeVector(), this.CacheActorRotator.ToUeRotator(), "UeMovement.Revert", false);
              return;
            }
            if (!this.CacheActorLocation.Equals(this.ActorComp.ActorLocationProxy) || !this.CacheActorRotator.Equals(this.ActorComp.ActorRotationProxy)) {
              this.AnimComp.SetModelBuffer(s, e);
            }
          }
        } else {
          this.CacheActorLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
          this.CacheActorRotator.DeepCopy(this.ActorComp.ActorRotationProxy);
          s = i ? e : Time_1.Time.DeltaTime;
          this.VehicleMovement.KuroTickComponentOutside(s * MathUtils_1.MathUtils.MillisecondToSecond * t);
          this.ActorComp.ResetAllCachedTime();
          if (!this.TraceRevertCheck()) {
            this.ActorComp.SetActorLocationAndRotation(this.CacheActorLocation.ToUeVector(), this.CacheActorRotator.ToUeRotator(), "UeMovement.Revert", false);
            return;
          }
        }
      }
      if (this.DebugComp) {
        this.DebugComp.MarkDebugRecord("移动组件更新后", undefined, true);
      }
      for (const h of this.VehiclePerformComp.PassengerInfoMap.values()) {
        var o = h.PassengerEntity?.GetComponent(30);
        h.PassengerEntity?.GetComponent(1)?.ResetAllCachedTime();
        o?.MarkDebugRecord("载具移动组件更新后", undefined, true);
      }
    }
  }
  TraceRevertCheck() {
    if (this.ActorComp?.CreatureData.GetBaseInfo()?.Category.VehicleType === "Motorcycle") {
      var t = this.ActorComp?.Actor?.VehicleMovementComponent;
      if (t?.WheelDisplayInfosObj) {
        for (let e = t.WheelDisplayInfosObj.DisplayInfos.Num() - 1; e >= 0; --e) {
          var i;
          var s = t.WheelDisplayInfosObj.DisplayInfos.Get(e);
          if (isNaN(s.WheelSpeed) || isNaN(s.WheelAccel)) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Vehicle", 6, "Motor Error: Wheel", ["Index", e], ["Speed", s.WheelSpeed], ["Accel", s.WheelAccel]);
            }
            (i = new UE.MotorWheelDisplayInfo()).WheelSpeed = 0;
            i.WheelAccel = 0;
            i.WheelLocation = s.WheelLocation;
            t.WheelDisplayInfosObj.DisplayInfos.Set(e, i);
          }
        }
      }
      if (!this.CacheActorLocation.Equals(this.ActorComp.ActorLocationProxy)) {
        var e = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
        e.WorldContextObject = this.ActorComp.Actor;
        e.Radius = 15;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, this.CacheActorLocation);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, this.ActorComp.ActorLocationProxy);
        e.ActorsToIgnore.Empty();
        var o = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, e, PROFILE_KEY, PROFILE_KEY);
        if (o) {
          var r = e.HitResult;
          if (r.bBlockingHit) {
            for (let e = 0; e < r.GetHitCount(); ++e) {
              var h = r.Actors.Get(e);
              if (!(h instanceof TsBaseCharacter_1.default) && !(h instanceof TsBaseVehicle_1.default)) {
                return false;
              }
            }
          }
        }
      }
    }
    return true;
  }
};
UeVehicleMovementTickManageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(259)], UeVehicleMovementTickManageComponent);
exports.UeVehicleMovementTickManageComponent = UeVehicleMovementTickManageComponent; //# sourceMappingURL=UeVehicleMovementTickManageComponent.js.map