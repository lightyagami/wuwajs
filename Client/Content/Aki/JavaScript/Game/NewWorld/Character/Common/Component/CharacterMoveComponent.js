"use strict";

var CharacterMoveComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var r = arguments.length;
  var a = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        a = (r < 3 ? h(a) : r > 3 ? h(e, i, a) : h(e, i)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterMoveComponent = exports.GLIDE_STRENGTH_THREADHOLD = exports.GLIDING_HEIGHT_THREDHOLD = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterAttributeTypes_1 = require("./Abilities/CharacterAttributeTypes");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const BaseMoveComponent_1 = require("./BaseMoveComponent");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const WhirlpoolPoint_1 = require("./Move/WhirlpoolPoint");
const MIN_MOVE_SPEED = 20;
const GLIDING_CONTROL_OFFSET = 0.3;
exports.GLIDING_HEIGHT_THREDHOLD = 250;
const MAX_IN_WATER_SPEED = 800;
exports.GLIDE_STRENGTH_THREADHOLD = 10;
const SQUARE_MAX_INHERIT_SPEED = 1000000;
const cannotResponseInputTag = [-648310348, -2044964178, 1008164187, 191377386];
const JUMP_FRAME_COUNT = 3;
const SLIDE_JUMP_LERP_TIME = 100;
const SLIDE_JUMP_SPEED = 900;
const OVER_VELOCITY_PERCENT = 1.01;
const BASE_MOVE_INHERIT_TIME = 1.5;
const TRY_GLIDE_TIME = 500;
const MAX_WALK_FLOOR_ANGLE = 55;
const DEFAULT_MAX_STEP_HEIGHT = 45;
const DEFAULT_STEP_UP_PERCENT = 0.08;
const DEFAULT_STEP_UP_STANDARD_SPEED = 400;
class ForceFallingSpeedCache {
  constructor() {
    this.ForceFallingSpeed = Vector_1.Vector.Create();
    this.Tag = 0;
    this.HasForceFallingSpeed = false;
  }
}
let CharacterMoveComponent = CharacterMoveComponent_1 = class CharacterMoveComponent extends BaseMoveComponent_1.BaseMoveComponent {
  constructor() {
    super(...arguments);
    this.GlideComp = undefined;
    this.SwimComp = undefined;
    this.WalkOnWaterComp = undefined;
    this.ForceFallingSpeedCache = undefined;
    this.SkillComp = undefined;
    this.LastGlidingControlTime = 0;
    this.AttributeComponent = undefined;
    this.TagComponent = undefined;
    this.DeathComponent = undefined;
    this.AirInertiaHandler = 0;
    this.CanResponseInputTasks = new Array();
    this.TryGlideTime = 0;
    this.gHr = new WhirlpoolPoint_1.WhirlpoolPoint();
    this.bWc = false;
    this.M71 = false;
    this.fHr = 0;
    this.GroundedFrame = 0;
    this.OnLand = () => {
      this.GroundedTimeUe = UE.GameplayStatics.GetGamePlayTimeSeconds(this.ActorComp.Actor);
      this.GroundedFrame = Time_1.Time.Frame;
      if (UE.Actor.GetKuroNetMode() === 1 && this.ActorComp.IsAutonomousProxy) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EntityOnLandedPush, this.Entity);
      }
    };
    this.OnPositionStateChanged = (t, e) => {
      if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air && (this.IsFallingIntoWater = false, this.StopAddMove(this.AirInertiaHandler), this.AirInertiaHandler = 0, this.ActorComp.IsRoleAndCtrlByMe) && e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
        this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_BeLand);
      }
      switch (e) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
          this.VelocityVector.FromUeVector(this.ActorComp.ActorVelocityProxy);
          var i = this.VelocityVector.Size();
          if (i > MAX_IN_WATER_SPEED) {
            this.VelocityVector.MultiplyEqual(MAX_IN_WATER_SPEED / i);
            this.ActorComp?.SetActorVelocity(this.VelocityVector);
          }
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
          if (this.Entity.Active && this.ActorComp.IsAutonomousProxy && (this.Entity.GetComponent(20)?.FallInjure(), this.GetWhirlpoolEnable())) {
            this.EndWhirlpool();
          }
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          if (this.HasBaseMovement && !this.ActorComp.Actor.BasedMovement.bRelativeRotation && this.DeltaBaseMovementSpeed) {
            this.AirInertiaHandler = this.SetAddMoveWorld(this.DeltaBaseMovementSpeed, BASE_MOVE_INHERIT_TIME, CharacterMoveComponent_1.BaseMoveInheritCurve, this.AirInertiaHandler);
          }
          if (this.DeltaConveyBeltSpeed) {
            this.AirInertiaHandler = this.SetAddMoveWorld(this.DeltaConveyBeltSpeed, BASE_MOVE_INHERIT_TIME, CharacterMoveComponent_1.BaseMoveInheritCurve, this.AirInertiaHandler);
          }
      }
    };
    this.OnStateInherit = (t, e) => {
      var i;
      var s;
      var h;
      var r;
      if (t?.Valid && (i = t.GetComponent(179))?.Valid) {
        s = t.GetComponent(62);
        h = this.Entity.GetComponent(62);
        if (s && h && (r = s.GetAutoMovingConfig()).GetAutoMovingState()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Input", 42, "换人继承自动持续奔跑", ["Old", i.Entity.Id], ["Old", i.ActorComp.Actor.GetName()], ["New", this.ActorComp.Entity.Id], ["New", this.ActorComp.Actor.GetName()]);
          }
          h.SetAutoMovingConfig(r);
          r.ResetAutoMovingState("切人");
        }
        this.SetGravityDirectWithoutRotate(i.GravityDirect);
        this.CharacterMovement.ConsumeInputVector();
        this.CharacterMovement.AddInputVector(i.CharacterMovement.GetLastInputVector(), true);
        this.ActorComp.SetInputDirect(i.ActorComp.InputDirectProxy);
        this.ActorComp.SetInputFacing(i.ActorComp.InputFacingProxy);
        this.ActorComp.SetOverrideTurnSpeed(i.ActorComp.OverrideTurnSpeed);
        this.HasMoveInput = i.HasMoveInput;
        this.CharacterMovement.LastUpdateVelocity = i.GetLastUpdateVelocity();
        this.ActorComp.ResetCachedVelocityTime();
        i.ActorComp?.ClearInput(false, false);
        s?.ResetMoveVectorCache();
        if (!e) {
          this.X_d(i);
          this.Y_d(t, i);
        }
      }
    };
    this.OnTeleportStart = () => {
      if (this.IsMovingToLocation()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Movement", 42, "因传送打断当前移动,设置移动结果失败", ["EntityId", this.Entity.Id], ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()]);
        }
        this.MoveToLocationEnd(2);
      }
    };
    this.OnSprintTag = (t, e) => {
      if (e) {
        switch (t) {
          case 24802177:
            this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_Spurt);
            break;
          case -268378154:
            this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_Pullback);
            break;
          case 1965311544:
            this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_AirSprint);
            break;
          case -2042325985:
            this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_BackFlip);
        }
      }
    };
    this.OnEnableWalkOnAirTag = (t, e) => {
      this.CharacterMovement.bKuroWalkOnAir = e;
    };
    this.OnVisionMorphBegin = (t, e) => {
      if (e?.Valid && e.Id === this.Entity.Id || t?.Valid && t.Id === this.Entity.Id) {
        this.ResetPlanarPhysWalking();
      }
    };
    this.OnVisionMorphEnd = (t, e) => {
      if (t?.Valid && t.Id === this.Entity.Id || e?.Valid && e.Id === this.Entity.Id) {
        this.ResetPlanarPhysWalking();
      }
    };
    this.OnTeleportComplete = (t, e) => {
      this.ResetPlanarPhysWalking();
    };
    this.OnWorldDone = () => {
      this.ResetPlanarPhysWalking();
    };
    this.OnRoleGoUp = () => {
      this.ResetPlanarPhysWalking();
    };
    this.SlideTrans = undefined;
    this.OnSpeedRatioAttributeChanged = (t, e, i) => {
      var s = this.UnifiedStateComponent?.MoveState;
      var h = this.Entity.GetComponent(179);
      if (h?.Valid) {
        h.ResetMaxSpeed(s);
      }
    };
    this.OnResponseInputTagsChanged = (t, e) => {
      if (e) {
        if (this.CannotResponseInputCount === 0) {
          this.HasMoveInput = false;
        }
        ++this.CannotResponseInputCount;
      } else {
        --this.CannotResponseInputCount;
      }
    };
    this.VFa = 0;
    this.InitMaxStepHeight = DEFAULT_MAX_STEP_HEIGHT;
    this.InitStepUpPercent = DEFAULT_STEP_UP_PERCENT;
    this.InitStepUpStandardSpeed = DEFAULT_STEP_UP_STANDARD_SPEED;
    this.i4u = (t, e) => {
      if (e) {
        this.MovementData = this.MovementDataMap.get(t);
      } else if (this.MovementData === this.MovementDataMap.get(t)) {
        this.MovementData = this.DefaultMovementData;
      }
      this.CharacterMovement?.SetWalkableFloorAngle(this.MovementData.WalkableFloorAngle);
      this.OnPositionStateChange();
    };
  }
  static get EnableKuroAsyncRootMotion() {
    return this.E71;
  }
  static set EnableKuroAsyncRootMotion(t) {
    this.E71 = t;
  }
  static get Dependencies() {
    return [3];
  }
  static get BaseMoveInheritCurve() {
    this.BaseMoveInheritCurveInternal ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH, UE.CurveFloat);
    return this.BaseMoveInheritCurveInternal;
  }
  SetForceFallingSpeed(t, e) {
    this.ForceFallingSpeedCache.ForceFallingSpeed.FromUeVector(t);
    t = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.ForceFallingSpeedCache.ForceFallingSpeed);
    this.TmpVector.Reset();
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.ActorComp, this.TmpVector, t);
    this.SetForceSpeed(this.TmpVector);
    this.ForceFallingSpeedCache.Tag = e;
    this.ForceFallingSpeedCache.HasForceFallingSpeed = true;
  }
  ConsumeForceFallingSpeed() {
    var t;
    return !!this.ForceFallingSpeedCache.HasForceFallingSpeed && (this.TagComponent.HasTag(this.ForceFallingSpeedCache.Tag) ? !this.AnimComp.HasKuroRootMotion && this.CharacterMovement.MovementMode === 3 && !(t = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.ActorComp, this.ActorComp.ActorVelocityProxy), GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.ActorComp, this.ForceFallingSpeedCache.ForceFallingSpeed, t), this.SetForceSpeed(this.ForceFallingSpeedCache.ForceFallingSpeed), this.ForceFallingSpeedCache.HasForceFallingSpeed = false) : this.ForceFallingSpeedCache.HasForceFallingSpeed = false);
  }
  get WalkSpeed() {
    return this.CurrentMovementSettings.WalkSpeed;
  }
  get RunSpeed() {
    return this.CurrentMovementSettings.RunSpeed;
  }
  get SprintSpeed() {
    return this.CurrentMovementSettings.SprintSpeed;
  }
  get SwimSpeed() {
    return this.CurrentMovementSettings.NormalSwimSpeed;
  }
  get FastSwimSpeed() {
    return this.CurrentMovementSettings.FastSwimSpeed;
  }
  get IsKuroPlanarPhysWalkingEnable() {
    return this.bWc;
  }
  SetOverrideMaxFallingSpeed(t) {
    this.fHr = t;
  }
  ResetOverrideMaxFallingSpeed() {
    this.fHr = 0;
  }
  SetMaxSpeed(t) {
    let e = this.AttributeComponent?.GetCurrentValue(EAttributeId.vVn);
    if (!e || e <= 0) {
      e = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    }
    e /= CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    var i = this.CharacterMovement.MovementMode;
    if (i === 5) {
      this.CharacterMovement.MaxFlySpeed = t * e;
    } else {
      this.CharacterMovement.MaxWalkSpeed = i === 3 ? (this.fHr > 0 ? this.fHr : t) * e : t * e;
    }
    if (this.ActorComp?.IsRoleAndCtrlByMe && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 6, "SetMaxSpeed", ["Entity", this.Entity.Id], ["WalkSpeed", this.CharacterMovement.MaxWalkSpeed], ["FlySpeed", this.CharacterMovement.MaxFlySpeed], ["NewSpeed", t], ["SpeedRatio", e]);
    }
  }
  X_d(t) {
    this.IsMoving = t.IsMoving;
    CharacterMoveComponent_1.TempVelocity.DeepCopy(t.ActorComp.ActorVelocityProxy);
    var e = CharacterMoveComponent_1.TempVelocity.SizeSquared();
    if (e > SQUARE_MAX_INHERIT_SPEED) {
      CharacterMoveComponent_1.TempVelocity.MultiplyEqual(Math.sqrt(SQUARE_MAX_INHERIT_SPEED / e));
    }
    var e = this.Entity.GetComponent(206);
    if (!e?.HasTag(-1423251824)) {
      this.ForceSpeed.DeepCopy(CharacterMoveComponent_1.TempVelocity);
      this.Speed = Math.sqrt(GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.ActorComp, this.ForceSpeed));
      this.ActorComp?.SetActorVelocity(this.ForceSpeed);
      this.CharacterMovement.LastUpdateVelocity = t.CharacterMovement.LastUpdateVelocity;
    }
    t.Entity.GetComponent(114)?.DumpVelocityCacheInfo("战斗换人");
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 6, "1117317 Bug追踪，换人继承", ["Name", this.ActorComp?.Actor.GetName()], ["切人不继承速度", e?.HasTag(-1423251824)], ["Speed", this.Speed], ["LastVelocityOtherComp", t.CharacterMovement?.LastUpdateVelocity.Z], ["LastVelocity", this.CharacterMovement?.LastUpdateVelocity.Z], ["Velocity", this.CharacterMovement?.Velocity.Z]);
    }
    if (!t.ActorComp.Actor.BasedMovement.MovementBase) {
      this.ActorComp.Actor.BasedMovement.MovementBase = undefined;
    }
    var e = this.ActorComp.Actor.CharacterMovement.CurrentFloor;
    var i = t.ActorComp.Actor.CharacterMovement.CurrentFloor;
    e.bBlockingHit = i.bBlockingHit;
    e.bLineTrace = i.bLineTrace;
    e.bWalkableFloor = i.bWalkableFloor;
    e.FloorDist = i.FloorDist;
    e.HitResult = i.HitResult;
    e.LineDist = i.LineDist;
    UE.KuroStaticLibrary.SetBaseAndSaveBaseLocation(this.CharacterMovement, t.CharacterMovement.GetMovementBase());
  }
  Y_d(t, e) {
    var i = t.GetComponent(206);
    var t = t.GetComponent(176);
    if (e.CharacterMovement.MovementMode === 0 || i?.HasTag(-2100129479)) {
      this.ActorComp.Actor.KuroSetMovementMode({
        Mode: 1,
        CustomMode: 0,
        Context: "[CharacterMoveComponent.OnStateInherit] MOVE_None"
      });
    } else if (this.TagComponent?.HasTag(1625384425)) {
      if (e.CharacterMovement.MovementMode === 1) {
        this.ActorComp.Actor.KuroSetMovementMode({
          Mode: e.CharacterMovement.MovementMode,
          CustomMode: e.CharacterMovement.CustomMovementMode,
          Context: "[CharacterMoveComponent.OnStateInherit.]"
        });
      } else {
        this.ActorComp.Actor.KuroSetMovementMode({
          Mode: 3,
          CustomMode: 0,
          Context: "[CharacterMoveComponent.OnStateInherit]"
        });
      }
    } else if (e.CharacterMovement.MovementMode !== 5 && this.UnifiedStateComponent?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Roll && t?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ride && !this.WalkOnWaterComp?.BlockMoveModeInherit(e.CharacterMovement)) {
      this.ActorComp.Actor.KuroSetMovementMode({
        Mode: e.CharacterMovement.MovementMode,
        CustomMode: e.CharacterMovement.CustomMovementMode,
        Context: "[CharacterMoveComponent.OnStateInherit]"
      });
    }
  }
  OnInitData() {
    super.OnInitData();
    this.CurrentGravityScale = new BaseMoveComponent_1.GravityScale();
    this.ForceFallingSpeedCache = new ForceFallingSpeedCache();
    return true;
  }
  OnClear() {
    super.OnClear();
    if (this.JumpDelayTimer) {
      TimerSystem_1.TimerSystem.Remove(this.JumpDelayTimer);
    }
    CharacterMoveComponent_1.TempVelocity.Reset();
    this.MoveController?.Dispose();
    this.r4u();
    return true;
  }
  OnInit() {
    return super.OnInit();
  }
  OnStart() {
    this.AccelerationLerpCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.ACC_LERP_CURVE_PATH, UE.CurveFloat);
    if (!this.AccelerationLerpCurve?.IsValid()) {
      ModelManager_1.ModelManager.PreloadModel.CommonAssetElement.PrintDebugInfo();
    }
    this.AccelerationLerpTime = 0;
    this.AccelerationChangeMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    var t = this.Entity.GetComponent(3);
    if (!t.Valid) {
      return false;
    }
    this.IsHidden = false;
    this.ActorComp = t;
    this.CharacterMovement = t.Actor.CharacterMovement;
    this.GravityDirectInternal.FromUeVector(this.CharacterMovement.Kuro_GetGravityDirect());
    this.IsStandardGravityInternal = Math.abs(this.GravityDirectInternal.Z + 1) < MathUtils_1.MathUtils.SmallNumber;
    if (this.IsStandardGravityInternal) {
      this.GravityDirectInternal.Set(0, 0, -1);
    }
    this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal);
    this.CharacterMovement.GravityScale = 2;
    this.CharacterMovement.bRotationFollowBaseMovement = true;
    this.CharacterMovement.SetWalkableFloorAngle(MAX_WALK_FLOOR_ANGLE);
    this.CharacterMovement.bEnablePhysicsInteraction = false;
    this.SetKuroPlanarPhysWalking(this.I71());
    this.SetKuroAsyncRootMotion(this.b71());
    this.AnimComp = this.Entity.GetComponent(178);
    this.GlideComp = this.Entity.GetComponent(59);
    this.SwimComp = this.Entity.GetComponent(77);
    this.WalkOnWaterComp = this.Entity.GetComponent(79);
    this.AttributeComponent = this.Entity.GetComponent(174);
    this.TagComponent = this.Entity.GetComponent(206);
    this.DeathComponent = this.Entity.GetComponent(15);
    this.UnifiedStateComponent = this.Entity.GetComponent(102);
    this.SkillComp = this.Entity.GetComponent(40);
    this.CapsuleOffset = Vector_1.Vector.Create(0, 0, this.ActorComp.Radius - this.ActorComp.HalfHeight);
    this.InitCreatureProperty();
    this.InitStepUpParams();
    this.o4u();
    if (!this.ActorComp.Actor.DtBaseMovementSetting || !this.MovementData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "以下BP_{Character}没有在蓝图中配置Dt_BaseMovementSetting找对应的蓝图负责人处理", ["Character", this.ActorComp.Actor.GetName()]);
      }
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChange);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.OnPositionStateChange);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, this.OnDirectionStateChange);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnLand, this.OnLand);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.OnPositionStateChanged);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.OnStateInherit);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.OnTeleportStart);
    if (this.bWc) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.VisionMorphBegin, this.OnVisionMorphBegin);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.VisionMorphEnd, this.OnVisionMorphEnd);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoUp, this.OnRoleGoUp);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.OnTeleportComplete);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.OnWorldDone);
    }
    this.IsStopInternal = false;
    this.InitBaseState();
    this.AttributeComponent?.AddListener(EAttributeId.vVn, this.OnSpeedRatioAttributeChanged);
    this.CannotResponseInputCount = 0;
    for (const e of cannotResponseInputTag) {
      if (this.TagComponent) {
        if (this.TagComponent.HasTag(e)) {
          ++this.CannotResponseInputCount;
        }
        this.CanResponseInputTasks.push(this.TagComponent.ListenForTagAddOrRemove(e, this.OnResponseInputTagsChanged));
      }
    }
    this.InitTraceInfo();
    this.TagComponent.AddTagAddOrRemoveListener(24802177, this.OnSprintTag);
    this.TagComponent.AddTagAddOrRemoveListener(-268378154, this.OnSprintTag);
    this.TagComponent.AddTagAddOrRemoveListener(1965311544, this.OnSprintTag);
    this.TagComponent.AddTagAddOrRemoveListener(-2042325985, this.OnSprintTag);
    this.TagComponent.AddTagAddOrRemoveListener(-1420036974, this.OnEnableWalkOnAirTag);
    this.MU1();
    return super.OnStart();
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChange);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.OnPositionStateChange);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, this.OnDirectionStateChange);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnLand, this.OnLand);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.OnPositionStateChanged);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.OnStateInherit);
    if (this.bWc) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.VisionMorphBegin, this.OnVisionMorphBegin);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.VisionMorphEnd, this.OnVisionMorphEnd);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoUp, this.OnRoleGoUp);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.OnTeleportComplete);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.OnWorldDone);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.OnTeleportStart);
    this.AttributeComponent?.RemoveListener(EAttributeId.vVn, this.OnSpeedRatioAttributeChanged);
    for (const t of this.CanResponseInputTasks) {
      t.EndTask();
    }
    this.CanResponseInputTasks.length = 0;
    this.IsHidden = false;
    this.TagComponent.RemoveTagAddOrRemoveListener(24802177, this.OnSprintTag);
    this.TagComponent.RemoveTagAddOrRemoveListener(-268378154, this.OnSprintTag);
    this.TagComponent.RemoveTagAddOrRemoveListener(1965311544, this.OnSprintTag);
    this.TagComponent.RemoveTagAddOrRemoveListener(-2042325985, this.OnSprintTag);
    return !(this.bWc = false);
  }
  OnActivate() {
    this.OnMoveStateChange(CharacterUnifiedStateTypes_1.ECharMoveState.Stand, CharacterUnifiedStateTypes_1.ECharMoveState.Run);
    if (this.CharacterMovement.MovementMode === 2) {
      this.ActorComp.Actor.KuroSetMovementMode({
        Mode: 1,
        Context: "[CharacterMoveComponent.OnActivate]"
      });
    }
  }
  OnDisable() {
    this.DeltaTimeSeconds = 0;
    if (this.GetWhirlpoolEnable()) {
      this.EndWhirlpool();
    }
  }
  OnTick(i) {
    if (!(i < MathUtils_1.MathUtils.SmallNumber) && (super.OnTick(i), this.ActorComp) && this.DeathComponent && (this.gHr.GetEnable() || !this.DeathComponent.IsDead()) && (this.DeltaTimeSeconds = i * MathUtils_1.MathUtils.MillisecondToSecond, this.MoveController?.UpdateMove(this.DeltaTimeSeconds), this.SpeedLockFrame > 0 && --this.SpeedLockFrame, this.IsJump && --this.JumpFrameCount, this.LerpMaxAcceleration(), this.UpdateBaseMovement(), !this.IsSpecialMove)) {
      if (this.IsStopInternal) {
        this.Speed = 0;
      } else {
        this.Speed = Math.sqrt(GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.ActorComp, this.ActorComp.ActorVelocityProxy));
      }
      this.IsMoving = this.Speed > MIN_MOVE_SPEED;
      if (this.ActorComp.IsMoveAutonomousProxy) {
        this.UpdateInputOrder();
        if (this.UnifiedStateComponent?.Valid && this.UnifiedStateComponent.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air && this.UnifiedStateComponent.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other && !this.AnimComp.HasKuroRootMotion && (h = Math.max(this.FallingHorizontalMaxSpeed, this.fHr), this.Speed > h * OVER_VELOCITY_PERCENT)) {
          CharacterMoveComponent_1.TempVelocity.DeepCopy(this.ActorComp.ActorVelocityProxy);
          s = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, CharacterMoveComponent_1.TempVelocity);
          CharacterMoveComponent_1.TempVelocity.MultiplyEqual(h / this.Speed);
          if (CharacterMoveComponent_1.TempVelocity.ContainsNaN() && Log_1.Log.CheckError()) {
            Log_1.Log.Error("Movement", 6, "Air Speed Limit has NaN", ["velocity", CharacterMoveComponent_1.TempVelocity], ["speed", this.Speed], ["max", h]);
          }
          GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.ActorComp, CharacterMoveComponent_1.TempVelocity, s);
          this.ActorComp.SetActorVelocity(CharacterMoveComponent_1.TempVelocity);
          this.Speed = this.FallingHorizontalMaxSpeed;
        }
        var s;
        var h = this.Entity.GetTickInterval() > 1 && this.AnimComp?.Valid && this.ActorComp.Owner.WasRecentlyRenderedOnScreen();
        let t = undefined;
        if (h) {
          t = this.AnimComp.GetMeshTransform();
        }
        let e = false;
        if (this.CanResponseInput()) {
          this.SetInfoVar();
          s = this.ActorComp.ActorRotationProxy.Pitch;
          this.UpdateFacing();
          e ||= s !== this.ActorComp.ActorRotationProxy.Pitch;
          this.CacheVar();
        } else {
          this.HasMoveInput = false;
        }
        if (this.gHr.GetEnable()) {
          e = this.pHr();
          if (!this.gHr.OnTick(this.DeltaTimeSeconds * (this.TimeScaleComp?.CurrentTimeScale ?? 1))) {
            this.EndWhirlpool();
          }
        }
        if (h && e) {
          this.AnimComp.SetModelBuffer(t, i * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
        }
        this.OnTickGravityScale();
        if (this.HasBaseMovement) {
          this.DeltaBaseMovementQuat.RotateVector(this.ActorComp.InputFacingProxy, this.TmpVector);
          this.ActorComp.SetInputFacing(this.TmpVector, true);
        }
        if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn) {
          this.PrintAnimInstanceMovementInfo();
        }
        this.UpdateMoveChain();
        if (this.TryGlideTime) {
          if (this.TrySetGlide()) {
            this.TryGlideTime = 0;
          }
          this.TryGlideTime = Math.max(this.TryGlideTime - i, 0);
        }
      } else if (this.CanResponseInput()) {
        this.SetInfoVar();
        this.UpdateFacing();
        this.CacheVar();
      } else {
        this.HasMoveInput = false;
      }
    }
  }
  ContainsTag(t) {
    return this.TagComponent?.HasTag(t) ?? false;
  }
  JumpRelease() {
    this.ActorComp.Actor.StopJumping();
  }
  JumpCheck() {
    return !!this.CanResponseInput() && !this.ContainsTag(-291592299) && (this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground || this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ski);
  }
  CanJumpPress() {
    if (this.GroundedFrame > Time_1.Time.Frame - 2) {
      return false;
    }
    var t = this.Entity.GetComponent(40);
    var e = this.UnifiedStateComponent?.PositionState;
    var i = this.UnifiedStateComponent?.MoveState;
    switch (e) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
      case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ski:
        return (!t.Valid || t.CheckJumpCanInterrupt()) && this.JumpCheck();
      case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
        if (i === CharacterUnifiedStateTypes_1.ECharMoveState.Glide) {
          return Time_1.Time.WorldTime - this.LastGlidingControlTime > GLIDING_CONTROL_OFFSET;
        } else {
          CharacterUnifiedStateTypes_1.ECharMoveState.Slide;
          return true;
        }
      default:
        return false;
    }
  }
  CanWalkPress() {
    return this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
  }
  LimitMaxSpeed() {
    this.VelocityVector.FromUeVector(this.ActorComp.ActorVelocityProxy);
    var t = this.VelocityVector.Size();
    var e = this.CurrentMovementSettings?.SprintSpeed;
    if (e < t) {
      this.VelocityVector.MultiplyEqual(e / t);
      this.ActorComp?.SetActorVelocity(this.VelocityVector);
    }
  }
  OnJump() {
    var t = this.Entity.GetComponent(178);
    if (t.Valid && t.MainAnimInstance) {
      t.MainAnimInstance.Montage_Stop(0);
    }
    this.JumpFrameCount = JUMP_FRAME_COUNT;
    this.AnimComp.OnJump();
  }
  JumpPress() {
    if (!this.CheckInHit() && this.CanJumpPress()) {
      var t = this.UnifiedStateComponent?.PositionState;
      var e = t === CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
      var i = t === CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
      if (e || i) {
        this.TagComponent?.RemoveTag(-1371021686);
        if ((i = this.Entity.GetComponent(40)).Valid && i.CurrentSkill) {
          i.StopGroup1Skill("跳跃打断技能");
          this.LimitMaxSpeed();
        }
        this.OnJump();
        if (e) {
          this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_MotionJump);
        }
      } else {
        if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
          if (this.JumpPressInAir()) {
            return;
          }
        } else if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Ski && (this.JumpPressInSki() || this.JumpPressInRailSlide())) {
          return;
        }
        if (!this.TrySetGlide()) {
          this.TryGlideTime = TRY_GLIDE_TIME;
        }
      }
    }
  }
  CheckInHit() {
    return !!this.TagComponent && (!!this.TagComponent.HasTag(-1503953470) || !!this.TagComponent.HasTag(-2044964178));
  }
  JumpPressInAir() {
    var t;
    return !this.CheckInHit() && ((t = this.UnifiedStateComponent?.MoveState) === CharacterUnifiedStateTypes_1.ECharMoveState.Glide ? (this.GlideComp?.Valid && (this.GlideComp.ExitGlideState("MoveComp"), this.LastGlidingControlTime = Time_1.Time.WorldTime), true) : t === CharacterUnifiedStateTypes_1.ECharMoveState.Slide && (CharacterMoveComponent_1.TempVelocity.FromUeVector(this.CharacterMovement.Kuro_GetBlockDirectWhenMove()), this.AnimComp?.Valid && (this.SlideTrans ||= Transform_1.Transform.Create(), MathUtils_1.MathUtils.LookRotationUpFirst(CharacterMoveComponent_1.TempVelocity, this.GravityUp, this.TmpQuat), this.SlideTrans.Set(this.ActorComp.ActorLocationProxy, this.TmpQuat, this.ActorComp.ActorScaleProxy), this.AnimComp.SetTransformWithModelBuffer(this.SlideTrans.ToUeTransform(), SLIDE_JUMP_LERP_TIME)), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, CharacterMoveComponent_1.TempVelocity), CharacterMoveComponent_1.TempVelocity.Normalize() || CharacterMoveComponent_1.TempVelocity.DeepCopy(this.ActorComp.ActorForwardProxy), CharacterMoveComponent_1.TempVelocity.MultiplyEqual(SLIDE_JUMP_SPEED / CharacterMoveComponent_1.TempVelocity.Size()), this.ActorComp?.SetActorVelocity(CharacterMoveComponent_1.TempVelocity), this.OnJump(), this.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterMoveComponent.JumpPressInAir]"
    }), this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_MotionJump), true));
  }
  JumpPressInSki() {
    var t;
    return !this.CheckInHit() && !!(t = this.Entity.GetComponent(35)) && this.CharacterMovement?.MovementMode === 6 && this.CharacterMovement?.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI && (CharacterMoveComponent_1.TempVelocity.FromUeVector(this.ActorComp.ActorForwardProxy), this.AnimComp?.Valid && (this.SlideTrans ||= Transform_1.Transform.Create(), MathUtils_1.MathUtils.LookRotationUpFirst(CharacterMoveComponent_1.TempVelocity, t.SlideForward, this.TmpQuat), this.SlideTrans.Set(this.ActorComp.ActorLocationProxy, this.TmpQuat, this.ActorComp.ActorScaleProxy), this.AnimComp.SetTransformWithModelBuffer(this.SlideTrans.ToUeTransform(), SLIDE_JUMP_LERP_TIME)), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, CharacterMoveComponent_1.TempVelocity), CharacterMoveComponent_1.TempVelocity.Normalize() || CharacterMoveComponent_1.TempVelocity.DeepCopy(this.ActorComp.ActorForwardProxy), CharacterMoveComponent_1.TempVelocity.MultiplyEqual(Math.sqrt(GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.ActorComp, this.ActorComp.ActorVelocityProxy))), this.ActorComp?.SetActorVelocity(CharacterMoveComponent_1.TempVelocity), this.OnJump(), t.OnJump(), this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_MotionJump), true);
  }
  JumpPressInRailSlide() {
    return !this.CheckInHit() && !!this.Entity.GetComponent(36) && this.CharacterMovement?.MovementMode === 6 && this.CharacterMovement?.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE;
  }
  TrySetGlide() {
    if (this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
      var t = this.UnifiedStateComponent.MoveState;
      if (t !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide && t !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide && !this.TagComponent?.HasTag(-8769906) && Time_1.Time.WorldTime - this.LastGlidingControlTime > GLIDING_CONTROL_OFFSET && (this.GetHeightAboveGround() > exports.GLIDING_HEIGHT_THREDHOLD || this.TagComponent?.HasTag(-654554827)) && FormationAttributeController_1.FormationAttributeController.GetValue(1) > exports.GLIDE_STRENGTH_THREADHOLD) {
        t = this.Entity.GetComponent(40);
        if (t.Valid && t.CurrentSkill) {
          if (!t.CheckGlideCanInterrupt()) {
            return false;
          }
          t.StopGroup1Skill("滑翔打断技能");
          this.LimitMaxSpeed();
        }
        if (this.GlideComp?.Valid) {
          this.GlideComp.EnterGlideState("MoveComp");
          this.StopAddMove(this.AirInertiaHandler);
          this.AirInertiaHandler = 0;
          this.LastGlidingControlTime = Time_1.Time.WorldTime;
        }
        return true;
      }
    }
    return false;
  }
  PlayerMovementInput(t) {
    var e = this.Entity.GetComponent(29);
    if (!e?.GetSitDownState()) {
      e = this.SkillComp;
      if (e?.Valid && this.ContainsTag(1996624497) && !this.ContainsTag(-652371212)) {
        if (!this.CanResponseInput() || !e.IsMainSkillReadyEnd || t.SizeSquared() < MathUtils_1.MathUtils.SmallNumber || this.ContainsTag(372387279)) {
          return;
        }
        e.StopGroup1Skill("移动打断技能");
      }
      switch (this.UnifiedStateComponent?.PositionState) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
          this.ActorComp.Actor.D_AddMovementInput(t, this.AnimComp?.Valid ? this.AnimComp.GetWalkRunMix() : 1, false);
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
        case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
          this.ActorComp.Actor.D_AddMovementInput(t, 1, false);
      }
    }
  }
  UpdateInputOrder() {
    if (this.CanResponseInput()) {
      this.PlayerMovementInput(this.ActorComp.InputDirect);
    }
  }
  SmoothCharacterRotationByValue(t, e, i, s, h, r = "Movement.SmoothCharacterRotationByValue") {
    if (!this.LockedRotation && !(this.TmpRotator.Pitch = t, this.TmpRotator.Yaw = e, this.TmpRotator.Roll = i, t = this.ActorComp.ActorRotationProxy, this.TmpRotator.Equals(t))) {
      if (this.IsStandardGravity) {
        MathUtils_1.MathUtils.RotatorInterpConstantTo(t, this.TmpRotator, h, s, this.TmpRotator);
      } else {
        GravityUtils_1.GravityUtils.RotatorInterpConstantToForActor(this.ActorComp, t, this.TmpRotator, h, s, this.TmpRotator);
      }
      this.ActorComp.SetActorRotationWithPriority(this.TmpRotator.ToUeRotator(), r, 0, false, false);
    }
  }
  SetAddMoveSpeed(t, e) {
    t = this.ActorComp.ActorRotation.RotateVectorDouble(t);
    return this.SetAddMoveWorld(t, -1, undefined, e);
  }
  SetAddMoveSpeedWithMesh(t, e) {
    var i;
    if (t) {
      i = this.VelocityAdditionMapByMesh.get(t) ?? 0;
      e = this.ActorComp.ActorRotation.RotateVectorDouble(e);
      if (i = this.SetAddMoveWorld(e, -1, undefined, i)) {
        this.VelocityAdditionMapByMesh.set(t, i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 14, "[CharacterMoveComponent.SetAddMoveSpeedWithMesh] 叠加位移失败，mesh为空");
    }
  }
  SetAddMove(t, e, i, s, h, r, a) {
    t = this.ActorComp.ActorRotation.RotateVectorDouble(t);
    return this.SetAddMoveWorld(t, e, i, s, undefined, h, r, a);
  }
  SetAddMoveWithMesh(t, e, i, s) {
    var h;
    if (t) {
      h = this.VelocityAdditionMapByMesh.get(t) ?? 0;
      e = this.ActorComp.ActorRotation.RotateVectorDouble(e);
      if (h = this.SetAddMoveWorld(e, i, s, h)) {
        this.VelocityAdditionMapByMesh.set(t, h);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 14, "[CharacterMoveComponent.SetAddMoveWithMesh] 叠加位移失败，mesh为空");
    }
  }
  SetGravityScale(t, e, i, s, h) {
    if (t !== 1 || e !== 1 || i !== 1) {
      this.CurrentGravityScale.ScaleUp = t;
      this.CurrentGravityScale.ScaleDown = e;
      this.CurrentGravityScale.ScaleTop = i;
      this.CurrentGravityScale.VelocityTop = s;
      this.CurrentGravityScale.Duration = h;
      this.CurrentGravityScale.ElapsedTime = 0;
    }
  }
  GetLastUpdateVelocity() {
    return this.CharacterMovement.GetLastUpdateVelocity();
  }
  get CharacterWeight() {
    if (this.CreatureProperty) {
      return this.CreatureProperty.重量;
    } else {
      return 0;
    }
  }
  get HasSwimmingBlock() {
    return this.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM && this.CharacterMovement.Kuro_GetBlockDirectWhenMove().SizeSquared() > 0;
  }
  UpdateSkillRotation() {
    return !!this.SkillComp && !!this.SkillComp.Active && !!this.SkillComp.UpdateAllSkillRotator(this.DeltaTimeSeconds);
  }
  UpdateFacing() {
    if (this.CanUpdateMovingRotation()) {
      var t = this.Entity.GetComponent(29);
      if (!t?.GetSitDownState()) {
        if (this.ActorComp.OverrideTurnSpeed) {
          this.SmoothCharacterRotation(this.ActorComp.InputRotatorProxy, this.ActorComp.OverrideTurnSpeed, this.DeltaTimeSeconds, false, "Movement.UpdateFacing");
          this.ActorComp.SetOverrideTurnSpeed(undefined);
        } else if (!this.UpdateSkillRotation() && this.IsInputDrivenCharacter && !(this.AnimComp.BattleIdleEndTime > 0)) {
          var e = this.UnifiedStateComponent;
          if (e?.Valid) {
            t = e.PositionState;
            if (!this.ContainsTag(1996624497)) {
              if (this.ActorComp.UseControllerRotation) {
                this.UpdateUsingControllerRotation();
              } else {
                switch (t) {
                  case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
                    this.UpdateGroundedRotation();
                    break;
                  case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
                    if (e.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.WalkOnAir) {
                      this.UpdateGroundedRotation();
                    } else {
                      this.UpdateInAirRotation();
                    }
                }
              }
            }
          } else {
            this.UpdateGroundedRotation();
          }
        }
      }
    } else {
      this.UpdateSkillRotation();
    }
  }
  SpeedScaled(t) {
    if (this.TimeScaleComp) {
      return t * this.TimeScaleComp.CurrentTimeScale * this.ActorComp.TimeDilation;
    } else {
      return t;
    }
  }
  CanMove() {
    return super.CanMove() && !this.ContainsTag(-2044964178);
  }
  SetChain(t, e) {
    this.ConfigChainLengthSquared = t < 0 ? -1 : t * t;
    this.ChainCenter.FromUeVector(e || this.ActorComp.GetInitLocation());
  }
  UpdateMoveChain() {
    var t;
    if (!(this.ConfigChainLengthSquared < 0)) {
      this.CurrentChainLengthSquared = Math.max(this.CurrentChainLengthSquared, this.ConfigChainLengthSquared);
      this.ChainCenter.Subtraction(this.ActorComp.ActorLocationProxy, CharacterMoveComponent_1.TempVelocity);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, CharacterMoveComponent_1.TempVelocity);
      if ((t = CharacterMoveComponent_1.TempVelocity.SizeSquared()) > this.CurrentChainLengthSquared) {
        CharacterMoveComponent_1.TempVelocity.MultiplyEqual((Math.sqrt(t) - Math.sqrt(this.CurrentChainLengthSquared)) / Math.sqrt(t));
        this.MoveCharacter(CharacterMoveComponent_1.TempVelocity, this.DeltaTimeSeconds);
      } else if (t > this.ConfigChainLengthSquared) {
        this.CurrentChainLengthSquared = t;
      }
    }
  }
  PlayerMotionRequest(t) {
    var e = Protocol_1.Aki.Protocol.Hls.create();
    e.c8n = t;
    Net_1.Net.Call(27596, e, () => {});
  }
  pHr() {
    var t;
    var e = this.gHr.GetAlpha();
    return !(e > 1) && !(t = CharacterMoveComponent_1.VelocityAdditionDestination, Vector_1.Vector.Lerp(this.gHr.BeginLocation, this.gHr.ToLocation, e, t), this.ActorComp.SetActorLocation(t.ToUeVector(), "移动.被吸引", true), 0);
  }
  BeginWhirlpool(t, e, i, s, h = -1, r = 0) {
    this.CharacterMovement.GravityScale = 0;
    this.Entity.GetComponent(176).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp);
    this.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterMoveComponent.BeginWhirlpool]"
    });
    this.SetForceFallingSpeed(Vector_1.Vector.ZeroVector, 31862857);
    this.gHr.Begin(t, e, i, s, h, r);
    this.Entity.GetComponent(61).ActiveStiff(-1);
  }
  EndWhirlpool() {
    this.CharacterMovement.GravityScale = 2;
    this.gHr.OnEnd();
    if (this.UnifiedStateComponent && this.UnifiedStateComponent.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
      this.Entity.GetComponent(61).DeActiveStiff("EndWhirlpool");
    }
  }
  GetWhirlpoolEnable() {
    return this.gHr.GetEnable();
  }
  GetWhirlpoolId() {
    return this.gHr.GetId();
  }
  CompareWhirlpoolPriority(t) {
    return t < this.gHr.GetMoveTime();
  }
  UpdateWhirlpoolLocation(t) {
    this.gHr.UpdateLocation(t);
  }
  InitStepUpParams() {
    if (this.CharacterMovement) {
      this.InitMaxStepHeight = this.CharacterMovement.MaxStepHeight;
      this.InitStepUpPercent = this.CharacterMovement.StepUpDeltaPrecent;
      this.InitStepUpStandardSpeed = this.CharacterMovement.StepUpStandardSpeed;
    }
  }
  SetStepUpParamsRecord(t) {
    if (t) {
      --this.VFa;
      if (this.VFa === 0) {
        this.ResetStepUpParams();
      }
    } else {
      ++this.VFa;
      if (this.VFa === 1) {
        this.SetStepUpParams();
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 42, "SetStepUpParamsRecord", ["reset", t], ["count", this.VFa]);
    }
  }
  SetStepUpParams() {
    if (this.CharacterMovement) {
      this.CharacterMovement.StepUpDeltaPrecent = 1;
      this.CharacterMovement.StepUpStandardSpeed = 1;
    }
  }
  ResetStepUpParams() {
    if (this.CharacterMovement) {
      this.CharacterMovement.StepUpDeltaPrecent = this.InitStepUpPercent;
      this.CharacterMovement.StepUpStandardSpeed = this.InitStepUpStandardSpeed;
    }
  }
  SetStepHeight(t) {
    if (this.CharacterMovement) {
      this.CharacterMovement.MaxStepHeight = t;
    }
  }
  ResetStepHeight() {
    if (this.CharacterMovement) {
      this.CharacterMovement.MaxStepHeight = this.InitMaxStepHeight;
    }
  }
  SetWalkableFloorAngle(t) {
    if (this.CharacterMovement) {
      this.CharacterMovement.SetWalkableFloorAngle(t);
    }
  }
  ResetWalkableFloorAngle() {
    if (this.CharacterMovement) {
      this.CharacterMovement.SetWalkableFloorAngle(this.MovementData.WalkableFloorAngle);
    }
  }
  SetKuroPlanarPhysWalking(t) {
    this.bWc = t;
    this.CharacterMovement.SetKuroPlanarPhysWalking(t);
  }
  ResetPlanarPhysWalking() {
    this.CharacterMovement.bKuroPlanarNeedFindFloor = true;
  }
  TryJumpInFreeRunning() {
    if (this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      this.OnJump();
      this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_MotionJump);
    } else if (this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ski) {
      this.JumpPressInSki();
    }
  }
  IsOnGroundOrOnWater() {
    return this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground || this.CharacterMovement.MovementMode === 6 && this.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER;
  }
  SetKuroAsyncRootMotion(t) {
    this.M71 = t;
    this.CharacterMovement.SetKuroAsyncRootMotion(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 57, "设置Kuro异步RootMotion", ["enable", t]);
    }
  }
  n4u() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    return t?.InstSubType === 33 && !!ModelManager_1.ModelManager.DangoAbyssModel.IsPlanarDungeon() || t?.InstSubType === 36;
  }
  I71() {
    return !!this.n4u();
  }
  b71() {
    return !!CharacterMoveComponent_1.EnableKuroAsyncRootMotion && !!this.n4u();
  }
  SetMovementData(t, e = false) {
    this.MovementData = t;
    this.CharacterMovement?.SetWalkableFloorAngle(this.MovementData.WalkableFloorAngle);
    if (e) {
      this.OnPositionStateChange();
    }
  }
  MU1() {
    if (UE.KuroStaticLibrary.IsObjectClassByName(this.AnimComp?.MainAnimInstance, CharacterNameDefines_1.CharacterNameDefines.ABP_BASERUNANIMAL) && (this.MaxMoveDegree = this.MovementData.CustomSetting00.Standing.ControllerRotationSpeedSetting.最大角度差, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Character", 42, "InitInputMoveLimit", ["EntityId", this.Entity.Id], ["MaxMoveDegree", this.MaxMoveDegree]);
    }
  }
  o4u() {
    this.DefaultMovementData = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.ActorComp.Actor.DtBaseMovementSetting, CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString());
    this.MovementData = this.DefaultMovementData;
    for (const t of DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(this.ActorComp.Actor.DtBaseMovementSetting)) {
      if (t.EnableTag.TagName !== "None") {
        this.MovementDataMap.set(t.EnableTag.TagId, t);
        if (this.TagComponent?.HasTag(t.EnableTag.TagId)) {
          this.MovementData = t;
        }
        this.TagComponent?.AddTagAddOrRemoveListener(t.EnableTag.TagId, this.i4u);
      }
    }
    this.CharacterMovement?.SetWalkableFloorAngle(this.MovementData.WalkableFloorAngle);
  }
  r4u() {
    for (var [t] of this.MovementDataMap) {
      this.TagComponent?.RemoveTagAddOrRemoveListener(t, this.i4u);
    }
    this.MovementDataMap.clear();
  }
};
CharacterMoveComponent.E71 = true;
CharacterMoveComponent.TempVelocity = Vector_1.Vector.Create();
CharacterMoveComponent = CharacterMoveComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(179)], CharacterMoveComponent);
exports.CharacterMoveComponent = CharacterMoveComponent; //# sourceMappingURL=CharacterMoveComponent.js.map