"use strict";

var RoadNetworkNavigationComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        r = (o < 3 ? h(r) : o > 3 ? h(e, i, r) : h(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadNetworkNavigationComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const VehicleStreamDefine_1 = require("../../../Module/VehicleStream/VehicleStreamDefine");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const MIN_BUFFER_TIME_LENGTH = 0.02;
const MAX_BUFFER_TIME_LENGTH = 60000;
const BLINK_MOVE_MIN_TIME = 4;
const HIT_INTERVAL = 3000;
const COMMON_CONTEXT = "RoadNetworkNavigationComponent";
const INIT_VISIBLE_DISTANCE = 2000;
let RoadNetworkNavigationComponent = RoadNetworkNavigationComponent_1 = class RoadNetworkNavigationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.n$t = undefined;
    this.Nln = undefined;
    this.emn = undefined;
    this.Heg = undefined;
    this.jeg = undefined;
    this.wDe = 0;
    this.Wpo = 0;
    this._Af = false;
    this.b1n = false;
    this.ujf = false;
    this.mXf = false;
    this.$eg = false;
    this.Weg = false;
    this.Lo = undefined;
    this.mGf = undefined;
    this.cjf = undefined;
    this.jUn = 0;
    this.FY1 = 0;
    this.wY = 0;
    this.Qeg = 1;
    this.Keg = 0;
    this.djf = Transform_1.Transform.Create();
    this.mjf = undefined;
    this.E$f = -1;
    this.I$f = undefined;
    this.vtg = undefined;
    this.GQf = new Map();
    this.fjf = t => {
      var e = this.GetVehicleTeamMember();
      if (e && (e.OnForceTick(t), this.IsTickOnPreMove())) {
        if (this.Weg && this.Qeg !== 1) {
          this.Keg += t;
          if (++this.wY % this.Qeg == 0) {
            e.OnTick(0, this.Keg, this.Qeg);
            this.Keg = 0;
          }
        } else {
          e.OnTick(0, t, 1);
        }
      }
    };
    this.ytg = () => {
      var t = this.Stg();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("VehicleStream", 18, "车流载具预制体:加载完毕", ["CreatureDataId", this.Wpo], ["PlayerInInitLocation", !t]);
      }
      if (t) {
        this.Mtg();
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("VehicleStream", 18, "车流载具预制体:玩家在出生范围", ["CreatureDataId", this.Wpo]);
        }
        this.vtg = TimerSystem_1.TimerSystem.Forever(this.Etg, 1000);
      }
    };
    this.Etg = () => {
      if (this.Stg()) {
        if (TimerSystem_1.TimerSystem.Has(this.vtg)) {
          TimerSystem_1.TimerSystem.Remove(this.vtg);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("VehicleStream", 18, "车流载具预制体:玩家离开出生范围", ["CreatureDataId", this.Wpo]);
        }
        this.Mtg();
      }
    };
    this.cDm = () => {
      this.n$t?.SetupSceneInteractionWhenLoadCompleted();
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, true, COMMON_CONTEXT);
      this.$eg = this.GetShowActor()?.WasRecentlyRenderedOnScreen() ?? false;
      this.emn = this.n$t?.GetInteractionSkeletalMeshActor()?.SkeletalMeshComponent;
      var t = this.LaunchVehicle();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("VehicleStream", 18, "车流载具预制体:显示", ["CreatureDataId", this.Wpo], ["RecentlyRenderedOnScreen", this.$eg], ["LaunchSuccess", t]);
      }
      if (t) {
        this.Nln?.SetEnableMovementSync(true, "RoadNetworkNavigationComponent Enable");
      }
    };
    this.FQf = t => {
      if (this.FFm) {
        if (t) {
          if (this.HasModelBuffer()) {
            this.NQf(false, 2);
          }
        } else {
          this.NQf(true, 2);
        }
      }
    };
    this.fXf = t => {
      if (t.size) {
        for (const e of t) {
          if (e === this.emn) {
            this.mXf = true;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("VehicleStream", 18, "OnMotorcycleBaseMovementChanged", ["CreatureDataId", this.Wpo], ["baseMovement", e]);
            }
            return;
          }
        }
      }
      this.mXf = false;
    };
    this.M6l = t => {
      if (t.VehicleEntity && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
        EventSystem_1.EventSystem.AddWithTarget(t.VehicleEntity, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.fXf);
      }
    };
    this.E6l = t => {
      if (t.VehicleEntity && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
        EventSystem_1.EventSystem.RemoveWithTarget(t.VehicleEntity, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.fXf);
      }
    };
    this.Ohn = () => {
      this.b1n = true;
      this.emn?.SetCollisionEnabled(3);
      this.emn?.OnComponentHit.Add(this.OnComponentHit);
      var t = this.GetVehicleTeamMember();
      if (t) {
        t.OnEnterPlayerRange();
      }
    };
    this.Fhn = () => {
      this.b1n = false;
      this.emn?.SetCollisionEnabled(0);
      this.emn?.OnComponentHit.Remove(this.OnComponentHit);
      var t = this.GetVehicleTeamMember();
      if (t) {
        t.OnLeavePlayerRange();
      }
    };
    this.OnComponentHit = (t, e, i, s, h) => {
      var o = this.gjf();
      if (!!o && e === o && !(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.FY1 < HIT_INTERVAL)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("VehicleStream", 18, "摩托碰撞车流载具", ["CreatureDataId", this.Wpo], ["otherActor", e?.GetName()], ["IsPlayerStandOn", this.ujf]);
        }
        this.FY1 = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        o = 201106;
        if (ModelManager_1.ModelManager.AchievementModel.GetAchievementData(o)?.GetFinishState() === 0) {
          ControllerHolder_1.ControllerHolder.AchievementController.RequestAchievementFinish(o);
        }
        if (ModelManager_1.ModelManager.VehicleStreamModel.EnableDebug) {
          UE.KismetSystemLibrary.DrawDebugSphere(t, h.ImpactPoint, 15, 12, ColorUtils_1.ColorUtils.LinearYellow, 1);
        }
        if (this.cjf) {
          e = "[RoadNetworkNavigationComponent]";
          if (this.jUn) {
            EffectSystem_1.EffectSystem.StopEffectById(this.jUn, e, false);
          }
          o = UE.KismetMathLibrary.WD_LocalToWorld(GlobalData_1.GlobalData.World, h.ImpactPoint);
          this.djf.SetLocation(o);
          this.jUn = this.hst(this.cjf, this.djf.ToUeTransform(), e);
        }
      }
    };
    this.OnEntityWasRecentlyRenderedOnScreenChange = t => {
      if (!(this.$eg = t)) {
        this.Weg = true;
        this.Keg = 0;
      }
    };
    this.FFm = undefined;
    this.OutTransformOffsetRef = (0, puerts_1.$ref)(undefined);
  }
  get SkeletalMeshComponentToWorld() {
    if (this.E$f < Time_1.Time.Frame && this.emn?.IsValid()) {
      this.E$f = Time_1.Time.Frame;
      this.I$f = this.emn.D_K2_GetComponentToWorld();
    }
    return this.I$f;
  }
  OnInitData(t) {
    var e = t.GetParam(RoadNetworkNavigationComponent_1)[0];
    this.Lo = e;
    var e = this.Lo.ObstacleConfig.ExtraObstacleDetectionRange;
    if (e?.Type === "Box") {
      this.mGf = e;
    }
    this.cjf = this.Lo.BasicConfig.HitEffect;
    this.mjf = new EffectContext_1.EffectContext(this.Entity.Id);
    this.wDe = t.PbDataId;
    this.Wpo = t.CreatureDataId;
    this.u1t = this.Entity.GetComponent(0);
    this.Nln = this.Entity.GetComponent(167);
    this.n$t = this.Entity.GetComponent(212);
    this.Heg = this.Entity.GetComponent(130);
    var e = this.u1t.ComponentDataMap.get("bwm")?.bwm?.Q2m;
    if (e && e.kLm && e.fom) {
      ControllerHolder_1.ControllerHolder.VehicleStreamController.RegisterVehicleTeamMember(this.Wpo, this.wDe, e.kLm, e.qLm, e.fom, e.gom, Vector_1.Vector.Create(this.u1t.ServerStartLocation), Rotator_1.Rotator.Create(this.u1t.GetRotation()), this.Lo.BasicConfig);
    }
    this.u1t.SetVisible(false);
    return true;
  }
  OnActivate() {
    var t;
    if (this.CheckCanLaunch()) {
      if (this.LaunchVehicle()) {
        this.Nln?.SetEnableMovementSync(true, "RoadNetworkNavigationComponent Enable");
      }
    } else {
      EventSystem_1.EventSystem.OnceWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompletedNew, this.ytg);
    }
    if (this.Heg?.Valid) {
      t = this.Entity?.GameBudgetManagedToken;
      this.jeg = this.Heg.CreatePerceptionEvent(VehicleStreamDefine_1.COLLISION_AUDIO_ENABLE_RANGE, t, this.Ohn, this.Fhn);
    }
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.RegisterPreMoveTick(this, this.fjf);
  }
  OnEnable() {
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.RegisterPreMoveTick(this, this.fjf);
  }
  OnDisable(t) {
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.UnregisterPreMoveTick(this);
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompletedNew, this.ytg)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompletedNew, this.ytg);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.VehicleMemberBlockByTraceTarget, this.FQf)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.VehicleMemberBlockByTraceTarget, this.FQf);
    }
    var t = this.gXf();
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.fXf)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.fXf);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnEnterVehicle, this.M6l)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    }
    if (this.b1n) {
      this.Fhn();
    }
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.UnregisterPreMoveTick(this);
    ControllerHolder_1.ControllerHolder.VehicleStreamController.UnRegisterVehicleTeamMember(this.Wpo);
    if (this.FFm?.IsValid()) {
      this.FFm.SetComponentTickEnabled(false);
    }
    if (this.jeg) {
      this.Heg?.DeletePerceptionEvent(this.jeg);
    }
    return true;
  }
  OnTick(t) {
    if (!this._Af) {
      this._Af = true;
      if (this.Entity.DistanceWithCamera > VehicleStreamDefine_1.COLLISION_AUDIO_ENABLE_RANGE) {
        this.Fhn();
      } else {
        this.Ohn();
      }
    }
    const e = this.GetVehicleTeamMember();
    if (e) {
      if (this.Weg) {
        this.Weg = false;
        TimerSystem_1.TimerSystem.Next(() => {
          e?.OnTick(2, t, this.Entity.GetTickInterval());
        });
      } else {
        if (!this.IsTickOnPreMove()) {
          e.OnTick(1, t, this.Entity.GetTickInterval());
        }
        this.Qeg = this.Entity.GetTickInterval();
      }
    }
  }
  Stg() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!t && !!this.n$t && Vector_1.Vector.Distance(t.ActorLocationProxy, this.n$t.ActorLocationProxy) > INIT_VISIBLE_DISTANCE;
  }
  Mtg() {
    this.u1t?.SetVisible(true);
    this.n$t?.ToggleSceneInteractionVisible(true, this.cDm, COMMON_CONTEXT);
  }
  LaunchVehicle() {
    var t;
    return !!this.emn && !!ControllerHolder_1.ControllerHolder.VehicleStreamController.LaunchVehicle(this.Wpo, this.emn) && (t = this.n$t?.Owner, this.FFm = t?.GetComponentByClass(UE.KuroSceneItemModelBufferComponent.StaticClass()), this.FFm?.IsValid() || (this.FFm = t?.AddComponentByClass(UE.KuroSceneItemModelBufferComponent.StaticClass(), false, new UE.Transform(), false), this.FFm.SetUpMeshComponent(this.emn)), this.GQf.clear(), this.NQf(true, 0), EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.VehicleMemberBlockByTraceTarget, this.FQf), this.CXf(), true);
  }
  CXf() {
    var t = this.gXf();
    if (t) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.fXf);
    } else {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    }
  }
  OnCharacterStandOn(t) {
    if (Global_1.Global.BaseCharacter && Global_1.Global.BaseCharacter.EntityId === t) {
      this.ujf = true;
    }
  }
  OnCharacterLeave(t) {
    if (Global_1.Global.BaseCharacter && Global_1.Global.BaseCharacter.EntityId === t) {
      this.ujf = false;
    }
  }
  gXf() {
    return Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(242)?.VehicleEntity;
  }
  gjf() {
    var t = this.gXf();
    if (t) {
      return t.GetComponent(1)?.Owner;
    }
  }
  hst(t, e, i) {
    return EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, e, t, i, this.mjf, 3, undefined, undefined);
  }
  GetConfig() {
    return this.Lo;
  }
  GetActorComponent() {
    return this.n$t;
  }
  GetActor() {
    return this.n$t?.Owner;
  }
  GetSkeletalMeshComponent() {
    return this.emn;
  }
  GetMoveSyncComponent() {
    return this.Nln;
  }
  SetLocationAndRotation(t, e, i, s, h) {
    if (this.emn && h > 1) {
      this.SetLocationAndRotatorWithKeepingModelBuffer(t, e, s, COMMON_CONTEXT);
    } else {
      this.n$t?.SetActorLocationAndRotation(t, e, COMMON_CONTEXT);
    }
  }
  GetShowActor() {
    return this.n$t?.CurLevelPrefabShowActor;
  }
  WasRecentlyRenderedOnScreen() {
    return this.$eg;
  }
  GetVehicleTeamMember() {
    return ModelManager_1.ModelManager.VehicleStreamModel.GetVehicleTeamMember(this.Wpo);
  }
  IsInPerceptionRange() {
    return this.b1n;
  }
  GetExtraBoxTrigger() {
    return this.mGf;
  }
  IsTickOnPreMove() {
    return this.ujf || this.mXf || this.Weg;
  }
  GetObstacleDetectionType() {
    return this.Lo?.ObstacleConfig?.ObstacleDetectionType;
  }
  CheckCanLaunch() {
    return this.emn !== undefined;
  }
  SetLocationAndRotatorWithModelBuffer(t, e, i, s, h = false) {
    var o;
    if (this.n$t) {
      if (this.FFm) {
        if (this.emn) {
          if (i < MIN_BUFFER_TIME_LENGTH) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("VehicleStream", 18, "ModelBuffer Time is Too Short", ["PbDataId", this.wDe], ["CreatureDataId", this.Wpo], ["timeLength", i]);
            }
            this.n$t.SetActorLocationAndRotation(t, e, s + ".移动表现优化.Mesh缓动.没有缓动", h);
            this.StopModelBuffer();
          } else if (Math.abs(i) < MAX_BUFFER_TIME_LENGTH) {
            this.FFm.BufferNowTime = 0;
            this.FFm.BufferTimeLength = i / 1000;
            this.NQf(true, 1);
            o = this.SkeletalMeshComponentToWorld;
            this.n$t.SetActorLocationAndRotationExceptSkeletalMesh(this.FFm, t, e, s + "移动表现优化，Mesh缓动", h);
            this.FFm.D_GetTransformOffsetInWorld(o, this.n$t.ActorTransform, this.OutTransformOffsetRef);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Long", ["PbDataId", this.wDe], ["CreatureDataId", this.Wpo], ["timeLength", i]);
          }
        } else {
          this.n$t.SetActorLocationAndRotation(t, e, s + "移动表现优化，Mesh缓动", h);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "AnimationComp is undefined", ["PbDataId", this.wDe], ["CreatureDataId", this.Wpo], ["timeLength", i]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("VehicleStream", 18, "ActorComponent is undefined", ["PbDataId", this.wDe], ["CreatureDataId", this.Wpo], ["timeLength", i]);
    }
  }
  SetLocationAndRotatorWithKeepingModelBuffer(e, i, s, h, o = true) {
    if (this.n$t) {
      if (this.FFm) {
        if (this.emn) {
          var r = this.FFm.BufferTimeLength - this.FFm.BufferNowTime;
          let t = s / 1000;
          if (r > 0) {
            t += r;
          }
          if (t < MIN_BUFFER_TIME_LENGTH || t > BLINK_MOVE_MIN_TIME) {
            if (this.HasModelBuffer()) {
              this.StopModelBuffer();
            }
            this.n$t.SetActorLocationAndRotation(e, i, h + "bufferTime不合法", o);
          } else {
            r = this.emn.D_K2_GetComponentToWorld();
            this.n$t.SetActorLocationAndRotationExceptSkeletalMesh(this.FFm, e, i, h, o);
            this.FFm.BufferNowTime = 0;
            this.FFm.BufferTimeLength = t;
            this.NQf(true, 1);
            this.FFm.D_GetTransformOffsetInWorld(r, this.n$t.ActorTransform, this.OutTransformOffsetRef);
          }
        } else {
          this.n$t.SetActorLocationAndRotation(e, i, h + "移动表现优化，Mesh缓动", o);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "AnimationComp is undefined", ["PbDataId", this.wDe], ["CreatureDataId", this.Wpo], ["timeLength", s]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("VehicleStream", 18, "ActorComponent is undefined", ["PbDataId", this.wDe], ["CreatureDataId", this.Wpo], ["timeLength", s]);
    }
  }
  StopModelBuffer() {
    this.FFm?.StopModelBuffer();
    this.NQf(false, 1);
  }
  HasModelBuffer() {
    return this.GetModelBufferTime() > 0;
  }
  GetModelBufferTime() {
    if (this.FFm) {
      return this.FFm.BufferTimeLength;
    } else {
      return 0;
    }
  }
  NQf(t, e) {
    if (this.FFm) {
      if (t) {
        this.GQf.delete(e);
        if (!this.GQf.size) {
          this.FFm.SetComponentTickEnabled(true);
        }
      } else {
        this.GQf.set(e, true);
        this.FFm.SetComponentTickEnabled(false);
      }
    }
  }
};
RoadNetworkNavigationComponent = RoadNetworkNavigationComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(338)], RoadNetworkNavigationComponent);
exports.RoadNetworkNavigationComponent = RoadNetworkNavigationComponent; //# sourceMappingURL=RoadNetworkNavigationComponent.js.map