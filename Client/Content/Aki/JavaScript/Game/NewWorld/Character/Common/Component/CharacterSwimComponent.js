"use strict";

var CharacterSwimComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, e) {
  var h;
  var r = arguments.length;
  var _ = r < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    _ = Reflect.decorate(t, i, s, e);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (h = t[a]) {
        _ = (r < 3 ? h(_) : r > 3 ? h(i, s, _) : h(i, s)) || _;
      }
    }
  }
  if (r > 3 && _) {
    Object.defineProperty(i, s, _);
  }
  return _;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSwimComponent = exports.CharacterSwimUtils = exports.SWIMMING_DECELERATION = exports.SWIMMING_BUOYANCY = exports.LEAVE_SWIM_LESS_THAN_THIS = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TickScoreController_1 = require("../../../../TickScore/TickScoreController");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
const PROFILE_DETECT_WATER_DEPTH = "CharacterSwimComponent_DetectWaterDepth";
const PROFILE_FLOOR = "CharacterSwimComponent_CheckHasArrivedFloorInSwimming";
const MAX_LAST_TICK_OFFSET_SQUARE = 100000000;
const MAX_BYTE = 255;
const MAX_SPEED_INTO_WATER = 50;
const ENTER_SWIM_BIGGER_THAN_THIS = 0.75;
exports.LEAVE_SWIM_LESS_THAN_THIS = 0.7;
const CLIMB_CHECK_ENTER_WATER_RATE = 0.8;
const ONE_HUNDRED_TO_FIND_SURFACE = 100;
const FIVE_HUNDRED_TO_FIND_SURFACE = 500;
const TIME_CLEAR_ENTER_WATER = 500;
exports.SWIMMING_BUOYANCY = 1.4;
const SWIMMING_FRICTION = 0.01;
const SWIMMING_FRICTION_MIN_SPEED = 75;
const SWIMMING_FRICTION_RATION = 10000;
const SWIMMING_MAX_DEPTH = 2;
const SWIMMING_ACCELERATOR = 200;
exports.SWIMMING_DECELERATION = 0.06;
const EIGHTY = 80;
const COS_EIGHTY = 0.173;
const MIN_DEPTH = -Number.MAX_SAFE_INTEGER;
const waterAreaDetectExtent = new UE.VectorDouble(500, 500, 5000);
const VEHICLE_ADDITIONAL_HEIGHT = 600;
const VEHICLE_ADDITIONAL_DEPTH = 250;
class CharacterSwimUtils {}
(exports.CharacterSwimUtils = CharacterSwimUtils).AfterTransformLocationOffset = new UE.Vector(EIGHTY, 0, 0);
CharacterSwimUtils.DebugColor1 = new UE.LinearColor(MAX_BYTE, MAX_BYTE, 0, 1);
CharacterSwimUtils.DebugColor2 = new UE.LinearColor(0, MAX_BYTE, 0, 1);
CharacterSwimUtils.DebugColor3 = new UE.LinearColor(MAX_BYTE, 0, 0, 1);
CharacterSwimUtils.DebugColor4 = new UE.LinearColor(0, MAX_BYTE, MAX_BYTE, 1);
let CharacterSwimComponent = CharacterSwimComponent_1 = class CharacterSwimComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.IsDebug = false;
    this.sWr = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 57, "[游泳组件]设置游泳盒子保底入水检测");
      }
      this.aWr = true;
    };
    this.hWr = (t, i) => {
      this.Lie.RemoveTag(-104158548);
      if (this.EnterSwimFromAirBuffIndex) {
        this.Entity.GetComponent(183)?.RemoveBuffByHandle(this.EnterSwimFromAirBuffIndex, -1, "空中入水结束");
        this.EnterSwimFromAirBuffIndex = 0;
      }
      if (i === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim) {
        this.MaxSpeed = this.Gce.MovementData.FaceDirection.Standing.FastSwimSpeed;
        this.lWr = true;
        this._Wr();
      } else if (i === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim) {
        this.MaxSpeed = this.Gce.MovementData.FaceDirection.Standing.NormalSwimSpeed;
        this.lWr = false;
        this._Wr();
      } else {
        this.uWr();
      }
    };
    this.cWr = (t, i) => {
      if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
        this.uWr();
      } else if (i === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
        this._Wr();
      }
    };
    this.mWr = () => {
      this._Wr();
    };
    this.dWr = t => {
      var i = ((1 - MathUtils_1.MathUtils.Clamp(this.Gce.Speed / SWIMMING_FRICTION_MIN_SPEED, 0, 1)) * SWIMMING_FRICTION_RATION + 1) * SWIMMING_FRICTION;
      var s = GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(this.Hte);
      var e = this.SwimAcceleratorCurve.GetFloatValue(s) * SWIMMING_ACCELERATOR;
      this.RotateSpeed = this.SwimRotationCurve.GetFloatValue(s);
      var s = this.CWr === 1 ? 0 : exports.SWIMMING_BUOYANCY;
      this.Gce.CharacterMovement.KuroSwimming(t, true, this.Depth, s, i, this.MaxSpeed, this.WaterSlope, e, exports.SWIMMING_DECELERATION);
    };
    this.fWr = undefined;
    this.yV_ = undefined;
    this.vWr = 0;
    this.MWr = undefined;
    this.EWr = 0;
    this.Depth = 0;
    this.RotateSpeed = 0;
    this.SwimAcceleratorCurve = undefined;
    this.SwimRotationCurve = undefined;
    this.SWr = undefined;
    this.yWr = undefined;
    this.IWr = undefined;
    this.TWr = 0;
    this.LWr = false;
    this.WaterSlope = 0;
    this.MaxSpeed = 0;
    this.Hte = undefined;
    this.Lie = undefined;
    this.I5r = undefined;
    this.oRe = undefined;
    this.cBe = undefined;
    this.RWr = undefined;
    this.Gce = undefined;
    this.cz = undefined;
    this.fz = undefined;
    this.pz = undefined;
    this.UWr = undefined;
    this.AWr = undefined;
    this.PWr = undefined;
    this.SprintSwimOffset = 0;
    this.SprintSwimOffsetLerpSpeed = 0;
    this.mie = -0;
    this.xWr = undefined;
    this.wWr = 0;
    this.EnterSwimFromAirBuffIndex = 0;
    this.lWr = false;
    this.CWr = 1;
    this.BWr = -0;
    this.Mao = undefined;
    this.InSwimTriggerCount = 0;
    this.IsRole = false;
    this.ika = 0;
    this.rka = false;
    this.WaterHeightAboveMe = 0;
    this.aWr = false;
    this.rk_ = 0;
    this.Nkr = t => {
      this.MWr.DeepCopy(this.Hte.ActorLocation);
    };
  }
  static get Dependencies() {
    return [3, 187, 215];
  }
  get BuffIndex() {
    return this.wWr;
  }
  set BuffIndex(t) {
    if (this.wWr !== t) {
      this.wWr = t;
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharSwimStrengthChanged, this.wWr);
    }
  }
  get WaterType() {
    return this.rk_;
  }
  set WaterType(t) {
    if (this.rk_ !== t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 42, "当前游泳WaterType改变:", ["EntityId", this.Entity.Id], ["Actor", this.Hte?.Actor?.GetName()], ["NewType", t], ["LastType", this.rk_]);
      }
      this.rk_ = t;
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionWaterTypeChange, t);
    }
  }
  bWr() {
    var t;
    if (!this.Hte.IsBoss) {
      this.cBe.StopAllSkills("CharacterSwimComponent.EnterSwimmingState");
      if (this.IsDebug && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 57, "[游泳组件]触发入水,打断0组技能");
      }
    }
    if (!this.Gce.FallingIntoWater) {
      this.cz.DeepCopy(this.Gce.CharacterMovement.LastUpdateVelocity);
      t = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.cz);
      t = MathUtils_1.MathUtils.Clamp(t, -MAX_SPEED_INTO_WATER, MAX_SPEED_INTO_WATER);
      GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, this.cz, t);
      this.Gce.CharacterMovement.LastUpdateVelocity = this.cz.ToUeVectorOld();
      this.Gce.SetForceSpeed(this.cz);
      if (this.IsDebug && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 57, "[游泳组件]触发入水,入水速度过大，限制到", ["入水速度", this.cz]);
      }
    }
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM,
      Context: "[CharacterSwimComponent.EnterSwimmingState]"
    });
  }
  OnStart() {
    this.Depth = 0;
    this.MaxSpeed = 0;
    this.WaterSlope = 0;
    this.RotateSpeed = 0;
    this.lWr = false;
    this.InSwimTriggerCount = 0;
    this.aWr = false;
    this.qWr();
    this.BWr = 0;
    var t = this.Entity.GetComponent(0).GetEntityType();
    this.IsRole = t === Protocol_1.Aki.Protocol.kks.Proto_Player;
    this.CWr = 0;
    return !!this.GWr() && !!this.lUr() && !!this.NWr() && !(this.ewr(), this.IsRole && (EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hWr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.cWr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveSwim, this.dWr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.Nkr), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.sWr), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.sWr), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.sWr), this.Lie?.AddTagChangedListener(-290630940, this.mWr)), this.Hte.Actor.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.ENABLE_MOVE_TRIGGER_TAG), 0);
  }
  ewr() {
    this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Mao.WorldContextObject = this.Hte.Actor;
    this.Mao.Radius = 1;
    this.Mao.bIgnoreSelf = true;
    this.Mao.bIsSingle = false;
    this.Mao.SetDrawDebugTrace(this.IsDebug ? 2 : 0);
    this.Mao.DrawTime = 0.1;
    this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.Mao, CharacterSwimUtils.DebugColor3);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.Mao, CharacterSwimUtils.DebugColor4);
  }
  kWr() {
    if (this.Mao) {
      this.Mao.Dispose();
      this.Mao = undefined;
    }
  }
  oka() {
    if (this.Gce && !this.Gce.IsStandardGravity) {
      this.rka = true;
      this.ika = FIVE_HUNDRED_TO_FIND_SURFACE;
      this.WaterHeightAboveMe = 0;
    } else if (CharacterSwimComponent_1.UseSwimTrigger) {
      this.rka = this.InSwimTriggerCount > 0;
      this.ika = FIVE_HUNDRED_TO_FIND_SURFACE;
      this.WaterHeightAboveMe = 0;
    } else {
      var i;
      var s = (0, puerts_1.$ref)(0);
      let t = false;
      t = this.Hte.IsRoleAndCtrlByMe && this.I5r?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air ? (this.Hte.ActorVelocityProxy.Multiply(this.mie, this.cz), i = Math.min(0, GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.cz)), this.cz.DeepCopy(waterAreaDetectExtent), GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.cz, i), UE.NavigationSystemV1.D_NavigationGetWaterSurface(this.Hte.Actor, this.Hte.ActorLocation, this.cz?.ToUeVector(), s, this.Hte.Actor, undefined)) : UE.NavigationSystemV1.D_NavigationGetWaterSurface(this.Hte.Actor, this.Hte.ActorLocation, waterAreaDetectExtent, s, this.Hte.Actor, undefined);
      if (this.rka = t) {
        i = (0, puerts_1.$unref)(s);
        this.WaterHeightAboveMe = i - this.Hte.FloorLocation.Z;
        this.ika = i - this.Hte.ActorLocationProxy.Z + ONE_HUNDRED_TO_FIND_SURFACE;
      } else if (this.Lie?.HasTag(1532769488)) {
        this.ika = FIVE_HUNDRED_TO_FIND_SURFACE;
        this.rka = true;
      } else {
        this.ika = 0;
      }
    }
  }
  uDn() {
    return this.rka;
  }
  OnTick(t) {
    this.FWr();
    if (this.Hte.IsAutonomousProxy) {
      if (this.Lie.HasTag(464607714) || this.Lie.HasTag(-1523054094)) {
        if (this.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id) {
          this.fWr.DeepCopy(this.Hte.ActorLocation);
          if (this.oRe) {
            GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.fWr, this.oRe.IkMeshOffset);
          }
          this.yV_.DeepCopy(GravityUtils_1.GravityUtils.GetGravityUpForActor(this.Hte));
          this.jWr(true);
          this.MWr.DeepCopy(this.Hte.ActorLocation);
        }
      } else {
        this.oka();
        if (this.IsRole) {
          if (this.Gce.CharacterMovement.MovementMode === 6 && this.Gce.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM || this.uDn() || this.aWr) {
            this.mie = t * MathUtils_1.MathUtils.MillisecondToSecond;
            this.fWr.DeepCopy(this.Hte.ActorLocation);
            if (this.oRe) {
              GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.fWr, this.oRe.IkMeshOffset);
            }
            this.yV_.DeepCopy(GravityUtils_1.GravityUtils.GetGravityUpForActor(this.Hte));
            if (Vector_1.Vector.DistSquared(this.MWr, this.fWr) > MAX_LAST_TICK_OFFSET_SQUARE) {
              if (this.IsDebug && Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Movement", 57, "[游泳组件]与上一帧位置差巨大,重新设置这一帧位置", ["LastTickLocation", this.MWr], ["PlayerLocation", this.fWr]);
              }
              this.MWr.DeepCopy(this.Hte.ActorLocation);
            }
            if (this.VWr(this.HWr())) {
              this.Depth = 1;
              this.MWr.DeepCopy(this.Hte.ActorLocation);
            } else {
              this.jWr();
              this.WWr(this.mie);
              this.EWr = this.KWr();
              this.QWr();
              this.MWr.DeepCopy(this.Hte.ActorLocation);
              this.aWr = false;
            }
          } else {
            if (this.Gce.FallingIntoWater && Time_1.Time.Now > this.BWr && (this.Gce.FallingIntoWater = false, this.Lie.RemoveTag(-104158548), this.EnterSwimFromAirBuffIndex)) {
              this.Entity.GetComponent(183)?.RemoveBuffByHandle(this.EnterSwimFromAirBuffIndex, -1, "空中入水结束");
              this.EnterSwimFromAirBuffIndex = 0;
            }
            this.MWr.DeepCopy(this.Hte.ActorLocation);
          }
        } else {
          if (this.uDn()) {
            if (!this.Hte?.ActorLocationProxy.Equals(this.Hte.LastActorLocation)) {
              TickScoreController_1.TickScoreController.SwimTickScore.AddScore(this);
            }
          } else if (this.Gce.CharacterMovement.MovementMode === 6 && this.Gce.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM) {
            this.Hte?.Actor.KuroSetMovementMode({
              Mode: 3,
              CustomMode: 0,
              Context: "[CharacterSwimComponent.OnTick]"
            });
          }
          Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.MWr);
        }
      }
    }
  }
  ScoreUpdate() {
    if (this.Active && this.Hte) {
      Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.fWr);
      this.XWr();
    }
  }
  OnEnd() {
    this.$Wr();
    this.kWr();
    if (this.IsRole) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hWr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.cWr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveSwim, this.dWr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.Nkr);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.sWr);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.sWr);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.sWr);
    }
    return true;
  }
  qWr() {
    this.UWr = Vector_1.Vector.Create(0, 0, 0);
    this.AWr = Vector_1.Vector.Create(0, 0, 0);
    this.cz = Vector_1.Vector.Create(0, 0, 0);
    this.fz = Vector_1.Vector.Create(0, 0, 0);
    this.pz = Vector_1.Vector.Create(0, 0, 0);
    this.xWr = Vector_1.Vector.Create(0, 0, 0);
    this.MWr = Vector_1.Vector.Create(0, 0, 0);
    this.fWr = Vector_1.Vector.Create(0, 0, 0);
    this.yV_ = Vector_1.Vector.Create(0, 0, 1);
    this.SWr = Vector_1.Vector.Create(0, 0, MIN_DEPTH);
    this.yWr = Vector_1.Vector.Create(0, 0, MIN_DEPTH);
    this.IWr = Vector_1.Vector.Create(0, 0, 0);
  }
  $Wr() {
    this.cz = undefined;
    this.fz = undefined;
    this.pz = undefined;
    this.UWr = undefined;
    this.AWr = undefined;
    this.xWr = undefined;
    this.MWr = undefined;
    this.fWr = undefined;
    this.yV_ = undefined;
    this.SWr = undefined;
    this.yWr = undefined;
    this.IWr = undefined;
  }
  GWr() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Hte.ActorLocationProxy;
    Vector_1.Vector.VectorCopy(t, this.fWr);
    var t = this.Entity.GetComponent(215);
    if (!t?.Valid) {
      return false;
    }
    this.Lie = t;
    this.I5r = this.Entity.GetComponent(184);
    this.oRe = this.Entity.GetComponent(186);
    this.cBe = this.Entity.GetComponent(41);
    this.RWr = this.Entity.GetComponent(35);
    t = this.Entity.GetComponent(187);
    return !!t?.Valid && (this.Gce = t, this.vWr = this.Hte.HalfHeight, Vector_1.Vector.VectorCopy(this.Hte.ActorLocationProxy, this.MWr), true);
  }
  lUr() {
    return !this.IsRole || (this.PWr = ConfigManager_1.ConfigManager.SwimConfig.GetSwimConfigByRoleBodyId(this.Hte.CreatureData.GetRoleConfig().RoleBody), !!this.PWr && (this.SprintSwimOffset = 0, this.SprintSwimOffsetLerpSpeed = this.PWr.SprintZOffsetSpeed, true));
  }
  NWr() {
    return !this.IsRole || !(this.SwimAcceleratorCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.SWIM_ACCELERATOR_CURVE_PATH, UE.CurveFloat), this.SwimRotationCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.SWIM_ROTATOR_CURVE_PATH, UE.CurveFloat), !this.SwimAcceleratorCurve || !this.SwimRotationCurve) || (Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 57, "游泳配置曲线加载失败，曲线为/Game/Aki/Character/Role/Common/Data/Curves/CT_SwimAcceleratorStrength.CT_SwimAcceleratorStrength或者/Game/Aki/Character/Role/Common/Data/Curves/CT_SwimRotateSpeed.CT_SwimRotateSpeed"), false);
  }
  KWr() {
    var t;
    if (this.Gce.HasSwimmingBlock) {
      t = (0, puerts_1.$ref)(undefined);
      this.Gce.CharacterMovement.D_K2_FindFloor(this.fWr.ToUeVector(), t);
      t = (0, puerts_1.$unref)(t);
      if (this.Gce?.CharacterMovement?.IsWalkable(t.HitResult)) {
        return 1;
      } else {
        return 2;
      }
    } else {
      return 0;
    }
  }
  jWr(t = false) {
    var i;
    var s;
    if (this.Lie.HasTag(855966206) || t) {
      t = this.Lie.HasTag(401464757) ? VEHICLE_ADDITIONAL_HEIGHT : 0;
      s = this.Lie.HasTag(401464757) ? VEHICLE_ADDITIONAL_DEPTH : 0;
      i = this.cz;
      this.yV_.Multiply(this.vWr * 2 + t, i);
      t = this.UWr;
      this.fWr.Addition(i, t);
      this.yV_.Multiply(this.vWr + s, i);
      s = this.AWr;
      this.fWr.Subtraction(i, s);
      this.Depth = this.YWr(t, s);
      this.LWr = this.Mao.HitResult.bBlockingHit;
      this.JWr(this.IWr);
    }
  }
  zWr(i) {
    let s = false;
    let e = false;
    this.yWr.Reset();
    this.IWr.Reset();
    this.SWr.Reset();
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.yWr, MIN_DEPTH);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.SWr, MIN_DEPTH);
    let h = MIN_DEPTH;
    let r = MIN_DEPTH;
    var _ = i.GetHitCount();
    for (let t = 0; t < _; ++t) {
      var a = i.Actors.Get(t);
      if (a?.IsValid()) {
        if (a.ActorHasTag(CharacterSwimComponent_1.ZWr)) {
          e = true;
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, t, this.cz);
          if ((a = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.cz)) > r) {
            r = a;
            this.SWr.DeepCopy(this.cz);
          }
        } else {
          s = true;
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, t, this.cz);
          if ((a = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.cz)) > h) {
            h = a;
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(i, t, this.IWr);
            this.yWr.DeepCopy(this.cz);
            this.TWr = i.TimeArray.Get(t);
          }
        }
      }
    }
    if (!e && s) {
      this.SWr.DeepCopy(this.yWr);
    }
    return s;
  }
  HWr() {
    if (this.Gce.FallingIntoWater || this.Lie.HasTag(40422668)) {
      return 1;
    } else if (this.Lie.HasTag(504239013)) {
      return 2;
    } else if (this.Lie.HasTag(-1898186757)) {
      return 3;
    } else {
      return 0;
    }
  }
  eKr(t, i, s = this.Hte.ScaledRadius) {
    var e = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    e.WorldContextObject = this.Hte.Actor;
    e.Radius = s;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, i);
    e.ActorsToIgnore.Empty();
    for (const h of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      e.ActorsToIgnore.Add(h);
    }
    return TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, e, PROFILE_FLOOR, PROFILE_FLOOR);
  }
  tKr(t, i) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, i);
    let s = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Mao, PROFILE_DETECT_WATER_DEPTH);
    s = s && this.zWr(this.Mao.HitResult);
    if (this.Mao.HitResult.bBlockingHit) {
      this.ok_();
    }
    return s && this.Mao.HitResult.bBlockingHit;
  }
  ok_() {
    var s = this.Mao.HitResult.PhysMaterials;
    var t = this.Mao.HitResult.GetHitCount();
    for (let i = 0; i < t; ++i) {
      var e = this.Mao.HitResult.Components.Get(i);
      let t = undefined;
      if (t = (t = e instanceof UE.LandscapeHeightfieldCollisionComponent ? s.Get(i) : UE.KuroCollisionLibrary.GetBodyInstance(this.Mao.HitResult, i).PhysMaterialOverride) || UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(e)) {
        switch (t.GetName()) {
          case "CloudSeaLand":
            this.WaterType = 1;
            break;
          case "GoldWater":
            this.WaterType = 2;
            break;
          default:
            this.WaterType = 0;
        }
        return;
      }
    }
  }
  XWr() {
    var t = this.UWr;
    var i = this.AWr;
    if (this.Lie.HasTag(855966206) && this.Lie.HasTag(-1714966381)) {
      t.DeepCopy(this.fWr);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, t, (1 - ENTER_SWIM_BIGGER_THAN_THIS) * this.vWr * 2);
      i.DeepCopy(this.fWr);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, this.ika);
      if (this.tKr(t, i)) {
        this.Depth = SWIMMING_MAX_DEPTH;
      } else {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 3,
          CustomMode: 0,
          Context: "[CharacterSwimComponent.SimpleCheckInWater]"
        });
        this.Depth = 0;
      }
    } else {
      t.DeepCopy(this.MWr);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, t, this.vWr * 2);
      i.DeepCopy(this.fWr);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, -this.vWr);
      this.Depth = this.YWr(t, i);
      if (this.Depth > ENTER_SWIM_BIGGER_THAN_THIS) {
        this.bWr();
        return true;
      }
    }
    return false;
  }
  iKr(t, i) {
    var s = this.pz;
    s.FromUeVector(t);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, s, i);
    this.xWr.DeepCopy(s);
    this.Hte.SetActorLocation(this.xWr.ToUeVector(), "游泳.游泳入水播放位置设置", true);
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterSwimComponent.SetDetectFallIntoWaterPosition]"
    });
    var t = this.cz;
    t.Reset();
    this.Gce.SetForceSpeed(t);
    if (this.IsDebug) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 57, "[游泳组件]游泳触发入水机制,游泳入水设置位置", ["坐标：", this.xWr], ["强制速度：", t]);
      }
      this.oKr(CharacterSwimUtils.DebugColor1);
    }
  }
  DetectEnterWaterFromAir() {
    if (!(GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorVelocityProxy) > 0) && !this.Gce.FallingIntoWater) {
      var i = this.cz;
      var s = this.fz;
      s.DeepCopy(this.Hte.ActorVelocityProxy);
      s.Multiply(this.mie, s);
      s.Addition(this.fWr, i);
      var s = this.eKr(this.fWr, i);
      if (!s) {
        let t = this.tKr(this.fWr, i);
        var e = this.vWr;
        if (!t) {
          var h = this.fz;
          h.FromUeVector(i);
          GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, h, -e);
          if (s = this.eKr(i, h)) {
            return;
          }
          t = this.tKr(i, h);
        }
        if (t) {
          this.JWr(this.IWr);
          if (!!this.rKr(this.IWr) && !((s = this.UWr).DeepCopy(this.yWr), (i = this.AWr).FromUeVector(s), GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, -this.vWr * ENTER_SWIM_BIGGER_THAN_THIS * 2), this.eKr(s, i))) {
            this.cBe.StopAllSkills("CharacterSwimComponent.DetectEnterWaterFromAir");
            this.iKr(s, e);
            this.Lie.AddTag(-104158548);
            if (h = this.Entity.GetComponent(183)) {
              this.EnterSwimFromAirBuffIndex = h.AddBuffLocal(CharacterBuffIds_1.buffId.FallImmune, {
                InstigatorId: this.Hte.CreatureData.GetCreatureDataId(),
                Duration: 1,
                Reason: "空中入水"
              });
            }
            this.Gce.FallingIntoWater = true;
            this.BWr = Time_1.Time.Now + TIME_CLEAR_ENTER_WATER;
          }
        }
      }
    }
  }
  JWr(t) {
    var i = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, t);
    if (i < 0) {
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, t, -i * 2);
    }
  }
  nKr(t, i, s) {
    t.Subtraction(i, this.cz);
    return !(GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.cz) < 0) && this.YWr(t, i) !== 0 && !(GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.yWr) < s) && !(this.JWr(this.IWr), !this.rKr(this.IWr));
  }
  sKr() {
    if (!this.Gce.FallingIntoWater) {
      this.DetectEnterWaterFromAir();
    }
    var t = this.UWr;
    var i = this.AWr;
    t.DeepCopy(this.fWr);
    GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, t, GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.MWr) + this.vWr);
    i.DeepCopy(this.fWr);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, -this.vWr);
    return !!this.nKr(t, i, GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.fWr)) && (GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, -this.vWr * ENTER_SWIM_BIGGER_THAN_THIS * 2), !this.eKr(t, i, 1)) && (this.bWr(), this.fWr.Subtraction(this.yWr, this.cz), GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.cz) < -this.vWr && this.Hte.SetActorLocation(this.yWr.ToUeVector(), "游泳.入水位置修正", true), this.IsDebug && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 57, "[游泳组件]触发空中入水"), this.oKr(CharacterSwimUtils.DebugColor2)), true);
  }
  aKr() {
    var t = this.UWr;
    var i = this.AWr;
    t.DeepCopy(this.fWr);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, t, this.vWr);
    i.DeepCopy(this.fWr);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, -this.vWr);
    return !!this.nKr(t, i, GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.fWr) + (1 - ENTER_SWIM_BIGGER_THAN_THIS) * this.vWr * 2) && (this.bWr(), this.IsDebug && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 57, "[游泳组件]触发地面入水"), this.oKr(CharacterSwimUtils.DebugColor2)), true);
  }
  lKr() {
    var t;
    return this.RWr.GetTsClimbState().攀爬状态 !== 3 && ((t = this.cz).DeepCopy(this.yV_), t.Multiply(this.vWr, t), this.MWr.Addition(t, this.UWr), this.fWr.Subtraction(t, this.AWr), !!this.nKr(this.UWr, this.AWr, GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.fWr) + CLIMB_CHECK_ENTER_WATER_RATE * this.vWr)) && !this.eKr(this.UWr, this.AWr, 1) && (this.bWr(), this.IsDebug && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 57, "[游泳组件]触发攀爬入水"), this.oKr(CharacterSwimUtils.DebugColor2)), true);
  }
  CheckUpWaterSurface() {
    var t = this.UWr;
    this.yV_.Multiply(this.ika, t);
    t.Addition(this.fWr, t);
    var i = this.AWr;
    this.yV_.Multiply(this.vWr, i);
    i.Addition(this.fWr, i);
    var t = this.nKr(t, i, GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, i));
    if (t && this.eKr(i, this.yWr)) {
      var i = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
      TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i.HitResult, 0, this.cz);
      var i = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.cz);
      TraceElementCommon_1.TraceElementCommon.GetImpactPoint(this.Mao.HitResult, 0, this.cz);
      var s = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.cz);
      if (i < s) {
        this.FWr();
        return false;
      }
    }
    return t;
  }
  uKr() {
    var t = this.CheckUpWaterSurface();
    if (t && (this.bWr(), this.IsDebug)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 57, "[游泳组件]触发保底的向上探测入水");
      }
      this.oKr(CharacterSwimUtils.DebugColor2);
    }
    return t;
  }
  VWr(t) {
    if (this.Gce.FallingIntoWater && Time_1.Time.Now > this.BWr && (this.Gce.FallingIntoWater = false, this.Lie.RemoveTag(-104158548), this.EnterSwimFromAirBuffIndex)) {
      this.Entity.GetComponent(183)?.RemoveBuffByHandle(this.EnterSwimFromAirBuffIndex, -1, "空中入水结束");
      this.EnterSwimFromAirBuffIndex = 0;
    }
    let i = false;
    switch (t) {
      case 0:
        i = false;
        break;
      case 1:
        i = this.sKr();
        break;
      case 2:
        i = this.lKr();
        break;
      case 3:
        i = this.aKr();
    }
    return i = t !== 0 ? i || this.uKr() : i;
  }
  WWr(t) {
    var i;
    if (this.Gce.CharacterMovement.MovementMode === 6 && this.Gce.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM) {
      i = this.Lie.HasTag(388142570);
      this.SprintSwimOffset = i ? this.PWr.SprintZOffsetRate * this.Hte.Radius : 0;
      this.Gce.FallingIntoWater = false;
    }
  }
  rKr(t) {
    return MathUtils_1.MathUtils.DotProduct(t, this.Gce.GravityUp) > COS_EIGHTY;
  }
  uWr() {
    this.BuffIndex = 0;
    this.SprintSwimOffset = 0;
  }
  QWr() {
    if (this.Lie.HasTag(855966206)) {
      if (this.LWr && !this.rKr(this.IWr)) {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 3,
          CustomMode: 0,
          Context: "[CharacterSwimComponent.CheckSwimState] 1"
        });
        if (this.IsDebug) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Movement", 57, "[游泳组件]触发水面角度不够游泳支持触发出水", ["水面法线:", this.IWr]);
          }
          this.oKr(CharacterSwimUtils.DebugColor3);
        }
      } else if (this.LWr || this.Gce.FallingIntoWater) {
        if (this.Depth <= exports.LEAVE_SWIM_LESS_THAN_THIS) {
          if (this.EWr === 1) {
            this.Hte?.Actor.KuroSetMovementMode({
              Mode: 1,
              CustomMode: 0,
              Context: "[CharacterSwimComponent.CheckSwimState] 3"
            });
            if (this.IsDebug) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Movement", 57, "[游泳组件]触发碰撞并且游泳深度不够触发出水", ["当前深度:", this.Depth], ["出水深度:", exports.LEAVE_SWIM_LESS_THAN_THIS]);
              }
              this.oKr(CharacterSwimUtils.DebugColor3);
            }
          } else if (this.EWr === 2) {
            this.Hte?.SetActorLocation(this.Hte.LastActorLocation.ToUeVector(), "SwimOff", false);
          }
        }
      } else if (this.CheckUpWaterSurface()) {
        this.Depth = SWIMMING_MAX_DEPTH;
      } else {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 1,
          CustomMode: 0,
          Context: "[CharacterSwimComponent.CheckSwimState] 2"
        });
        this.uWr();
        if (this.IsDebug) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Movement", 57, "[游泳组件]游泳向上探测出水未有水面触发出水");
          }
          this.oKr(CharacterSwimUtils.DebugColor3);
        }
      }
    }
  }
  CheckCanEnterClimbFromSwim() {
    return !this.Lie.HasTag(855966206) || this.Depth <= CLIMB_CHECK_ENTER_WATER_RATE;
  }
  YWr(t, i) {
    if (this.tKr(t, i)) {
      if (this.IsDebug) {
        this.cKr(this.yWr.ToUeVector(), CharacterSwimUtils.DebugColor2);
      }
      t.Subtraction(i, this.pz);
      return GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.pz) * (1 - this.TWr) / (this.vWr * 2);
    } else {
      return 0;
    }
  }
  _Wr() {
    var t;
    if (this.I5r?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water && this.Lie.HasTag(-290630940)) {
      t = this.Gce.HasMoveInput;
      t = ConfigManager_1.ConfigManager.SwimConfig.GetSwimBuffId(t, this.lWr);
      this.BuffIndex = t;
    } else {
      this.BuffIndex = 0;
    }
  }
  FWr() {
    if (this.yWr) {
      this.yWr.Reset();
    }
    if (this.IWr) {
      this.IWr.Reset();
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.IWr, MIN_DEPTH);
    }
    if (this.SWr) {
      this.SWr.Reset();
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.SWr, MIN_DEPTH);
    }
  }
  GetWaterLocation() {
    return this.SWr.ToUeVector();
  }
  GetSwimLocation() {
    return this.yWr.ToUeVector();
  }
  GetWaterVolume() {
    return this.LWr;
  }
  SetEnterWaterState(t) {
    this.CWr = t ? 1 : 0;
  }
  GetAboveFootWaterSurfaceInfo() {
    var t;
    var i;
    var s;
    var e;
    if (this.Hte?.SkeletalMesh && this.uDn() && !(this.Depth <= 0) && this.IWr && this.Depth !== SWIMMING_MAX_DEPTH) {
      t = this.Depth * this.vWr * 2;
      this.JWr(this.IWr);
      i = Vector_1.Vector.Create(this.IWr);
      (s = Vector_1.Vector.Create()).FromUeVector(this.Hte.SkeletalMesh.D_K2_GetComponentLocation());
      e = Vector_1.Vector.Create(this.Hte.ActorVelocityProxy);
      return {
        Depth: this.Depth,
        WaterHeight: t,
        SurfaceNormal: i,
        Velocity: e,
        Location: s
      };
    }
  }
  oKr(t) {
    UE.KismetSystemLibrary.D_DrawDebugCapsule(this.Hte.Actor, this.Hte.Actor.D_K2_GetActorLocation(), this.Hte.Actor.CapsuleComponent.CapsuleHalfHeight, this.Hte.Actor.CapsuleComponent.CapsuleRadius, this.Hte.Actor.K2_GetActorRotation(), t, 5, 2);
  }
  cKr(t, i) {
    UE.KismetSystemLibrary.D_DrawDebugSphere(this.Hte.Actor, t, this.Hte.Actor.CapsuleComponent.CapsuleHalfHeight, 12, i, 0, 1);
  }
  SetDebug(t) {
    this.IsDebug = t;
    this.Mao.SetDrawDebugTrace(this.IsDebug ? 2 : 0);
  }
  LogSwimTriggerCount() {
    if (this.IsDebug && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 57, "[游泳组件] 当前进入游泳盒子数量:", ["actor", this.Hte?.Actor?.GetName()], ["count", this.InSwimTriggerCount]);
    }
  }
};
CharacterSwimComponent.ZWr = new UE.FName("Water_No_Swim");
CharacterSwimComponent.UseSwimTrigger = false;
CharacterSwimComponent = CharacterSwimComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(80)], CharacterSwimComponent);
exports.CharacterSwimComponent = CharacterSwimComponent; //# sourceMappingURL=CharacterSwimComponent.js.map