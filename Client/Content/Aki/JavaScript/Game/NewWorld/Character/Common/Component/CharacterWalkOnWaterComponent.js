"use strict";
var __decorate = this && this.__decorate || function(t, e, i, s) {
  var h, r = arguments.length,
    _ = r < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) _ = Reflect.decorate(t, e, i, s);
  else
    for (var a = t.length - 1; 0 <= a; a--)(h = t[a]) && (_ = (r < 3 ? h(_) : 3 < r ? h(e, i, _) : h(e, i)) || _);
  return 3 < r && _ && Object.defineProperty(e, i, _), _
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterWalkOnWaterComponent = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  MAX_BYTE = 255,
  EIGHTY = 80,
  COS_EIGHTY = .173,
  PROFILE_DETECT_WATER_DEPTH = "CharacterWalkOnWaterComponent_DetectWaterDepth",
  PROFILE_DETECT_WATER_UP_BLOCK = "CharacterWalkOnWaterComponent_WaterUpBlock",
  ENTER_WALK_ON_WATER_DEPTH = 4,
  PRE_FRAME_POSITION_MAX_DISTANCE = 1e3,
  UP_TO_WATER_SURFACE_SPEED = 500,
  CHECK_IN_GROUND_INTERVAL = 1e3,
  FIVE_HUNDRED_TO_FIND_SURFACE = 1e3,
  WALK_ON_WATER_HALF_HEIGHT_OFFSET = 3,
  WALK_ON_WATER_RADIUS_OFFSET = 20,
  WALK_ON_WATER_MOVEDIR_OFFSET = 3,
  MODEL_BUFFER_TIME_LENGTH = 300,
  SHALLOW_WATER_THRESOLD = 1.5;
