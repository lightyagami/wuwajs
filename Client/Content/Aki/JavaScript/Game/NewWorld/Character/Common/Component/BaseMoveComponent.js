"use strict";

var BaseMoveComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (h = t[a]) {
        r = (o < 3 ? h(r) : o > 3 ? h(i, e, r) : h(i, e)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMoveComponent = exports.GravityScale = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const CurveUtils_1 = require("../../../../../Core/Utils/Curve/CurveUtils");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const BasePlatform_1 = require("../../../Common/BasePlatform");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterAttributeTypes_1 = require("./Abilities/CharacterAttributeTypes");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
const MoveToLocationController_1 = require("./Move/MoveToLocationController");
const PROFILE_KEY = "CharacterMoveComponent_GetHeightAboveGround";
const ROTATION_AIM = 1500;
const HEIGHT_DETECT = 500;
const ROTATABLE_THREADHOLD = 0.5;
const BASE_MOVEMENT_VELOCITY_RATE = 0.2;
const SPEED_LOCK_FRAME = 5;
const INVALID_FORCE_SPEED = -100000000;
const OPEN_DEBUG = false;
const DEFAULT_MAX_FALLING_VELOCITY_2D = 700;
const DEFAULT_AIR_CONTROL = 0.05;
const WALK_OFF_LEDGE_DELAY_FRAME = 1;
class VelocityAddition {
  constructor(t, i, e, s, h, o, r) {
    this.ElapsedTime = -0;
    this.Duration = -0;
    this.Velocity = undefined;
    this.CurveFloat = undefined;
    this.MovementMode = -0;
    this.VelocityCurveType = 0;
    this.VelocityCurveMin = -0;
    this.VelocityCurveMax = -0;
    this.ElapsedTime = 0;
    this.Duration = t;
    this.Velocity = i;
    this.CurveFloat = e;
    this.MovementMode = s;
    this.VelocityCurveType = h;
    this.VelocityCurveMin = o;
    this.VelocityCurveMax = r;
  }
  VelocityCurveFunc(t) {
    let i = t;
    switch (this.VelocityCurveType) {
      case 1:
        i = MathUtils_1.MathUtils.BlendEaseIn(this.VelocityCurveMax, this.VelocityCurveMin, t, 2);
        break;
      case 3:
        i = MathUtils_1.MathUtils.BlendEaseIn(this.VelocityCurveMin, this.VelocityCurveMax, t - 1, 2);
        break;
      case 2:
        i = this.VelocityCurveMax + (this.VelocityCurveMin - this.VelocityCurveMax) * t;
    }
    return MathUtils_1.MathUtils.Clamp(i, 0, 1);
  }
}
class GravityScale {
  constructor(t = 0, i = 0, e = 0, s = 0, h = 0, o = 0) {
    this.ScaleUp = t;
    this.ScaleDown = i;
    this.ScaleTop = e;
    this.VelocityTop = s;
    this.Duration = h;
    this.ElapsedTime = o;
  }
}
exports.GravityScale = GravityScale;
class RotationSetting {
  constructor() {
    this.MinSpeed = 360;
    this.MaxSpeed = 600;
    this.MinOffset = 0;
    this.MaxOffset = 180;
    this.Curve = CurveUtils_1.CurveUtils.DefaultLinear;
  }
  ClearObject() {
    this.MinSpeed = 360;
    this.MaxSpeed = 600;
    this.MinOffset = 0;
    this.MaxOffset = 180;
    this.Curve = CurveUtils_1.CurveUtils.DefaultLinear;
    return true;
  }
  UpdateSettings(t) {
    this.MinSpeed = t.最小旋转速度;
    this.MaxSpeed = t.最大旋转速度;
    this.MinOffset = t.最小角度差;
    this.MaxOffset = t.最大角度差;
    this.Curve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.渐变曲线);
  }
  GetSpeed(t) {
    t = (t - this.MinOffset) / (this.MaxOffset - this.MinOffset);
    return this.MinSpeed + this.Curve.GetCurrentValue(t) * (this.MaxSpeed - this.MinSpeed);
  }
}
let BaseMoveComponent = BaseMoveComponent_1 = class BaseMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.IsInputDrivenCharacter = false;
    this.ActorComp = undefined;
    this.CharacterMovement = undefined;
    this.AnimComp = undefined;
    this.TimeScaleComp = undefined;
    this.MoveControllerInternal = undefined;
    this.HasMoveInput = false;
    this.ForceExitStateStop = false;
    this.IsMoving = false;
    this.Speed = 0;
    this.IsSpecialMove = false;
    this.NeedRootMotionWhenAttached = false;
    this.CanMoveWithDistanceInternal = true;
    this.CanMoveFromInputInternal = true;
    this.DeltaTimeSeconds = 0;
    this.JumpUpRate = 1;
    this.ConfigChainLengthSquared = -1;
    this.CurrentChainLengthSquared = 0;
    this.ChainCenter = Vector_1.Vector.Create();
    this.ForceSpeed = Vector_1.Vector.Create(INVALID_FORCE_SPEED, INVALID_FORCE_SPEED, INVALID_FORCE_SPEED);
    this.Acceleration = Vector_1.Vector.Create();
    this.PreviousVelocity = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpQuat2 = Quat_1.Quat.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.PreviousAimYaw = 0;
    this.AimYawRate = 0;
    this.IsFallingIntoWater = false;
    this.JumpFrameCount = 0;
    this.CharHeightAboveGround = -1;
    this.CharHeightAboveGroundDetectHeight = -1;
    this.CreatureProperty = undefined;
    this.DefaultMovementData = undefined;
    this.MovementDataMap = new Map();
    this.MovementData = undefined;
    this.B2r = undefined;
    this.b2r = new RotationSetting();
    this.UnifiedStateComponent = undefined;
    this.HasBaseMovement = false;
    this.OldMovementMode = undefined;
    this.IsHidden = false;
    this.HasDeltaBaseMovementData = false;
    this.DeltaBaseMovementOffset = undefined;
    this.DeltaBaseMovementSpeed = undefined;
    this.DeltaConveyBeltSpeed = undefined;
    this.DeltaBaseMovementQuat = Quat_1.Quat.Create();
    this.H__ = undefined;
    this.BasePlatform = undefined;
    this.IsLockedRotation = false;
    this.SpeedLockFrame = 0;
    this.VelocityVector = Vector_1.Vector.Create();
    this.IsStopInternal = false;
    this.DebugMovementSetting = undefined;
    this.UseDebugMovementSetting = false;
    this.WalkOffCount = 0;
    this.CannotResponseInputCount = 0;
    this.CapsuleOffset = undefined;
    this.SphereTrace = undefined;
    this.AccelerationChangeMoveState = undefined;
    this.AccelerationLerpCurve = undefined;
    this.FallingHorizontalMaxSpeed = DEFAULT_MAX_FALLING_VELOCITY_2D;
    this.DesireMaxAccelerationLerpTime = -0;
    this.MaxAccelerationLerpTime = -0;
    this.uha = false;
    this.cha = 0;
    this.TurnRate = 1;
    this.IsRegionMoveMode = false;
    this.GravityDirectInternal = Vector_1.Vector.Create(0, 0, -1);
    this.GravityUpInternal = Vector_1.Vector.Create(0, 0, 1);
    this.IsStandardGravityInternal = true;
    this.OnDirectionStateChange = (t, i) => {
      this.ResetMovementSetting(i);
      i = this.UnifiedStateComponent?.MoveState;
      this.ResetMaxSpeed(i);
      this.ResetCharacterMovementInfo(i);
    };
    this.OnMoveStateChange = (t, i) => {
      var e = this.UnifiedStateComponent?.DirectionState;
      this.ResetMovementSetting(e);
      this.ResetMaxSpeed(i);
      this.ResetCharacterMovementInfo(i);
    };
    this.OnPositionStateChange = () => {
      var t = this.UnifiedStateComponent?.DirectionState;
      this.ResetMovementSetting(t);
      var t = this.UnifiedStateComponent?.MoveState;
      this.ResetMaxSpeed(t);
      this.ResetCharacterMovementInfo(t);
    };
    this.JumpDelayTimer = undefined;
    this.GroundedTimeUe = 0;
    this.VelocityAdditionIncId = 1;
    this.VelocityAdditionMap = new Map();
    this.VelocityAdditionMapByMesh = new Map();
    this.AddMoveOffset = undefined;
    this.AddMoveRotation = Rotator_1.Rotator.Create();
    this.CurrentGravityScale = undefined;
    this.PauseLocks = new Map();
    this.MaxMoveDegree = 0;
    this.InputScale = 1;
  }
  SetForceSpeed(t) {
    if (t.ContainsNaN() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 6, "SetForceSpeed Contains NaN", ["speed", t]);
    }
    this.ForceSpeed.DeepCopy(t);
    if (this.ActorComp) {
      this.ActorComp.SetActorVelocity(this.ForceSpeed);
      this.ActorComp.ResetCachedVelocityTime();
    }
  }
  get IsJump() {
    return this.JumpFrameCount > 0;
  }
  get CurrentMovementSettings() {
    return this.B2r;
  }
  set CurrentMovementSettings(t) {
    this.B2r = t;
    this.b2r.UpdateSettings(t.ControllerRotationSpeedSetting);
  }
  SetGravityDirectWithoutRotate(t) {
    this.SetGravityDirectWithoutRotateByNumber(t.X, t.Y, t.Z);
  }
  SetGravityDirectWithoutRotateByNumber(t, i, e) {
    this.TmpVector.X = t;
    this.TmpVector.Y = i;
    this.TmpVector.Z = e;
    if (this.TmpVector.Normalize() && !this.GravityDirectInternal.Equals(this.TmpVector)) {
      this.IsStandardGravityInternal = MathUtils_1.MathUtils.IsNearlyEqual(this.TmpVector.Z, -1);
      if (this.IsStandardGravityInternal) {
        this.GravityDirectInternal.Set(0, 0, -1);
      } else {
        this.GravityDirectInternal.DeepCopy(this.TmpVector);
      }
      this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal);
      if (this.CharacterMovement) {
        this.CharacterMovement.Kuro_SetGravityDirect(this.GravityDirectInternal.ToUeVectorOld());
      }
      this.ActorComp.ResetGravityRelatedCachedTime();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharGravityDirectChanged, this.GravityDirect, this.IsStandardGravity);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AnyCharGravityDirectChanged, this.Entity, this.GravityDirect, this.IsStandardGravity);
    }
  }
  SetGravityDirectByNumber(t, i, e, s = true, h = -1) {
    this.TmpVector.X = t;
    this.TmpVector.Y = i;
    this.TmpVector.Z = e;
    if (this.TmpVector.Normalize() && !this.GravityDirectInternal.Equals(this.TmpVector)) {
      t = h > 0 ? h : Math.acos(Vector_1.Vector.DotProduct(this.GravityDirectInternal, this.TmpVector)) / Math.PI * 500;
      Quat_1.Quat.FindBetween(this.GravityDirectInternal, this.TmpVector, this.TmpQuat);
      this.IsStandardGravityInternal = MathUtils_1.MathUtils.IsNearlyEqual(this.TmpVector.Z, -1);
      if (this.IsStandardGravityInternal) {
        this.GravityDirectInternal.Set(0, 0, -1);
      } else {
        this.GravityDirectInternal.DeepCopy(this.TmpVector);
      }
      this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal);
      if (this.CharacterMovement && (this.CharacterMovement.Kuro_SetGravityDirect(this.GravityDirectInternal.ToUeVectorOld()), s) && this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
        this.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 3,
          Context: "[BaseMoveComponent.SetGravityDirectByNumber]"
        });
      }
      if (this.ActorComp.ActorUpProxy.DotProduct(this.TmpVector) > MathUtils_1.MathUtils.KindaSmallNumber - 1 && (this.TmpQuat.RotateVector(Vector_1.Vector.UpVectorProxy, this.TmpVector), this.TmpQuat.Multiply(this.ActorComp.ActorQuatProxy, this.TmpQuat2), this.TmpQuat2.Rotator(this.TmpRotator), this.AnimComp ? this.AnimComp.SetLocationAndRotatorWithModelBuffer(this.ActorComp.ActorLocationProxy.ToUeVector(), this.TmpRotator.ToUeRotator(), t, "SetGravity") : this.ActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "SetGravity"), this.ActorComp?.IsRoleAndCtrlByMe) && !this.Entity.GetComponent(65)?.IsLocalInput) {
        this.TmpQuat.RotateVector(this.ActorComp.InputDirectProxy, this.TmpVector);
        this.ActorComp.SetInputDirect(this.TmpVector, true);
        this.TmpQuat.RotateVector(this.ActorComp.InputFacingProxy, this.TmpVector);
        this.ActorComp.SetInputFacing(this.TmpVector, true);
      } else {
        this.ActorComp.ClearInput();
      }
      this.ActorComp.ResetGravityRelatedCachedTime();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharGravityDirectChanged, this.GravityDirect, this.IsStandardGravity);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AnyCharGravityDirectChanged, this.Entity, this.GravityDirect, this.IsStandardGravity);
    }
  }
  SetGravityDirect(t) {
    this.SetGravityDirectByNumber(t.X, t.Y, t.Z);
  }
  get GravityDirect() {
    return this.GravityDirectInternal;
  }
  get GravityUp() {
    if (this.GravityUpInternal.Equals(Vector_1.Vector.ZeroVectorProxy)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 4, "GravityUp is zero");
      }
      return Vector_1.Vector.UpVectorProxy;
    } else {
      return this.GravityUpInternal;
    }
  }
  get IsStandardGravity() {
    return this.IsStandardGravityInternal;
  }
  set AccelerationLerpTime(t) {
    this.DesireMaxAccelerationLerpTime = t;
    this.MaxAccelerationLerpTime = t;
  }
  get AccelerationLerpTime() {
    return this.DesireMaxAccelerationLerpTime;
  }
  SetFallingHorizontalMaxSpeed(t) {
    this.FallingHorizontalMaxSpeed = t;
  }
  ClearFallingHorizontalMaxSpeed() {
    this.FallingHorizontalMaxSpeed = DEFAULT_MAX_FALLING_VELOCITY_2D;
  }
  OnInit(t) {
    this.IsStandardGravityInternal = true;
    this.GravityDirectInternal.Set(0, 0, -1);
    this.GravityUpInternal.Set(0, 0, 1);
    return true;
  }
  OnStart() {
    this.InitGravityDirect();
    this.TimeScaleComp = this.Entity.GetComponent(131);
    return true;
  }
  SetUseDebugMovementSetting(t) {
    this.UseDebugMovementSetting = t;
  }
  SetDebugMovementSetting(t) {
    this.DebugMovementSetting = t;
  }
  ApplyDebugMovementSetting() {
    this.CurrentMovementSettings = this.DebugMovementSetting;
  }
  ResetMovementSettingByDirectionState(t) {
    switch (t) {
      case CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection:
        this.CurrentMovementSettings = this.MovementData.FaceDirection.Standing;
        break;
      case CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection:
        this.CurrentMovementSettings = this.MovementData.LockDirection.Standing;
        break;
      case CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection:
        this.CurrentMovementSettings = this.MovementData.AimDirection.Standing;
    }
  }
  ResetMovementSetting(t) {
    if (this.MovementData) {
      if (this.UseDebugMovementSetting) {
        this.ApplyDebugMovementSetting();
      } else {
        this.ResetMovementSettingByDirectionState(t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "以下BP_{Character}没有在蓝图中配置Dt_BaseMovementSetting找对应的蓝图负责人处理", ["Character", this.ActorComp.Actor.GetName()]);
    }
  }
  ResetMaxSpeed(t) {
    if (!(this.SpeedLockFrame > 0)) {
      var i = this.ActorComp.Actor.TsCharacterDebugComponent.MaxFixSpeed;
      switch (t) {
        case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.WalkSpeed ?? 0));
          break;
        case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.RunSpeed ?? 0));
          break;
        case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.SprintSpeed ?? 0));
          break;
        case CharacterUnifiedStateTypes_1.ECharMoveState.Swing:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.SwingSpeed ?? 0));
          break;
        default:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.RunSpeed ?? 0));
      }
    }
  }
  SetMaxSpeed(t) {
    var i = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    var t = t * (i /= CharacterAttributeTypes_1.PER_TEN_THOUSAND);
    if (this.CharacterMovement.MovementMode === 5) {
      this.CharacterMovement.MaxFlySpeed = t;
    } else {
      this.CharacterMovement.MaxWalkSpeed = t;
    }
  }
  ResetCharacterMovementInfo(t) {
    this.CharacterMovement.MaxWalkSpeedCrouched = this.CharacterMovement.MaxWalkSpeed;
    if (t === CharacterUnifiedStateTypes_1.ECharMoveState.Swing) {
      this.CharacterMovement.MaxAcceleration = this.CurrentMovementSettings?.SwingAcceleration ?? 0;
    } else {
      this.CharacterMovement.MaxAcceleration = this.CurrentMovementSettings?.Acceleration ?? 0;
    }
    this.CharacterMovement.GroundFriction = this.CurrentMovementSettings?.GroundFriction ?? 0;
  }
  SetAddMoveOffset(t) {
    if (t && !MathUtils_1.MathUtils.IsValidVector(t) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 6, "AddMove NaN", ["Actor", this.ActorComp.Actor.GetName()], ["Offset", t]);
    }
    this.AddMoveOffset = t;
    if (this.ActorComp.IsRoleAndCtrlByMe && t && t.SizeSquared() > 1000000 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 6, "AddMove超过了10米", ["Actor", this.ActorComp.Actor.GetName()], ["Offset", t]);
    }
  }
  SetAddMoveRotation(t) {
    this.AddMoveRotation.DeepCopy(t);
  }
  StopMove(t) {
    if (t) {
      this.ActorComp?.SetActorVelocity(Vector_1.Vector.ZeroVectorProxy);
      this.MoveController?.StopMove();
    }
    this.IsStopInternal = t;
  }
  StopMoveNew() {
    this.Speed = 0;
    this.ActorComp?.SetActorVelocity(Vector_1.Vector.ZeroVectorProxy);
    this.MoveController?.StopMove();
  }
  SetHiddenMovementMode(t) {
    if (t !== this.IsHidden) {
      if (t) {
        this.OldMovementMode = this.CharacterMovement?.MovementMode;
        this.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 0,
          Context: "[BaseMoveComponent.SetHiddenMovementMode] if true"
        });
      } else {
        this.ActorComp?.Actor.KuroSetMovementMode({
          Mode: this.OldMovementMode,
          Context: "[BaseMoveComponent.SetHiddenMovementMode]"
        });
      }
      this.IsHidden = t;
    }
  }
  OnInitData() {
    this.CurrentGravityScale = new GravityScale();
    this.ForceSpeed.Set(INVALID_FORCE_SPEED, INVALID_FORCE_SPEED, INVALID_FORCE_SPEED);
    return true;
  }
  InitTraceInfo() {
    this.SphereTrace = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.SphereTrace.WorldContextObject = this.ActorComp.Owner;
    this.SphereTrace.bIsSingle = true;
    this.SphereTrace.bIgnoreSelf = true;
    this.SphereTrace.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
  }
  InitBaseState() {
    switch (this.ActorComp.CreatureData.GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
        this.CharacterMovement.bKuroAutoActiveNav = false;
        this.CharacterMovement.bKuroStillBlockInNav = true;
        this.CharacterMovement.bProjectNavMeshWalking = false;
        this.IsInputDrivenCharacter = true;
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        this.CharacterMovement.bKuroAutoActiveNav = false;
        this.CharacterMovement.bKuroStillBlockInNav = true;
        this.CharacterMovement.bProjectNavMeshWalking = false;
        this.IsInputDrivenCharacter = false;
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        this.CharacterMovement.bKuroAutoActiveNav = false;
        this.CharacterMovement.bKuroStillBlockInNav = false;
        this.CharacterMovement.bProjectNavMeshWalking = false;
        this.IsInputDrivenCharacter = true;
        break;
      default:
        this.CharacterMovement.bKuroAutoActiveNav = false;
        this.CharacterMovement.bKuroStillBlockInNav = false;
        this.CharacterMovement.bProjectNavMeshWalking = true;
        this.IsInputDrivenCharacter = true;
    }
    this.CharacterMovement.bImpartBaseVelocityZ = false;
    this.CharacterMovement.bImpartBaseVelocityX = false;
    this.CharacterMovement.bImpartBaseVelocityY = false;
  }
  OnActivate() {
    this.OnMoveStateChange(CharacterUnifiedStateTypes_1.ECharMoveState.Stand, CharacterUnifiedStateTypes_1.ECharMoveState.Run);
    if (this.CharacterMovement.MovementMode === 2) {
      this.ActorComp?.Actor.KuroSetMovementMode({
        Mode: 1,
        Context: "[BaseMoveComponent.OnActivate]"
      });
    }
  }
  PrintAnimInstanceMovementInfo() {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Test", 57, "TickInfo:", ["HasMoveInput", this.HasMoveInput]);
    }
  }
  InitCreatureProperty() {
    var t = this.Entity.GetComponent(0);
    this.CreatureProperty = t.GetEntityPropertyConfig();
    this.CharacterMovement.Mass = this.CreatureProperty.重量;
    this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级;
    this.CharacterMovement.GoThroughPriority = this.CreatureProperty.穿透优先级;
  }
  InitGravityDirect() {
    var t = this.Entity.GetComponent(0);
    this.SetGravityDirect(Vector_1.Vector.Create(t.GetInitGravityDirection()));
  }
  ResetHitPriorityAndGoThrough() {
    if (this.CreatureProperty) {
      this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级;
      this.CharacterMovement.GoThroughPriority = this.CreatureProperty.穿透优先级;
    }
  }
  ResetMass() {
    if (this.CreatureProperty) {
      this.CharacterMovement.Mass = this.CreatureProperty.重量;
    }
  }
  CanResponseInput() {
    return this.CannotResponseInputCount === 0;
  }
  SetInfoVar() {
    if (this.DeltaTimeSeconds > MathUtils_1.MathUtils.SmallNumber) {
      this.Acceleration.DeepCopy(this.ActorComp.ActorVelocityProxy);
      this.Acceleration.SubtractionEqual(this.PreviousVelocity);
      this.Acceleration.DivisionEqual(this.DeltaTimeSeconds);
      this.AimYawRate = Math.abs(this.ActorComp.ActorRotationProxy.Yaw - this.PreviousAimYaw) / this.DeltaTimeSeconds;
    }
    var t = this.HasMoveInput;
    this.HasMoveInput = this.ActorComp.InputDirectProxy.SizeSquared() > MathUtils_1.MathUtils.SmallNumber && this.CharacterMovement.MaxAcceleration > MathUtils_1.MathUtils.SmallNumber;
    if (t !== this.HasMoveInput) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInputMoveChanged, t, this.HasMoveInput);
    }
  }
  CacheVar() {
    this.PreviousVelocity.DeepCopy(this.ActorComp.ActorVelocityProxy);
    this.PreviousAimYaw = this.ActorComp.ActorRotation.Yaw;
  }
  CanUpdateMovingRotation() {
    return this.UnifiedStateComponent.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection || !this.AnimComp?.Valid || !this.AnimComp.HasKuroRootMotion || this.AnimComp.MainAnimInstance.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_ROTATABLE, 0) >= ROTATABLE_THREADHOLD;
  }
  SetLockedRotation(t) {
    this.IsLockedRotation = t;
  }
  get LockedRotation() {
    return this.IsLockedRotation;
  }
  SmoothCharacterRotation(t, i, e, s = false, h = "Movement.SmoothCharacterRotation", o = true) {
    var r;
    if (!this.IsLockedRotation && !(r = this.ActorComp.ActorRotationProxy).Equals2(t)) {
      if (this.IsStandardGravity) {
        this.TmpRotator.DeepCopy(t);
        MathUtils_1.MathUtils.RotatorInterpConstantTo(r, this.TmpRotator, e, (o ? this.SpeedScaled(i) : i) * this.TurnRate, this.TmpRotator);
      } else {
        this.TmpRotator.DeepCopy(t);
        GravityUtils_1.GravityUtils.RotatorInterpConstantToForActor(this.ActorComp, r, this.TmpRotator, e, (o ? this.SpeedScaled(i) : i) * this.TurnRate, this.TmpRotator);
      }
      if (this.Entity.GetTickInterval() > 1 && this.AnimComp?.Valid && this.ActorComp.Owner.WasRecentlyRenderedOnScreen()) {
        t = this.AnimComp.GetMeshTransform();
        this.ActorComp.SetActorRotationWithPriority(this.TmpRotator.ToUeRotator(), h, 0, s);
        this.AnimComp.SetModelBuffer(t, e * MathUtils_1.MathUtils.SecondToMillisecond * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      } else {
        this.ActorComp.SetActorRotationWithPriority(this.TmpRotator.ToUeRotator(), h, 0, s);
      }
    }
  }
  ApplyForceSpeedAndRecordSpeed() {
    if (this.ForceSpeed.X !== INVALID_FORCE_SPEED) {
      this.ActorComp?.SetActorVelocity(this.ForceSpeed);
      this.ForceSpeed.X = INVALID_FORCE_SPEED;
    }
  }
  ConsumeForceFallingSpeed() {
    return true;
  }
  SetAddMoveWorldSpeedWithMesh(t, i) {
    var e;
    if (t) {
      e = this.VelocityAdditionMapByMesh.get(t) ?? 0;
      if (e = this.SetAddMoveWorld(i, -1, undefined, e)) {
        this.VelocityAdditionMapByMesh.set(t, e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 14, "[CharacterMoveComponent.SetAddMoveWorldSpeedWithMesh] 叠加位移失败，mesh为空");
    }
  }
  SetAddMoveWithMesh(t, i, e, s) {
    var h;
    if (t) {
      h = this.VelocityAdditionMapByMesh.get(t) ?? 0;
      i = this.ActorComp.ActorRotation.RotateVectorDouble(i);
      if (h = this.SetAddMoveWorld(i, e, s, h)) {
        this.VelocityAdditionMapByMesh.set(t, h);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 14, "[CharacterMoveComponent.SetAddMoveWithMesh] 叠加位移失败，mesh为空");
    }
  }
  SetAddMoveWorld(t, i, e, s, h, o = 0, r = 0, a = 1) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 14, "[CharacterMoveComponent.SetAddMoveWorldNew] 叠加位移失败，速度为空");
      }
      return 0;
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor && (a <= r || MathUtils_1.MathUtils.Clamp(r, 0, 1) !== r || MathUtils_1.MathUtils.Clamp(a, 0, 1) !== a)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 20, "速度曲线配置错误", ["Min", r], ["Max", a]);
      }
      return 0;
    }
    let n = undefined;
    if (s && (n = this.VelocityAdditionMap.get(s))) {
      if (t.ContainsNaN() && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "SetAddMoveWorld Contains NaN", ["speed", t]);
      }
      n.ElapsedTime = 0;
      n.Velocity = t;
      n.Duration = i;
      n.CurveFloat = e;
      n.MovementMode = h;
      return s;
    }
    n = new VelocityAddition(i, t, e, h ?? 0, o, r, a);
    s = ++this.VelocityAdditionIncId;
    this.VelocityAdditionMap.set(s, n);
    return s;
  }
  SetAddMoveWorldWithMesh(t, i, e, s) {
    var h;
    if (t) {
      h = this.VelocityAdditionMapByMesh.get(t) ?? 0;
      if (h = this.SetAddMoveWorld(i, e, s, h)) {
        this.VelocityAdditionMapByMesh.set(t, h);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 14, "[CharacterMoveComponent.SetAddMoveWorldWithMesh] 叠加位移失败，mesh为空");
    }
  }
  StopAddMove(t) {
    return this.VelocityAdditionMap.delete(t);
  }
  StopAddMoveWithMesh(t) {
    t = this.VelocityAdditionMapByMesh.get(t);
    return this.VelocityAdditionMap.delete(t);
  }
  StopAllAddMove() {
    this.VelocityAdditionMap.clear();
  }
  OnTick(t) {
    this.CharHeightAboveGround = -1;
    this.CharHeightAboveGroundDetectHeight = -1;
    this.CanMoveWithDistanceInternal = this.Entity.DistanceWithCamera <= 7000;
    if (this.uha && this.cha + WALK_OFF_LEDGE_DELAY_FRAME <= Time_1.Time.Frame) {
      this.cha = Time_1.Time.Frame;
      this.SetWalkOffLedge(this.WalkOffCount <= 0);
      this.uha = false;
    }
  }
  OnTickGravityScale() {
    if (!(this.CurrentGravityScale.Duration < 0)) {
      if (this.CurrentGravityScale.ElapsedTime >= this.CurrentGravityScale.Duration || this.UnifiedStateComponent?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
        if (OPEN_DEBUG && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 20, "OnTickGravityScale结束", ["Entity.Id", this.Entity.Id]);
        }
        this.CharacterMovement.GravityScale = 2;
        this.CurrentGravityScale.Duration = -1;
      } else {
        this.CurrentGravityScale.ElapsedTime += this.DeltaTimeSeconds;
        if (OPEN_DEBUG && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 20, "OnTickGravityScale", ["Entity.Id", this.Entity.Id]);
        }
        if (this.CurrentGravityScale.VelocityTop < Math.abs(this.CharacterMovement.Velocity.Z)) {
          this.CharacterMovement.GravityScale = (this.CharacterMovement.Velocity.Z > 0 ? this.CurrentGravityScale.ScaleUp : this.CurrentGravityScale.ScaleDown) * 2;
        } else {
          this.CharacterMovement.GravityScale = this.CurrentGravityScale.ScaleTop * 2;
        }
        if (OPEN_DEBUG && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 20, "受击重力", ["EntityId", this.Entity.Id], ["Velocity", this.CharacterMovement.Velocity.Z], ["GravityScale", this.CharacterMovement.GravityScale]);
        }
      }
    }
  }
  GetAndConsumeAddMove(t, i, e) {
    i.Reset();
    e.Reset();
    if (this.AddMoveOffset) {
      this.TmpVector.FromUeVector(this.AddMoveOffset);
      i.AdditionEqual(this.TmpVector);
      this.AddMoveOffset = undefined;
    }
    if (!this.AddMoveRotation.IsNearlyZero()) {
      e.DeepCopy(this.AddMoveRotation);
      this.AddMoveRotation.Reset();
    }
    if (this.VelocityAdditionMap.size !== 0) {
      BaseMoveComponent_1.VelocityAdditionTotal.Reset();
      for (var [s, h] of this.VelocityAdditionMap) {
        var o;
        if (h.Duration >= 0 && h.ElapsedTime >= h.Duration) {
          this.VelocityAdditionMap.delete(s);
        } else if (h.MovementMode && this.CharacterMovement.CustomMovementMode !== h.MovementMode) {
          this.VelocityAdditionMap.delete(s);
        } else {
          h.ElapsedTime += t;
          if (!(this.PauseLocks.size > 0)) {
            this.VelocityVector.FromUeVector(h.Velocity);
            if (h.VelocityCurveType !== 0) {
              o = h.VelocityCurveFunc(h.Duration > 0 ? h.ElapsedTime / h.Duration : 1);
              this.VelocityVector.FromUeVector(h.Velocity);
              this.VelocityVector.MultiplyEqual(o);
            } else if (h.CurveFloat?.IsValid()) {
              this.VelocityVector.MultiplyEqual(h.CurveFloat.GetFloatValue(h.Duration > 0 ? h.ElapsedTime / h.Duration : 1));
            }
            if (h.Duration > 0 && h.ElapsedTime > h.Duration) {
              o = h.ElapsedTime - h.Duration;
              this.VelocityVector.MultiplyEqual((t - o) / t);
            }
            BaseMoveComponent_1.VelocityAdditionTotal.AdditionEqual(this.VelocityVector);
            if (this.VelocityVector.ContainsNaN()) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Movement", 6, "VelocityVector NaN", ["key", s], ["VelocityVector", this.VelocityVector], ["velocityAddition.Velocity", h.Velocity], ["deltaTimeSeconds", t]);
              }
              this.VelocityAdditionMap.delete(s);
              return;
            }
          }
        }
      }
      BaseMoveComponent_1.VelocityAdditionTotal.Multiply(t, BaseMoveComponent_1.VelocityAdditionDestination);
      if (BaseMoveComponent_1.VelocityAdditionDestination.ContainsNaN()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Movement", 6, "VelocityAdditionDestination NaN", ["VelocityAdditionDestination", BaseMoveComponent_1.VelocityAdditionDestination], ["VelocityAdditionTotal", BaseMoveComponent_1.VelocityAdditionTotal], ["deltaTimeSeconds", t]);
        }
      } else {
        i.AdditionEqual(BaseMoveComponent_1.VelocityAdditionDestination);
      }
    }
  }
  GetHeightAboveGround(t = HEIGHT_DETECT) {
    var i;
    var e;
    if (!(this.CharHeightAboveGroundDetectHeight >= t)) {
      this.CharHeightAboveGroundDetectHeight = t;
      i = this.ActorComp.FloorLocation;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.SphereTrace, i);
      this.TmpVector.DeepCopy(i);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.ActorComp, this.TmpVector, -t);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.SphereTrace, this.TmpVector);
      this.SphereTrace.Radius = this.ActorComp.ScaledRadius;
      i = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.SphereTrace, PROFILE_KEY);
      e = this.SphereTrace.HitResult;
      if (i && e.bBlockingHit) {
        this.CharHeightAboveGround = e.TimeArray.Get(0) * t;
      } else {
        this.CharHeightAboveGround = t;
      }
    }
    return this.CharHeightAboveGround;
  }
  IsInAir() {
    return this.UnifiedStateComponent?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air;
  }
  IsInRoll() {
    return this.CharacterMovement?.MovementMode === 6 && this.CharacterMovement?.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL;
  }
  SetSpeedLock() {
    this.SpeedLockFrame = SPEED_LOCK_FRAME;
  }
  get FallingIntoWater() {
    return this.IsFallingIntoWater;
  }
  set FallingIntoWater(t) {
    this.IsFallingIntoWater = t;
  }
  MoveCharacter(t, i, e = "") {
    if (this.CharacterMovement?.MovementMode === 1 || this.CharacterMovement?.MovementMode === 2) {
      t.DivisionEqual(i);
      this.ActorComp.KuroMoveAlongFloor(t.ToUeVectorOld(), i, e || "MoveCharacter");
    } else {
      this.ActorComp.AddActorWorldOffset(t.ToUeVector(), e || "MoveCharacter", true);
    }
    this.ActorComp.ResetAllCachedTime();
  }
  SetWalkOffLedgeRecord(t) {
    if (t) {
      if (--this.WalkOffCount == 0) {
        this.uha = true;
        this.cha = Time_1.Time.Frame;
      }
    } else if (++this.WalkOffCount == 1) {
      this.uha = false;
      this.SetWalkOffLedge(false);
    }
  }
  SetWalkOffLedge(t) {
    if (t) {
      this.CharacterMovement.bCanWalkOffLedges = true;
      this.CharacterMovement.PerchRadiusThreshold = 0;
      this.CharacterMovement.PerchAdditionalHeight = 40;
    } else {
      this.CharacterMovement.bCanWalkOffLedges = false;
      this.CharacterMovement.PerchRadiusThreshold = this.ActorComp.ScaledRadius;
      this.CharacterMovement.PerchAdditionalHeight = this.ActorComp.ScaledRadius * 2;
    }
  }
  LerpMaxAcceleration() {
    var t;
    var i;
    if (!(this.DesireMaxAccelerationLerpTime <= 0)) {
      if (this.UnifiedStateComponent?.MoveState !== this.AccelerationChangeMoveState) {
        this.DesireMaxAccelerationLerpTime = 0;
      } else {
        i = this.CurrentMovementSettings?.Acceleration;
        this.DesireMaxAccelerationLerpTime -= this.DeltaTimeSeconds;
        t = (this.MaxAccelerationLerpTime - this.DesireMaxAccelerationLerpTime) / this.MaxAccelerationLerpTime;
        t = this.AccelerationLerpCurve.GetFloatValue(t);
        this.CharacterMovement.MaxAcceleration = t * i;
        i = (MathUtils_1.MathUtils.Clamp(t, 1, 2) - 1) * 0.8 + 1;
        this.SetMaxSpeed(this.CurrentMovementSettings.SprintSpeed * i);
      }
    }
  }
  UpdateGroundedRotation() {
    var t = GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(this.ActorComp);
    this.SmoothCharacterRotation(this.ActorComp.InputRotatorProxy, this.b2r.GetSpeed(t), this.DeltaTimeSeconds, false, "Movement.UpdateGroundedRotation.ROTATION_MEDIUM");
  }
  UpdateInAirRotation() {
    if (!!this.UnifiedStateComponent && (this.UnifiedStateComponent.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Glide || this.UnifiedStateComponent.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Slide)) {
      this.SmoothCharacterRotation(this.ActorComp.InputRotatorProxy, TsBaseRoleConfig_1.tsBaseRoleConfig.SmoothCharacterRotationSpeed, this.DeltaTimeSeconds, false, "Movement.UpdateInAirRotation");
    }
  }
  UpdateUsingControllerRotation() {
    this.SmoothCharacterRotation(this.ActorComp.InputRotatorProxy, ROTATION_AIM, this.DeltaTimeSeconds, false, "Movement.UpdateGroundedRotation.ROTATION_AIM");
  }
  UpdateBaseMovement() {
    var i = this.ActorComp.Actor.BasedMovement;
    var e = i?.MovementBase?.GetOwner();
    if (this.H__ !== e && !!(this.H__ = e) && !(e instanceof TsBaseCharacter_1.default) && i?.MovementBase?.Mobility === 2) {
      TickSystem_1.TickSystem.AddTickPrerequisiteActor(0, e, 2);
    }
    let t = false;
    e = BasePlatform_1.BasePlatformController.GetBasePlatformByBasedMovementInfo(i);
    if (this.HasBaseMovement !== i.bRelativeRotation || this.BasePlatform !== e) {
      this.HasBaseMovement = i.bRelativeRotation;
      this.BasePlatform = e;
      t = true;
    }
    if (this.HasBaseMovement && i?.MovementBase?.Mobility === 2) {
      var s = this.CharacterMovement.BaseDeltaQuat;
      this.DeltaBaseMovementQuat.FromUeQuat(s);
      this.DeltaBaseMovementOffset = new UE.VectorDouble(this.CharacterMovement.BaseDeltaPosition);
      let t = undefined;
      t = MathUtils_1.MathUtils.IsNearlyZero(this.DeltaTimeSeconds) ? new UE.VectorDouble(0, 0, 0) : this.DeltaBaseMovementOffset.op_Division(this.DeltaTimeSeconds * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      if (e && !e.IsDeltaBaseSpeedNeedZ) {
        t.Z = 0;
      }
      if (this.DeltaBaseMovementSpeed) {
        MathUtils_1.MathUtils.LerpVector(this.DeltaBaseMovementSpeed, t, BASE_MOVEMENT_VELOCITY_RATE, this.DeltaBaseMovementSpeed);
      } else {
        this.DeltaBaseMovementSpeed = t;
      }
      if ((Math.abs(this.DeltaBaseMovementSpeed.X) > 3000 || Math.abs(this.DeltaBaseMovementSpeed.Y) > 3000 || Math.abs(this.DeltaBaseMovementSpeed.Z) > 3000) && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 6, "异常惯性速度", ["Speed", this.DeltaBaseMovementSpeed], ["BasedMovement", i.MovementBase.GetOwner()?.GetName()]);
      }
      this.HasDeltaBaseMovementData = true;
    } else {
      this.DeltaBaseMovementQuat.Reset();
      this.DeltaBaseMovementSpeed = undefined;
      this.HasDeltaBaseMovementData = false;
    }
    if (t) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharBasePlatformChanged);
    }
  }
  SpeedScaled(t) {
    return t;
  }
  get CanMoveFromInput() {
    return this.CanMoveFromInputInternal;
  }
  set CanMoveFromInput(t) {
    this.CanMoveFromInputInternal = t;
  }
  CanMove() {
    return this.CanMoveFromInputInternal && (this.CanMoveWithDistanceInternal || this.UnifiedStateComponent.IsInFighting);
  }
  get CanMoveWithDistance() {
    return this.CanMoveWithDistanceInternal;
  }
  CanJumpPress() {
    return false;
  }
  CanWalkPress() {
    return false;
  }
  IsMovingToLocation() {
    return this.MoveController.IsMoving();
  }
  MoveToLocationEnd(t) {
    this.MoveController.MoveEnd(t);
  }
  StopMoveToLocation() {
    this.MoveController.StopMove();
  }
  MoveAlongPath(t) {
    if (this.MoveController.IsMoving()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 50, "[BaseMoveComponent.MoveAlongPath]正在移动中，停止当前移动", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Actor", this.ActorComp?.Owner?.GetName()], ["IsRunning", this.MoveController.IsMovingAlongPath()]);
      }
      this.MoveController.StopMove();
    }
    this.IsStopInternal = false;
    this.MoveController.MoveAlongPath(t);
  }
  get MoveController() {
    this.MoveControllerInternal ||= new MoveToLocationController_1.MoveToLocationController(this.Entity);
    return this.MoveControllerInternal;
  }
  SetTurnRate(t) {
    this.TurnRate = t;
  }
  ResetTurnRate() {
    this.TurnRate = 1;
  }
  SetAirControl(t) {
    this.CharacterMovement.AirControl = t;
  }
  ResetAirControl() {
    this.CharacterMovement.AirControl = DEFAULT_AIR_CONTROL;
  }
  OnClear() {
    super.OnClear();
    this.uha = false;
    return !(this.cha = 0);
  }
  AddPauseLock(t) {
    this.PauseLocks.set(t, true);
  }
  RemovePauseLock(t) {
    if (this.PauseLocks.get(t)) {
      this.PauseLocks.delete(t);
    }
  }
  SetInputMaxDegree(t) {
    this.MaxMoveDegree = t;
  }
  SetInputScale(t) {
    this.InputScale = t;
  }
  HasInputMoveLimit() {
    return this.MaxMoveDegree > 0;
  }
  GetFixInputMoveDirection(t, i) {
    if (this.ActorComp) {
      this.TmpVector.DeepCopy(t);
      if (!(MathUtils_1.MathUtils.GetAngleByVectorDot(this.ActorComp.ActorForwardProxy, t) <= this.MaxMoveDegree) && !this.TmpVector.IsNearlyZero()) {
        this.ActorComp.ActorForwardProxy.CrossProduct(this.TmpVector, this.TmpVector2);
        t = MathUtils_1.MathUtils.DotProduct(this.TmpVector2, this.ActorComp.ActorUpProxy) > 0;
        this.TmpVector2.DeepCopy(this.ActorComp.ActorForwardProxy);
        this.TmpVector2.RotateAngleAxis(t ? this.MaxMoveDegree : this.MaxMoveDegree * -1, this.ActorComp.ActorUpProxy, i);
        if (this.InputScale !== 1) {
          i.MultiplyEqual(this.InputScale);
        }
      }
    }
  }
};
BaseMoveComponent.BaseMoveInheritCurveInternal = undefined;
BaseMoveComponent.VelocityAdditionTotal = Vector_1.Vector.Create();
BaseMoveComponent.VelocityAdditionDestination = Vector_1.Vector.Create();
BaseMoveComponent = BaseMoveComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(46)], BaseMoveComponent);
exports.BaseMoveComponent = BaseMoveComponent; //# sourceMappingURL=BaseMoveComponent.js.map