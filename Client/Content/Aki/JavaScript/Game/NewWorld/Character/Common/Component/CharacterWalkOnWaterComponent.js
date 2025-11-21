"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var r = arguments.length;
  var a = r < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, s);
  } else {
    for (var _ = t.length - 1; _ >= 0; _--) {
      if (h = t[_]) {
        a = (r < 3 ? h(a) : r > 3 ? h(i, e, a) : h(i, e)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterWalkOnWaterComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
const MAX_BYTE = 255;
const EIGHTY = 80;
const COS_EIGHTY = 0.173;
const PROFILE_DETECT_WATER_DEPTH = "CharacterWalkOnWaterComponent_DetectWaterDepth";
const PROFILE_DETECT_WATER_UP_BLOCK = "CharacterWalkOnWaterComponent_WaterUpBlock";
const ENTER_WALK_ON_WATER_DEPTH = 4;
const PRE_FRAME_POSITION_MAX_DISTANCE = 1000;
const UP_TO_WATER_SURFACE_SPEED = 500;
const CHECK_IN_GROUND_INTERVAL = 1000;
const FIVE_HUNDRED_TO_FIND_SURFACE = 1000;
const WALK_ON_WATER_HALF_HEIGHT_OFFSET = 3;
const WALK_ON_WATER_RADIUS_OFFSET = 20;
const WALK_ON_WATER_MOVEDIR_OFFSET = 3;
const MODEL_BUFFER_TIME_LENGTH = 300;
const SHALLOW_WATER_THRESOLD = 1.5;
class CharacterSwimUtils {}
CharacterSwimUtils.AfterTransformLocationOffset = new UE.Vector(EIGHTY, 0, 0);
CharacterSwimUtils.DebugColor1 = new UE.LinearColor(MAX_BYTE, MAX_BYTE, 0, 1);
CharacterSwimUtils.DebugColor2 = new UE.LinearColor(0, MAX_BYTE, 0, 1);
CharacterSwimUtils.DebugColor3 = new UE.LinearColor(MAX_BYTE, 0, 0, 1);
CharacterSwimUtils.DebugColor4 = new UE.LinearColor(0, MAX_BYTE, MAX_BYTE, 1);
let CharacterWalkOnWaterComponent = class CharacterWalkOnWaterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.IsDebug = false;
    this.Pq1 = undefined;
    this.Mao = undefined;
    this.vao = undefined;
    this.pKr = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.Gce = undefined;
    this.mBe = undefined;
    this.vKr = undefined;
    this.IsActive = false;
    this.vWr = 0;
    this.cz = undefined;
    this.fz = undefined;
    this.UWr = undefined;
    this.AWr = undefined;
    this.MKr = 0;
    this.EKr = 0;
    this.SKr = undefined;
    this.yKr = undefined;
    this.WalkOnWaterStage = 0;
    this.WaterDepthType = 0;
    this.IKr = undefined;
    this.Iwu = false;
    this.Twu = undefined;
    this.wDu = 0;
    this.d6a = new Set();
    this.sxr = 0;
    this.XOr = (t, i) => {
      if (this.WalkOnWaterStage === 1 && this.TKr(i) > 0) {
        this.Gce.CharacterMovement.MaxCustomMovementSpeed = this.TKr(i);
      }
    };
    this.LKr = t => {
      this.Gce.CharacterMovement.KuroFlying(t, 0, 0, 0, this.Gce.CurrentMovementSettings.Acceleration, this.TKr(this.mBe.MoveState), 1);
    };
    this.I3r = t => {
      if (t?.Valid) {
        this.IsActive = this.Lie.HasTag(-1523054094);
        if (!this.IsActive) {
          this.DKr(0);
          this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None);
        }
      }
    };
    this.RKr = (t, i) => {
      if (i) {
        if (this.sxr) {
          this.Enable(this.sxr, "不会入水Tag");
          this.sxr = 0;
        }
      } else {
        this.sxr ||= this.Disable("不会入水Tag");
      }
      if (!(this.IsActive = i)) {
        this.DKr(0);
        this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None);
      }
    };
    this.DVr = (t, i) => {
      if (this.IsActive && i === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
        if (this.UKr() || this.AKr() || this._Kr()) {
          this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface);
        } else {
          this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterGround");
          }
        }
      }
    };
    this.T1u = (t, i, e, s) => {
      this.vWr = e + WALK_ON_WATER_HALF_HEIGHT_OFFSET;
    };
    this.Ilt = t => {
      if (this.IsActive && this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && (this.UKr() || this.AKr() || this._Kr())) {
        this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface);
      }
    };
    this.PKr = -0;
    this.xKr = -0;
    this.wKr = CHECK_IN_GROUND_INTERVAL;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Entity.GetComponent(209);
    if (!t?.Valid) {
      return false;
    }
    this.Lie = t;
    t = this.Entity.GetComponent(182);
    return !!t?.Valid && (this.WalkOnWaterStage = 0, this.Gce = t, this.mBe = this.Entity.GetComponent(179), this.vWr = this.Hte.HalfHeight + WALK_ON_WATER_HALF_HEIGHT_OFFSET, this.qWr(), this.k_(), this.ewr(), this.IKr = this.Hte.Actor.CapsuleComponent.GetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater), true);
  }
  OnEnd() {
    this.BKr();
    this.$Wr();
    return true;
  }
  OnDisable(t) {
    this.DKr(0);
    this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None);
  }
  k_() {
    this.RKr(-1523054094, this.Lie.HasTag(-1523054094));
    this.vKr = this.Lie.ListenForTagAddOrRemove(-1523054094, this.RKr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.XOr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveWalkOnWater, this.LKr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterCapsuleChanged, this.T1u);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  BKr() {
    this.vKr.EndTask();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveWalkOnWater, this.LKr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.XOr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterCapsuleChanged, this.T1u);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  qWr() {
    this.cz = Vector_1.Vector.Create(0, 0, 0);
    this.fz = Vector_1.Vector.Create(0, 0, 0);
    this.UWr = Vector_1.Vector.Create(0, 0, 0);
    this.AWr = Vector_1.Vector.Create(0, 0, 0);
    this.yKr = Vector_1.Vector.Create(0, 0, 0);
  }
  $Wr() {
    this.cz = undefined;
    this.fz = undefined;
    this.SKr = undefined;
    this.UWr = undefined;
    this.AWr = undefined;
    this.yKr = undefined;
  }
  static get Dependencies() {
    return [3, 182, 209];
  }
  ewr() {
    this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Mao.WorldContextObject = this.Hte.Actor;
    this.Mao.Radius = 3;
    this.Mao.bIgnoreSelf = true;
    this.Mao.bIsSingle = true;
    this.Mao.SetDrawDebugTrace(this.IsDebug ? 1 : 0);
    this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.Mao, CharacterSwimUtils.DebugColor3);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.Mao, CharacterSwimUtils.DebugColor4);
    this.pKr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.pKr.WorldContextObject = this.Hte.Actor;
    this.pKr.Radius = this.Hte.Radius + WALK_ON_WATER_RADIUS_OFFSET;
    this.pKr.bIgnoreSelf = true;
    this.pKr.bIsSingle = true;
    this.pKr.SetDrawDebugTrace(this.IsDebug ? 1 : 0);
    this.pKr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.pKr, CharacterSwimUtils.DebugColor1);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.pKr, CharacterSwimUtils.DebugColor2);
    this.Pq1 = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.Pq1.WorldContextObject = this.Hte.Actor;
    this.Pq1.bIgnoreSelf = true;
    this.Pq1.bIsSingle = true;
    this.Pq1.SetDrawDebugTrace(this.IsDebug ? 1 : 0);
    this.Pq1.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.Pq1, CharacterSwimUtils.DebugColor3);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.Pq1, CharacterSwimUtils.DebugColor4);
    this.vao = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.vao.WorldContextObject = this.Hte.Actor;
    this.vao.Radius = 3;
    this.vao.bIgnoreSelf = true;
    this.vao.bIsSingle = false;
    this.vao.SetDrawDebugTrace(this.IsDebug ? 1 : 0);
    this.vao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.vao, CharacterSwimUtils.DebugColor1);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.vao, CharacterSwimUtils.DebugColor2);
  }
  TKr(t) {
    switch (t) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
        return this.Gce.WalkSpeed;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
        return this.Gce.RunSpeed;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
        return this.Gce.SprintSpeed;
      default:
        return 0;
    }
  }
  BlockMoveModeInherit(t) {
    return !this.Lie.HasTag(-1523054094) && t.MovementMode === 6 && t.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER;
  }
  rKr(t) {
    return Math.abs(MathUtils_1.MathUtils.DotProduct(t, this.Hte.ActorUpProxy)) > COS_EIGHTY;
  }
  _Kr() {
    var t = this.UWr;
    this.Hte.ActorUpProxy.Multiply(FIVE_HUNDRED_TO_FIND_SURFACE, t);
    this.Hte.ActorLocationProxy.Addition(t, t);
    var i = this.AWr;
    this.Hte.ActorUpProxy.Multiply(-this.vWr, i);
    this.Hte.ActorLocationProxy.Subtraction(i, i);
    var e = this.nKr(t, i);
    if (e) {
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Pq1, i);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Pq1, t);
      i = this.cz;
      t = TraceElementCommon_1.TraceElementCommon.LineTrace(this.Pq1, PROFILE_DETECT_WATER_UP_BLOCK);
      if (t && this.Pq1.HitResult.bBlockingHit) {
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Pq1.HitResult, 0, i);
        this.wDu = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, i);
        if (this.wDu - GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.FloorLocation) < this.MKr) {
          return false;
        }
      }
    }
    return e;
  }
  UKr() {
    var t = this.UWr;
    var i = this.AWr;
    if (this.SKr && this.WalkOnWaterStage === 0 && Vector_1.Vector.Dist(this.SKr, this.Hte.ActorLocationProxy) < PRE_FRAME_POSITION_MAX_DISTANCE) {
      const s = this.cz;
      this.Hte.ActorUpProxy.Multiply(this.vWr - WALK_ON_WATER_HALF_HEIGHT_OFFSET, s);
      var e = this.fz;
      this.Hte.ActorLocationProxy.Subtraction(this.SKr, e);
      e.Normalize();
      e.Multiply(WALK_ON_WATER_MOVEDIR_OFFSET, e);
      this.SKr.Subtraction(s, t);
      t.SubtractionEqual(e);
      this.Hte.ActorLocationProxy.Subtraction(s, i);
      i.AdditionEqual(e);
    } else {
      const s = this.cz;
      this.Hte.ActorUpProxy.Multiply(this.vWr, s);
      this.Hte.ActorLocationProxy.Addition(s, t);
      this.Hte.ActorLocationProxy.Subtraction(s, i);
    }
    return this.nKr(t, i);
  }
  AKr() {
    var t = this.cz;
    this.Hte.ActorUpProxy.Multiply(this.vWr, t);
    var i = this.UWr;
    this.Hte.ActorLocationProxy.Addition(t, i);
    var e = this.AWr;
    this.Hte.ActorLocationProxy.Subtraction(t, e);
    return this.bKr(i, e);
  }
  nKr(t, i) {
    this.MKr = this.YWr(t, i);
    return this.MKr !== 0 && (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(this.Mao.HitResult, 0, this.yKr), !!this.rKr(this.yKr));
  }
  YWr(t, i) {
    var t = this.tKr(t, i);
    var i = this.cz;
    if (t && this.Mao.HitResult.bBlockingHit && (TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Mao.HitResult, 0, i), this.wDu = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, i), (t = this.wDu - GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.FloorLocation)) > 0)) {
      return t;
    } else {
      return 0;
    }
  }
  qKr(t) {
    var i;
    var e;
    if (!(this.MKr < ENTER_WALK_ON_WATER_DEPTH)) {
      this.xKr += t * TimeUtil_1.TimeUtil.Millisecond;
      (t = this.cz).DeepCopy(this.Hte.ActorLocationProxy);
      i = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorLocationProxy);
      e = MathUtils_1.MathUtils.Clamp(this.PKr + this.xKr * UP_TO_WATER_SURFACE_SPEED, this.PKr, i + this.MKr - 1);
      t.AdditionEqual(this.Hte.ActorUpProxy.Multiply(e - i, this.fz));
      this.Hte.SetActorLocation(t.ToUeVector(), "修正在水中的Z轴");
    }
  }
  GKr() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterUpToWalkOnWater");
    }
    this.cz.DeepCopy(this.Hte.ActorVelocityProxy);
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.cz);
    this.Hte.SetActorVelocity(this.cz);
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER,
      Context: "[CharacterWalkOnWaterComponent.EnterUpToWalkOnWater]"
    });
    this.xKr = 0;
    this.PKr = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorLocationProxy);
    this.EKr = this.Gce.CharacterMovement.MaxCustomMovementSpeed;
  }
  NKr() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 36, "[WalkOnWater] ExitUpToWalkOnWater");
    }
    this.Gce.CharacterMovement.MaxCustomMovementSpeed = this.EKr;
  }
  OKr() {
    this.cz.DeepCopy(this.Hte.ActorVelocityProxy);
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.cz);
    this.Hte.SetActorVelocity(this.cz);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterWalkOnWater");
    }
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 1,
      Context: "[CharacterWalkOnWaterComponent.EnterWalkOnWater]"
    });
    this.EnableOrDisableWalkOnWater(true, "CharWalkOnWaterComp");
  }
  kKr(t = false) {
    if (t && this._Kr()) {
      this.qKr(TimeUtil_1.TimeUtil.InverseMillisecond);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 36, "[WalkOnWater] ExitWalkOnWater");
    }
    this.EnableOrDisableWalkOnWater(false, "CharWalkOnWaterComp");
  }
  tKr(t, i) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, i);
    return TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Mao, PROFILE_DETECT_WATER_DEPTH) && this.Mao.HitResult.bBlockingHit;
  }
  bKr(t, i) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.pKr, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.pKr, i);
    return TraceElementCommon_1.TraceElementCommon.SphereTrace(this.pKr, PROFILE_DETECT_WATER_DEPTH) && this.pKr.HitResult.bBlockingHit;
  }
  DKr(t) {
    if (this.Iwu) {
      this.Twu = t;
    } else if (this.WalkOnWaterStage !== t && this.FKr(t) && (this.Iwu = true, this.VKr(this.WalkOnWaterStage), this.HKr(t), this.Iwu = false, this.Twu !== undefined) && this.Twu !== this.WalkOnWaterStage) {
      this.VKr(t);
      this.HKr(this.Twu);
      this.Twu = undefined;
    }
  }
  FKr(t) {
    return true;
  }
  HKr(t) {
    switch (this.WalkOnWaterStage = t) {
      case 1:
        this.GKr();
        break;
      case 2:
        this.OKr();
        break;
      case 0:
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterNone");
        }
        this.ADu(0);
        if (this.Gce.CharacterMovement.MovementMode !== 5 && (this.Gce.CharacterMovement.MovementMode !== 6 || this.Gce.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE) && !this.Hte?.Actor.OnMovementModeChanged) {
          this.Hte?.Actor.KuroSetMovementMode({
            Mode: 3,
            Context: "[CharacterWalkOnWaterComponent.EnterStage]"
          });
        }
    }
  }
  VKr(t) {
    switch (t) {
      case 1:
        this.NKr();
        break;
      case 2:
        this.kKr(!this.IsActive);
        break;
      case 0:
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 36, "[WalkOnWater] ExitNone");
        }
        this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface);
    }
  }
  jKr(t) {
    if (this.WalkOnWaterStage === 1) {
      this.qKr(t);
    }
  }
  OnTick(i) {
    if (this.IsActive) {
      let t = 0;
      if (this.UKr()) {
        t = this.MKr < ENTER_WALK_ON_WATER_DEPTH ? 2 : 1;
      } else if (this._Kr()) {
        t = 1;
      } else if (this.WalkOnWaterStage !== 0) {
        t = this.AKr() ? 2 : 0;
      }
      this.DKr(t);
      this.jKr(i);
      if (this.WalkOnWaterStage === 0) {
        this.SKr ||= Vector_1.Vector.Create(0, 0, 0);
        this.SKr.DeepCopy(this.Hte.ActorLocationProxy);
        this.wKr -= i;
        if (this.wKr < 0 && (this.wKr = CHECK_IN_GROUND_INTERVAL, this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) && this.mBe?.PositionSubState === CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface && (this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterGround");
        }
      } else {
        this.PDu();
      }
    }
  }
  PDu() {
    var t = this.UWr;
    t.DeepCopy(this.Hte.ActorLocationProxy);
    if (this.wDu > GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, t) - this.Hte.HalfHeight) {
      i = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorLocationProxy);
      t.AdditionEqual(this.Hte.ActorUpProxy.Multiply(this.wDu - i, this.fz));
    } else {
      t.AdditionEqual(this.Hte.ActorUpProxy.Multiply(-this.Hte.HalfHeight, this.fz));
    }
    var i = this.AWr;
    var e = this.cz;
    this.Hte.ActorUpProxy.Multiply(this.vWr * SHALLOW_WATER_THRESOLD, e);
    t.Subtraction(e, i);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.vao, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.vao, i);
    var e = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.vao, PROFILE_DETECT_WATER_DEPTH);
    var s = this.fz;
    if (e && this.vao.HitResult.bBlockingHit) {
      var h = this.vao.HitResult.GetHitCount();
      let i = false;
      let e = Number.NEGATIVE_INFINITY;
      var r = this.vao.HitResult.Actors;
      var a = this.vao.HitResult.Components;
      for (let t = 0; t < h; t++) {
        var _ = r.Get(t);
        var n = a.Get(t);
        if (!!_ && (!_.bHidden || !!n.bCanCharacterStandOn)) {
          i = true;
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.vao.HitResult, t, s);
          if ((_ = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, s)) > e) {
            e = _;
          }
        }
      }
      if (i) {
        this.ADu(e > this.wDu ? 0 : 1);
      } else {
        this.ADu(2);
      }
    } else {
      this.ADu(2);
    }
  }
  xDu(t, i) {
    let e = undefined;
    if (t === 1) {
      e = -1686770584;
    } else if (t === 2) {
      e = 320899740;
    }
    if (e) {
      if (i) {
        this.Lie?.AddTag(e);
      } else {
        this.Lie?.RemoveTag(e);
      }
    }
  }
  ADu(t) {
    if (this.WaterDepthType !== t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 36, "[WalkOnWater] SetWaterDepthType", ["preType", this.WaterDepthType], ["newType", t]);
      }
      this.xDu(this.WaterDepthType, false);
      this.WaterDepthType = t;
      this.xDu(t, true);
    }
  }
  EnableOrDisableWalkOnWater(t, i, e = false) {
    if (t) {
      if (!this.d6a.has(i)) {
        if (this.d6a.size === 0 && (this.Hte.Actor.CapsuleComponent?.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater, 2), e) && ([t, e] = this.Hte.FixActorLocation(0, true, this.Hte.ActorLocationProxy, "WalkOnWater", true, false), t)) {
          if (t = this.Entity.GetComponent(181)) {
            t.SetLocationAndRotatorWithModelBuffer(e.ToUeVector(), this.Hte.ActorRotation, MODEL_BUFFER_TIME_LENGTH, "WalkOnWater.FixLocation", 2, false);
          } else {
            this.Hte.SetActorLocation(e.ToUeVector(), "WalkOnWater.FixLocation", false);
          }
        }
        this.d6a.add(i);
      }
    } else {
      this.d6a.delete(i);
      if (this.d6a.size === 0) {
        this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater, this.IKr ?? 1);
      }
    }
  }
};
CharacterWalkOnWaterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(79)], CharacterWalkOnWaterComponent);
exports.CharacterWalkOnWaterComponent = CharacterWalkOnWaterComponent; //# sourceMappingURL=CharacterWalkOnWaterComponent.js.map