class CharacterSwimUtils {}
CharacterSwimUtils.AfterTransformLocationOffset = new UE.Vector(EIGHTY, 0, 0), CharacterSwimUtils.DebugColor1 = new UE.LinearColor(MAX_BYTE, MAX_BYTE, 0, 1), CharacterSwimUtils.DebugColor2 = new UE.LinearColor(0, MAX_BYTE, 0, 1), CharacterSwimUtils.DebugColor3 = new UE.LinearColor(MAX_BYTE, 0, 0, 1), CharacterSwimUtils.DebugColor4 = new UE.LinearColor(0, MAX_BYTE, MAX_BYTE, 1);
let CharacterWalkOnWaterComponent = class CharacterWalkOnWaterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.IsDebug = !1, this.eq1 = void 0, this.Mao = void 0, this.vao = void 0, this.pKr = void 0, this.Hte = void 0, this.Lie = void 0, this.Gce = void 0, this.mBe = void 0, this.vKr = void 0, this.IsActive = !1, this.vWr = 0, this.cz = void 0, this.fz = void 0, this.UWr = void 0, this.AWr = void 0, this.MKr = 0, this.EKr = 0, this.SKr = void 0, this.yKr = void 0, this.WalkOnWaterStage = 0, this.WaterDepthType = 0, this.IKr = void 0, this.Pdu = !1, this.xdu = void 0, this.Rmu = 0, this.d6a = new Set, this.XOr = (t, e) => {
      1 === this.WalkOnWaterStage && 0 < this.TKr(e) && (this.Gce.CharacterMovement.MaxCustomMovementSpeed = this.TKr(e))
    }, this.LKr = t => {
      this.Gce.CharacterMovement.KuroFlying(t, 0, 0, 0, this.Gce.CurrentMovementSettings.Acceleration, this.TKr(this.mBe.MoveState), 1)
    }, this.I3r = t => {
      t?.Valid && (this.IsActive = this.Lie.HasTag(-1523054094), this.IsActive || (this.DKr(0), this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None)))
    }, this.RKr = (t, e) => {
      (this.IsActive = e) || (this.DKr(0), this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None))
    }, this.DVr = (t, e) => {
      this.IsActive && e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && (this.UKr() || this.AKr() || this._Kr() ? this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface) : (this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterGround")))
    }, this.xnu = (t, e, i) => {
      this.vWr = i + WALK_ON_WATER_HALF_HEIGHT_OFFSET
    }, this.Ilt = (t, e) => {
      this.IsActive && this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && (this.UKr() || this.AKr() || this._Kr()) && this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface)
    }, this.PKr = -0, this.xKr = -0, this.wKr = CHECK_IN_GROUND_INTERVAL
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Entity.GetComponent(205);
    if (!t?.Valid) return !1;
    this.Lie = t;
    t = this.Entity.GetComponent(178);
    return !!t?.Valid && (this.WalkOnWaterStage = 0, this.Gce = t, this.mBe = this.Entity.GetComponent(175), this.vWr = this.Hte.HalfHeight + WALK_ON_WATER_HALF_HEIGHT_OFFSET, this.qWr(), this.k_(), this.ewr(), this.IKr = this.Hte.Actor.CapsuleComponent.GetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater), !0)
  }
  OnEnd() {
    return this.BKr(), this.$Wr(), !0
  }
  k_() {
    this.vKr = this.Lie.ListenForTagAddOrRemove(-1523054094, this.RKr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.XOr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveWalkOnWater, this.LKr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterCapsuleChanged, this.xnu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt)
  }
  BKr() {
    this.vKr.EndTask(), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveWalkOnWater, this.LKr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.XOr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterCapsuleChanged, this.xnu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt)
  }
  qWr() {
    this.cz = Vector_1.Vector.Create(0, 0, 0), this.fz = Vector_1.Vector.Create(0, 0, 0), this.UWr = Vector_1.Vector.Create(0, 0, 0), this.AWr = Vector_1.Vector.Create(0, 0, 0), this.yKr = Vector_1.Vector.Create(0, 0, 0)
  }
  $Wr() {
    this.cz = void 0, this.fz = void 0, this.SKr = void 0, this.UWr = void 0, this.AWr = void 0, this.yKr = void 0
  }
  static get Dependencies() {
    return [3, 178, 205]
  }
  ewr() {
    this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass()), this.Mao.WorldContextObject = this.Hte.Actor, this.Mao.Radius = 3, this.Mao.bIgnoreSelf = !0, this.Mao.bIsSingle = !0, this.Mao.SetDrawDebugTrace(this.IsDebug ? 1 : 0), this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water), TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.Mao, CharacterSwimUtils.DebugColor3), TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.Mao, CharacterSwimUtils.DebugColor4), this.pKr = UE.NewObject(UE.TraceSphereElement.StaticClass()), this.pKr.WorldContextObject = this.Hte.Actor, this.pKr.Radius = this.Hte.Radius + WALK_ON_WATER_RADIUS_OFFSET, this.pKr.bIgnoreSelf = !0, this.pKr.bIsSingle = !0, this.pKr.SetDrawDebugTrace(this.IsDebug ? 1 : 0), this.pKr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water), TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.pKr, CharacterSwimUtils.DebugColor1), TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.pKr, CharacterSwimUtils.DebugColor2), this.eq1 = UE.NewObject(UE.TraceLineElement.StaticClass()), this.eq1.WorldContextObject = this.Hte.Actor, this.eq1.bIgnoreSelf = !0, this.eq1.bIsSingle = !0, this.eq1.SetDrawDebugTrace(this.IsDebug ? 1 : 0), this.eq1.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible), TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.eq1, CharacterSwimUtils.DebugColor3), TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.eq1, CharacterSwimUtils.DebugColor4), this.vao = UE.NewObject(UE.TraceSphereElement.StaticClass()), this.vao.WorldContextObject = this.Hte.Actor, this.vao.Radius = 3, this.vao.bIgnoreSelf = !0, this.vao.bIsSingle = !1, this.vao.SetDrawDebugTrace(this.IsDebug ? 1 : 0), this.vao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround), TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.vao, CharacterSwimUtils.DebugColor1), TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.vao, CharacterSwimUtils.DebugColor2)
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
        return 0
    }
  }
  BlockMoveModeInherit(t) {
    return !this.Lie.HasTag(-1523054094) && 6 === t.MovementMode && t.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER
  }
  rKr(t) {
    return MathUtils_1.MathUtils.DotProduct(t, Vector_1.Vector.ZAxisVector) > COS_EIGHTY
  }
  JWr(t) {
    t.Z = Math.abs(t.Z)
  }
  _Kr() {
    var t = this.UWr,
      e = (t.X = 0, t.Y = 0, t.Z = FIVE_HUNDRED_TO_FIND_SURFACE, this.Hte.ActorLocationProxy.Addition(t, t), this.AWr),
      i = (this.Hte.ActorUpProxy.Multiply(-this.vWr, e), this.Hte.ActorLocationProxy.Subtraction(e, e), this.nKr(t, e));
    if (i) {
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.eq1, e), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.eq1, t);
      e = this.cz, t = TraceElementCommon_1.TraceElementCommon.LineTrace(this.eq1, PROFILE_DETECT_WATER_UP_BLOCK);
      if (t && this.eq1.HitResult.bBlockingHit)
        if (TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.eq1.HitResult, 0, e), this.Rmu = e.Z, e.Z - (this.Hte.ActorLocationProxy.Z - this.Hte.HalfHeight) < this.MKr) return !1
    }
    return i
  }
  UKr() {
    var t = this.UWr,
      e = this.AWr;
    if (this.SKr && 0 === this.WalkOnWaterStage && Vector_1.Vector.Dist(this.SKr, this.Hte.ActorLocationProxy) < PRE_FRAME_POSITION_MAX_DISTANCE) {
      const s = this.cz;
      this.Hte.ActorUpProxy.Multiply(this.vWr - WALK_ON_WATER_HALF_HEIGHT_OFFSET, s);
      var i = this.fz;
      this.Hte.ActorLocationProxy.Subtraction(this.SKr, i), i.Normalize(), i.Multiply(WALK_ON_WATER_MOVEDIR_OFFSET, i), this.SKr.Subtraction(s, t), t.SubtractionEqual(i), this.Hte.ActorLocationProxy.Subtraction(s, e), e.AdditionEqual(i)
    } else {
      const s = this.cz;
      this.Hte.ActorUpProxy.Multiply(this.vWr, s), this.Hte.ActorLocationProxy.Addition(s, t), this.Hte.ActorLocationProxy.Subtraction(s, e)
    }
    return this.nKr(t, e)
  }
  AKr() {
    var t = this.cz,
      e = (this.Hte.ActorUpProxy.Multiply(this.vWr, t), this.UWr),
      i = (this.Hte.ActorLocationProxy.Addition(t, e), this.AWr);
    return this.Hte.ActorLocationProxy.Subtraction(t, i), this.bKr(e, i)
  }
  nKr(t, e) {
    return this.MKr = this.YWr(t, e), 0 !== this.MKr && (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(this.Mao.HitResult, 0, this.yKr), this.JWr(this.yKr), !!this.rKr(this.yKr))
  }
  YWr(t, e) {
    var t = this.tKr(t, e),
      e = this.cz;
    return t && this.Mao.HitResult.bBlockingHit && (TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Mao.HitResult, 0, e), this.Rmu = e.Z, 0 < (t = e.Z - (this.Hte.ActorLocationProxy.Z - this.Hte.HalfHeight))) ? t : 0
  }
  qKr(t) {
    this.MKr < ENTER_WALK_ON_WATER_DEPTH || (this.xKr += t * TimeUtil_1.TimeUtil.Millisecond, (t = this.cz).DeepCopy(this.Hte.ActorLocationProxy), t.Z = MathUtils_1.MathUtils.Clamp(this.PKr + this.xKr * UP_TO_WATER_SURFACE_SPEED, this.PKr, this.Hte.ActorLocationProxy.Z + this.MKr - 1), this.Hte.SetActorLocation(t.ToUeVector(), "修正在水中的Z轴"))
  }
  GKr() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterUpToWalkOnWater"), this.cz.DeepCopy(this.Hte.ActorVelocityProxy), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.cz), this.Hte.SetActorVelocity(this.cz), this.Hte?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER,
      Context: "[CharacterWalkOnWaterComponent.EnterUpToWalkOnWater]"
    }), this.xKr = 0, this.PKr = this.Hte.ActorLocationProxy.Z, this.EKr = this.Gce.CharacterMovement.MaxCustomMovementSpeed
  }
  NKr() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] ExitUpToWalkOnWater"), this.Gce.CharacterMovement.MaxCustomMovementSpeed = this.EKr
  }
  OKr() {
    this.cz.DeepCopy(this.Hte.ActorVelocityProxy), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.cz), this.Hte.SetActorVelocity(this.cz), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterWalkOnWater"), this.Hte?.Actor.KuroSetMovementMode({
      Mode: 1,
      Context: "[CharacterWalkOnWaterComponent.EnterWalkOnWater]"
    }), this.EnableOrDisableWalkOnWater(!0, "CharWalkOnWaterComp")
  }
  kKr(t = !1) {
    t && this._Kr() && this.qKr(TimeUtil_1.TimeUtil.InverseMillisecond), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] ExitWalkOnWater"), this.EnableOrDisableWalkOnWater(!1, "CharWalkOnWaterComp")
  }
  tKr(t, e) {
    return TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, t), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, e), TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Mao, PROFILE_DETECT_WATER_DEPTH) && this.Mao.HitResult.bBlockingHit
  }
  bKr(t, e) {
    return TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.pKr, t), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.pKr, e), TraceElementCommon_1.TraceElementCommon.SphereTrace(this.pKr, PROFILE_DETECT_WATER_DEPTH) && this.pKr.HitResult.bBlockingHit
  }
  DKr(t) {
    this.Pdu ? this.xdu = t : this.WalkOnWaterStage !== t && this.FKr(t) && (this.Pdu = !0, this.VKr(this.WalkOnWaterStage), this.HKr(t), this.Pdu = !1, void 0 !== this.xdu) && this.xdu !== this.WalkOnWaterStage && (this.VKr(t), this.HKr(this.xdu), this.xdu = void 0)
  }
  FKr(t) {
    return !0
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
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterNone"), this.wmu(0), 5 === this.Gce.CharacterMovement.MovementMode || 6 === this.Gce.CharacterMovement.MovementMode && this.Gce.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE || this.Hte?.Actor.KuroSetMovementMode({
          Mode: 3,
          Context: "[CharacterWalkOnWaterComponent.EnterStage]"
        })
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
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] ExitNone"), this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface)
    }
  }
  jKr(t) {
    1 === this.WalkOnWaterStage && this.qKr(t)
  }
  OnTick(e) {
    if (this.Hte.IsRoleAndCtrlByMe && this.IsActive) {
      let t = 0;
      this.UKr() ? t = this.MKr < ENTER_WALK_ON_WATER_DEPTH ? 2 : 1 : this._Kr() ? t = 1 : 0 !== this.WalkOnWaterStage && (t = this.AKr() ? 2 : 0), this.DKr(t), this.jKr(e), 0 === this.WalkOnWaterStage ? (this.SKr || (this.SKr = Vector_1.Vector.Create(0, 0, 0)), this.SKr.DeepCopy(this.Hte.ActorLocationProxy), this.wKr -= e, this.wKr < 0 && (this.wKr = CHECK_IN_GROUND_INTERVAL, this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) && this.mBe?.PositionSubState === CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface && (this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] EnterGround")) : this.Lmu()
    }
  }
  Lmu() {
    var t = this.UWr,
      e = (t.DeepCopy(this.Hte.ActorLocationProxy), this.Rmu > t.Z - this.Hte.HalfHeight ? t.Z = this.Rmu : t.Z = t.Z - this.Hte.HalfHeight, this.AWr),
      i = this.cz,
      i = (this.Hte.ActorUpProxy.Multiply(this.vWr * SHALLOW_WATER_THRESOLD, i), t.Subtraction(i, e), TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.vao, t), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.vao, e), TraceElementCommon_1.TraceElementCommon.SphereTrace(this.vao, PROFILE_DETECT_WATER_DEPTH));
    if (i && this.vao.HitResult.bBlockingHit) {
      var s = this.vao.HitResult.GetHitCount();
      let e = !1,
        i = Number.NEGATIVE_INFINITY;
      var h = this.vao.HitResult.Actors,
        r = this.vao.HitResult.Components,
        _ = this.vao.HitResult.LocationZ_Array;
      for (let t = 0; t < s; t++) {
        var a = h.Get(t),
          n = r.Get(t);
        !a || a.bHidden && !n.bCanCharacterStandOn || (e = !0, _.Get(t) > i && (i = _.Get(t)))
      }
      e ? this.wmu(i > this.Rmu ? 0 : 1) : this.wmu(2)
    } else this.wmu(2)
  }
  Amu(t, e) {
    let i = void 0;
    1 === t ? i = -1686770584 : 2 === t && (i = 320899740), i && (e ? this.Lie?.AddTag(i) : this.Lie?.RemoveTag(i))
  }
  wmu(t) {
    this.WaterDepthType !== t && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 36, "[WalkOnWater] SetWaterDepthType", ["preType", this.WaterDepthType], ["newType", t]), this.Amu(this.WaterDepthType, !1), this.WaterDepthType = t, this.Amu(t, !0))
  }
  EnableOrDisableWalkOnWater(t, e, i = !1) {
    t ? this.d6a.has(e) || (0 === this.d6a.size && (this.Hte.Actor.CapsuleComponent?.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater, 2), i) && ([t, i] = this.Hte.FixActorLocation(0, !0, this.Hte.ActorLocationProxy, "WalkOnWater", !0, !1), t) && ((t = this.Entity.GetComponent(177)) ? t.SetLocationAndRotatorWithModelBuffer(i.ToUeVector(), this.Hte.ActorRotation, MODEL_BUFFER_TIME_LENGTH, "WalkOnWater.FixLocation", 2, !1) : this.Hte.SetActorLocation(i.ToUeVector(), "WalkOnWater.FixLocation", !1)), this.d6a.add(e)) : (this.d6a.delete(e), 0 === this.d6a.size && this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater, this.IKr ?? 1))
  }
};
CharacterWalkOnWaterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(79)], CharacterWalkOnWaterComponent), exports.CharacterWalkOnWaterComponent = CharacterWalkOnWaterComponent;
//# sourceMappingURL=CharacterWalkOnWaterComponent.js.map