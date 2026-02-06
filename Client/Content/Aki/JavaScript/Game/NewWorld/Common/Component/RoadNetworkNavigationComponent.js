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
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
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
const BLINK_MOVE_MIN_TIME = 4;
const HIT_INTERVAL = 3000;
const COMMON_CONTEXT = "RoadNetworkNavigationComponent";
const INIT_VISIBLE_DISTANCE = 1000;
let RoadNetworkNavigationComponent = RoadNetworkNavigationComponent_1 = class RoadNetworkNavigationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.n$t = undefined;
    this.Nln = undefined;
    this.emn = undefined;
    this.jPg = undefined;
    this.$Pg = undefined;
    this.u$g = false;
    this.wDe = 0;
    this.Wpo = 0;
    this.v2f = false;
    this.b1n = false;
    this.Lig = false;
    this.S_g = false;
    this.WPg = false;
    this.QPg = false;
    this.Lo = undefined;
    this.L6f = undefined;
    this.wig = undefined;
    this.jUn = 0;
    this.FY1 = 0;
    this.wY = 0;
    this.KPg = 1;
    this.XPg = 0;
    this.Pig = Transform_1.Transform.Create();
    this.Aig = undefined;
    this.eog = -1;
    this.tog = undefined;
    this.tDg = undefined;
    this.cag = new Map();
    this.fGr = (t, e) => {
      this.u$g = t;
    };
    this.Dig = t => {
      var e;
      if (!this.u$g) {
        if ((e = this.GetVehicleTeamMember()) && (e.OnForceTick(t), this.IsTickOnPreMove())) {
          if (this.QPg && this.KPg !== 1) {
            this.XPg += t;
            if (++this.wY % this.KPg == 0) {
              e.OnTick(0, this.XPg, this.KPg);
              this.XPg = 0;
            }
          } else {
            e.OnTick(0, t, 1);
          }
        }
      }
    };
    this.iDg = () => {
      var t = this.rDg();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("VehicleStream", 18, "车流载具预制体:加载完毕", ["CreatureDataId", this.Wpo], ["PlayerInInitLocation", !t]);
      }
      if (t) {
        this.oDg();
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("VehicleStream", 18, "车流载具预制体:玩家在出生范围", ["CreatureDataId", this.Wpo]);
        }
        this.tDg = TimerSystem_1.TimerSystem.Forever(this.nDg, 1000);
      }
    };
    this.nDg = () => {
      if (this.rDg()) {
        if (TimerSystem_1.TimerSystem.Has(this.tDg)) {
          TimerSystem_1.TimerSystem.Remove(this.tDg);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("VehicleStream", 18, "车流载具预制体:玩家离开出生范围", ["CreatureDataId", this.Wpo]);
        }
        this.oDg();
      }
    };
    this.wAm = () => {
      this.WPg = this.GetShowActor()?.WasRecentlyRenderedOnScreen() ?? false;
      var t = this.n$t?.GetInteractionSkeletalMeshActor();
      this.emn = t?.SkeletalMeshComponent;
      var e = this.Entity.GetComponent(91);
      if (e) {
        e.SetRangeActorParent(t, false, FNameUtil_1.FNameUtil.GetDynamicFName("BoostPad"));
      }
      var e = this.LaunchVehicle();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("VehicleStream", 18, "车流载具预制体:显示", ["CreatureDataId", this.Wpo], ["RecentlyRenderedOnScreen", this.WPg], ["LaunchSuccess", e]);
      }
      if (e) {
        this.Nln?.SetEnableMovementSync(true, "RoadNetworkNavigationComponent Enable");
      }
    };
    this.dag = t => {
      if (this.n3m) {
        if (t) {
          if (this.HasModelBuffer()) {
            this.mag(false, 2);
          }
        } else {
          this.mag(true, 2);
        }
      }
    };
    this.M_g = t => {
      if (t.size) {
        for (const e of t) {
          if (e === this.emn) {
            this.S_g = true;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("VehicleStream", 18, "OnMotorcycleBaseMovementChanged", ["CreatureDataId", this.Wpo], ["baseMovement", e]);
            }
            return;
          }
        }
      }
      this.S_g = false;
    };
    this.M6l = t => {
      if (t.VehicleEntity && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
        EventSystem_1.EventSystem.AddWithTarget(t.VehicleEntity, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.M_g);
      }
    };
    this.E6l = t => {
      if (t.VehicleEntity && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
        EventSystem_1.EventSystem.RemoveWithTarget(t.VehicleEntity, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.M_g);
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
      var o = this.Uig();
      if (!!o && e === o && !(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.FY1 < HIT_INTERVAL)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("VehicleStream", 18, "摩托碰撞车流载具", ["CreatureDataId", this.Wpo], ["otherActor", e?.GetName()], ["IsPlayerStandOn", this.Lig]);
        }
        this.FY1 = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        o = 201106;
        if (ModelManager_1.ModelManager.AchievementModel.GetAchievementData(o)?.GetFinishState() === 0) {
          ControllerHolder_1.ControllerHolder.AchievementController.RequestAchievementFinish(o);
        }
        if (ModelManager_1.ModelManager.VehicleStreamModel.EnableDebug) {
          UE.KismetSystemLibrary.DrawDebugSphere(t, h.ImpactPoint, 15, 12, ColorUtils_1.ColorUtils.LinearYellow, 1);
        }
        if (this.wig) {
          e = "[RoadNetworkNavigationComponent]";
          if (this.jUn) {
            EffectSystem_1.EffectSystem.StopEffectById(this.jUn, e, false);
          }
          o = UE.KismetMathLibrary.WD_LocalToWorld(GlobalData_1.GlobalData.World, h.ImpactPoint);
          this.Pig.SetLocation(o);
          this.jUn = this.hst(this.wig, this.Pig.ToUeTransform(), e);
        }
      }
    };
    this.OnEntityWasRecentlyRenderedOnScreenChange = t => {
      if (!(this.WPg = t)) {
        this.QPg = true;
        this.XPg = 0;
      }
    };
    this.n3m = undefined;
    this.OutTransformOffsetRef = (0, puerts_1.$ref)(undefined);
  }
  get SkeletalMeshComponentToWorld() {
    if (this.eog < Time_1.Time.Frame && this.emn?.IsValid()) {
      this.eog = Time_1.Time.Frame;
      this.tog = this.emn.D_K2_GetComponentToWorld();
    }
    return this.tog;
  }
  OnInitData(t) {
    var e = t.GetParam(RoadNetworkNavigationComponent_1)[0];
    this.Lo = e;
    var e = this.Lo.ObstacleConfig.ExtraObstacleDetectionRange;
    if (e?.Type === "Box") {
      this.L6f = e;
    }
    this.wig = this.Lo.BasicConfig.HitEffect;
    this.Aig = new EffectContext_1.EffectContext(this.Entity.Id);
    this.wDe = t.PbDataId;
    this.Wpo = t.CreatureDataId;
    this.u1t = this.Entity.GetComponent(0);
    this.Nln = this.Entity.GetComponent(169);
    this.n$t = this.Entity.GetComponent(214);
    this.jPg = this.Entity.GetComponent(132);
    var e = this.u1t.ComponentDataMap.get("$wm")?.$wm?.lqm;
    if (e && e.uPm && e.fom) {
      ControllerHolder_1.ControllerHolder.VehicleStreamController.RegisterVehicleTeamMember(this.Wpo, this.wDe, e.uPm, e.cPm, e.fom, e.gom, Vector_1.Vector.Create(this.u1t.ServerStartLocation), Rotator_1.Rotator.Create(this.u1t.GetRotation()), this.Lo.BasicConfig);
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
      EventSystem_1.EventSystem.OnceWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompletedNew, this.iDg);
    }
    if (this.jPg?.Valid) {
      t = this.Entity?.GameBudgetManagedToken;
      this.$Pg = this.jPg.CreatePerceptionEvent(VehicleStreamDefine_1.COLLISION_AUDIO_ENABLE_RANGE, t, this.Ohn, this.Fhn);
    }
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.RegisterPreMoveTick(this, this.Dig);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbsoluteTimeStop, this.fGr);
  }
  OnEnable() {
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.RegisterPreMoveTick(this, this.Dig);
  }
  OnDisable(t) {
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.UnregisterPreMoveTick(this);
  }
  OnEnd() {
    if (this.b1n) {
      this.Fhn();
    }
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.UnregisterPreMoveTick(this);
    if (this.n3m?.IsValid()) {
      this.n3m.SetComponentTickEnabled(false);
    }
    if (this.$Pg) {
      this.jPg?.DeletePerceptionEvent(this.$Pg);
    }
    return true;
  }
  OnClear() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompletedNew, this.iDg)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompletedNew, this.iDg);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.wAm)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.wAm);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.VehicleMemberBlockByTraceTarget, this.dag)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.VehicleMemberBlockByTraceTarget, this.dag);
    }
    var t = this.E_g();
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.M_g)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.M_g);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnEnterVehicle, this.M6l)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnAbsoluteTimeStop, this.fGr)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbsoluteTimeStop, this.fGr);
    }
    return ControllerHolder_1.ControllerHolder.VehicleStreamController.UnRegisterVehicleTeamMember(this.Wpo);
  }
  OnTick(t) {
    if (!this.u$g) {
      if (!this.v2f) {
        this.v2f = true;
        if (this.Entity.DistanceWithCamera > VehicleStreamDefine_1.COLLISION_AUDIO_ENABLE_RANGE) {
          this.Fhn();
        } else {
          this.Ohn();
        }
      }
      const e = this.GetVehicleTeamMember();
      if (e) {
        if (this.QPg) {
          this.QPg = false;
          TimerSystem_1.TimerSystem.Next(() => {
            e?.OnTick(2, t, this.Entity.GetTickInterval());
          });
        } else {
          if (!this.IsTickOnPreMove()) {
            e.OnTick(1, t, this.Entity.GetTickInterval());
          }
          this.KPg = this.Entity.GetTickInterval();
        }
      }
    }
  }
  rDg() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!t && !!this.n$t && Vector_1.Vector.Distance(t.ActorLocationProxy, this.n$t.ActorLocationProxy) > INIT_VISIBLE_DISTANCE;
  }
  oDg() {
    this.u1t?.SetVisible(true);
    EventSystem_1.EventSystem.OnceWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.wAm);
    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, true, COMMON_CONTEXT);
  }
  LaunchVehicle() {
    var t;
    return !!this.emn && !!ControllerHolder_1.ControllerHolder.VehicleStreamController.LaunchVehicle(this.Wpo, this.emn) && (t = this.n$t?.Owner, this.n3m = t?.GetComponentByClass(UE.KuroSceneItemModelBufferComponent.StaticClass()), this.n3m?.IsValid() || (this.n3m = t?.AddComponentByClass(UE.KuroSceneItemModelBufferComponent.StaticClass(), false, new UE.Transform(), false), this.n3m.SetUpMeshComponent(this.emn)), this.cag.clear(), this.mag(true, 0), EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.VehicleMemberBlockByTraceTarget, this.dag), this.I_g(), true);
  }
  I_g() {
    var t = this.E_g();
    if (t) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.M_g);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
  }
  OnCharacterStandOn(t) {
    if (Global_1.Global.BaseCharacter && Global_1.Global.BaseCharacter.EntityId === t) {
      this.Lig = true;
    }
  }
  OnCharacterLeave(t) {
    if (Global_1.Global.BaseCharacter && Global_1.Global.BaseCharacter.EntityId === t) {
      this.Lig = false;
    }
  }
  E_g() {
    return Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(242)?.VehicleEntity;
  }
  Uig() {
    var t = this.E_g();
    if (t) {
      return t.GetComponent(1)?.Owner;
    }
  }
  hst(t, e, i) {
    return EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, e, t, i, this.Aig, 3, undefined, undefined);
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
    return this.WPg;
  }
  GetVehicleTeamMember() {
    return ModelManager_1.ModelManager.VehicleStreamModel.GetVehicleTeamMember(this.Wpo);
  }
  IsInPerceptionRange() {
    return this.b1n;
  }
  GetExtraBoxTrigger() {
    return this.L6f;
  }
  IsTickOnPreMove() {
    return this.Lig || this.S_g || this.QPg;
  }
  GetObstacleDetectionType() {
    return this.Lo?.ObstacleConfig?.ObstacleDetectionType;
  }
  CheckCanLaunch() {
    return this.emn !== undefined;
  }
  SetLocationAndRotatorWithKeepingModelBuffer(e, i, s, h, o = true) {
    if (this.n$t) {
      if (this.n3m) {
        if (this.emn) {
          var r = this.n3m.BufferTimeLength - this.n3m.BufferNowTime;
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
            this.n$t.SetActorLocationAndRotationExceptSkeletalMesh(this.n3m, e, i, h, o);
            this.n3m.BufferNowTime = 0;
            this.n3m.BufferTimeLength = t;
            this.mag(true, 1);
            this.n3m.D_GetTransformOffsetInWorld(r, this.n$t.ActorTransform, this.OutTransformOffsetRef);
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
    this.n3m?.StopModelBuffer();
    this.mag(false, 1);
    if (ModelManager_1.ModelManager.VehicleStreamModel.EnableDebug && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VehicleStream", 18, "StopModelBuffer", ["CreatureDataId", this.Wpo]);
    }
  }
  HasModelBuffer() {
    return this.GetModelBufferTime() > 0;
  }
  IsModelBufferCompTickEnabled() {
    return !!this.n3m && this.n3m.IsComponentTickEnabled();
  }
  GetModelBufferTime() {
    if (this.n3m) {
      return this.n3m.BufferTimeLength;
    } else {
      return 0;
    }
  }
  mag(t, e) {
    if (this.n3m) {
      if (t) {
        this.cag.delete(e);
        if (!this.cag.size && !this.n3m.IsComponentTickEnabled()) {
          this.n3m.SetComponentTickEnabled(true);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("VehicleStream", 18, "SetModelBufferComponentTickable", ["PbDataId", this.wDe], ["CreatureDataId", this.Wpo], ["source", e], ["enable", true]);
          }
        }
      } else {
        this.cag.set(e, true);
        if (this.n3m.IsComponentTickEnabled() && (this.n3m.SetComponentTickEnabled(false), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("VehicleStream", 18, "SetModelBufferComponentTickable", ["PbDataId", this.wDe], ["CreatureDataId", this.Wpo], ["source", e], ["enable", false]);
        }
      }
    }
  }
};
RoadNetworkNavigationComponent = RoadNetworkNavigationComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(340)], RoadNetworkNavigationComponent);
exports.RoadNetworkNavigationComponent = RoadNetworkNavigationComponent; //# sourceMappingURL=RoadNetworkNavigationComponent.js.map