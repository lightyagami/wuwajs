"use strict";

var NpcMoveComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var n = arguments.length;
  var r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        r = (n < 3 ? h(r) : n > 3 ? h(e, i, r) : h(e, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcMoveComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
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
const MIN_MOVE_SPEED = 20;
const MAX_IN_WATER_SPEED = 800;
const BASE_MOVE_INHERIT_TIME = 1.5;
let NpcMoveComponent = NpcMoveComponent_1 = class NpcMoveComponent extends BaseMoveComponent_1.BaseMoveComponent {
  constructor() {
    super(...arguments);
    this.CanResponseInputTasks = new Array();
    this.CachedDeltaYaw = 0;
    this.IsTurningInternal = false;
    this.OnPositionStateChanged = (t, e) => {
      if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
        this.IsFallingIntoWater = false;
        this.StopAddMove(this.AirInertiaHandler);
        this.AirInertiaHandler = 0;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 20, "OnPositionStateChanged:", ["NPCName:", this.ActorComp.Actor.GetName()], ["oldPositionState->", t], ["newPositionState", e]);
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
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          if (this.HasBaseMovement && !this.ActorComp.Actor.BasedMovement.bRelativeRotation && this.DeltaBaseMovementSpeed) {
            this.AirInertiaHandler = this.SetAddMoveWorld(this.DeltaBaseMovementSpeed, BASE_MOVE_INHERIT_TIME, NpcMoveComponent_1.BaseMoveInheritCurve, this.AirInertiaHandler);
          }
      }
    };
    this.AirInertiaHandler = 0;
  }
  static get Dependencies() {
    return [3];
  }
  get IsTurning() {
    return this.IsTurningInternal;
  }
  set IsTurning(t) {
    if (this.IsTurningInternal !== t) {
      if (this.IsTurningInternal = t) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharTurnBegin);
      } else {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharTurnEnd);
      }
    }
  }
  SetMaxSpeed(t) {
    let e = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    if (e <= 0) {
      e = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    }
    t *= e /= CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    if (this.CharacterMovement.MovementMode === 5) {
      this.CharacterMovement.MaxFlySpeed = t;
    } else {
      this.CharacterMovement.MaxWalkSpeed = t;
    }
  }
  OnClear() {
    super.OnClear();
    if (this.JumpDelayTimer) {
      TimerSystem_1.TimerSystem.Remove(this.JumpDelayTimer);
    }
    this.MoveController?.Dispose();
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
    this.AccelerationChangeMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    var t = this.Entity.GetComponent(3);
    return !!t.Valid && (this.IsHidden = false, this.ActorComp = t, this.CharacterMovement = t.Actor.CharacterMovement, this.CharacterMovement.GravityScale = 2, this.CharacterMovement.bRotationFollowBaseMovement = true, this.AnimComp = this.Entity.GetComponent(177), this.UnifiedStateComponent = this.Entity.GetComponent(101), this.CapsuleOffset = Vector_1.Vector.Create(0, 0, this.ActorComp.Radius - this.ActorComp.HalfHeight), this.InitCreatureProperty(), this.MovementData = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.ActorComp.Actor.DtBaseMovementSetting, CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString()), this.ActorComp.Actor.DtBaseMovementSetting && this.MovementData || Log_1.Log.CheckError() && Log_1.Log.Error("Character", 57, "以下BP_{Character}没有在蓝图中配置Dt_BaseMovementSetting找对应的蓝图负责人处理", ["Character", this.ActorComp.Actor.GetName()]), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChange), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, this.OnDirectionStateChange), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.OnPositionStateChanged), this.IsStopInternal = false, this.InitBaseState(), this.InitTraceInfo(), true);
  }
  static get BaseMoveInheritCurve() {
    this.BaseMoveInheritCurveInternal ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH, UE.CurveFloat);
    return this.BaseMoveInheritCurveInternal;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChange);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, this.OnDirectionStateChange);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.OnPositionStateChanged);
    for (const t of this.CanResponseInputTasks) {
      t.EndTask();
    }
    this.CanResponseInputTasks.length = 0;
    return !(this.IsHidden = false);
  }
  OnActivate() {
    var t;
    this.OnMoveStateChange(CharacterUnifiedStateTypes_1.ECharMoveState.Stand, CharacterUnifiedStateTypes_1.ECharMoveState.Run);
    this.OnPositionStateChanged(CharacterUnifiedStateTypes_1.ECharPositionState.Air, CharacterUnifiedStateTypes_1.ECharPositionState.Ground);
    if (this.CharacterMovement.MovementMode !== this.CharacterMovement.DefaultLandMovementMode) {
      t = ModelManager_1.ModelManager.WorldModel?.CurEnvironmentInfo.jNn === 1;
      if (this.Entity.IsEncloseSpace && t) {
        this.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 0,
          Context: "[NpcMoveComponent.OnActivate:人在山洞外,实体在山洞里的情况，将movementMode设成none防止掉落]"
        });
      } else {
        this.ActorComp?.Actor.KuroSetMovementMode({
          Mode: this.CharacterMovement.DefaultLandMovementMode,
          Context: "[NpcMoveComponent.OnActivate]"
        });
      }
    }
  }
  OnTick(i) {
    super.OnTick(i);
    if (this.ActorComp && (this.DeltaTimeSeconds = i * MathUtils_1.MathUtils.MillisecondToSecond, this.MoveController?.UpdateMove(this.DeltaTimeSeconds), this.SpeedLockFrame > 0 && --this.SpeedLockFrame, this.IsJump && --this.JumpFrameCount, this.LerpMaxAcceleration(), this.UpdateBaseMovement(), !this.IsSpecialMove)) {
      if (this.IsStopInternal) {
        this.Speed = 0;
      } else {
        this.Speed = this.ActorComp.ActorVelocityProxy.Size2D();
      }
      this.IsMoving = this.Speed > MIN_MOVE_SPEED;
      if (this.ActorComp.IsMoveAutonomousProxy) {
        this.UpdateMovementInput(this.ActorComp.InputDirect);
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
        if (h && e) {
          this.AnimComp.SetModelBuffer(t, i);
        }
        this.OnTickGravityScale();
        if (this.HasBaseMovement) {
          this.DeltaBaseMovementQuat.RotateVector(this.ActorComp.InputFacingProxy, this.TmpVector);
          this.ActorComp.SetInputFacing(this.TmpVector, true);
        }
        if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn) {
          this.PrintAnimInstanceMovementInfo();
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
  InitCreatureProperty() {
    var t = this.Entity.GetComponent(0);
    this.CreatureProperty = t.GetEntityPropertyConfig();
    this.CharacterMovement.Mass = this.CreatureProperty.重量;
    this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级;
    this.CharacterMovement.GoThroughPriority = this.CreatureProperty.穿透优先级;
  }
  GetAndConsumeAddMove(t, e, i) {
    e.Reset();
    i.Reset();
    if (this.AddMoveOffset) {
      this.TmpVector.FromUeVector(this.AddMoveOffset);
      e.AdditionEqual(this.TmpVector);
      this.AddMoveOffset = undefined;
    }
    if (!this.AddMoveRotation.IsNearlyZero()) {
      i.DeepCopy(this.AddMoveRotation);
      this.AddMoveRotation.Reset();
    }
    if (this.VelocityAdditionMap.size !== 0) {
      NpcMoveComponent_1.VelocityAdditionTotal.Reset();
      for (var [s, h] of this.VelocityAdditionMap) {
        if (h.Duration >= 0 && h.ElapsedTime >= h.Duration) {
          this.VelocityAdditionMap.delete(s);
        } else if (h.MovementMode && this.CharacterMovement.CustomMovementMode !== h.MovementMode) {
          this.VelocityAdditionMap.delete(s);
        } else {
          h.ElapsedTime += this.DeltaTimeSeconds;
          this.VelocityVector.FromUeVector(h.Velocity);
          if (h.CurveFloat?.IsValid()) {
            this.VelocityVector.MultiplyEqual(h.CurveFloat.GetFloatValue(h.Duration > 0 ? h.ElapsedTime / h.Duration : 1));
          }
          if (h.Duration > 0 && h.ElapsedTime > h.Duration) {
            s = h.ElapsedTime - h.Duration;
            h = (this.DeltaTimeSeconds - s) / this.DeltaTimeSeconds;
            this.VelocityVector.MultiplyEqual(h);
          }
          NpcMoveComponent_1.VelocityAdditionTotal.AdditionEqual(this.VelocityVector);
        }
      }
      BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionTotal.Multiply(t, BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionDestination);
      if (BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionDestination.ContainsNaN()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Movement", 6, "VelocityAdditionDestination NaN", ["VelocityAdditionDestination", BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionDestination], ["VelocityAdditionTotal", BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionTotal], ["deltaTimeSeconds", t]);
        }
      } else {
        e.AdditionEqual(BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionDestination);
      }
    }
  }
  UpdateMovementInput(t) {
    switch (this.UnifiedStateComponent?.PositionState) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
        this.ActorComp.Actor.D_AddMovementInput(t, this.AnimComp?.Valid ? this.AnimComp.GetWalkRunMix() : 1, false);
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
        this.ActorComp.Actor.D_AddMovementInput(t, 1, false);
    }
  }
  UpdateFacing() {
    if (this.CanUpdateMovingRotation()) {
      if (this.ActorComp.OverrideTurnSpeed) {
        this.SmoothCharacterRotation(this.ActorComp.InputRotatorProxy, this.ActorComp.OverrideTurnSpeed, this.DeltaTimeSeconds, false, "Movement.UpdateFacing");
        this.ActorComp.SetOverrideTurnSpeed(undefined);
      } else {
        this.UpdateGroundedRotation();
      }
    }
  }
};
NpcMoveComponent = NpcMoveComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(181)], NpcMoveComponent);
exports.NpcMoveComponent = NpcMoveComponent; //# sourceMappingURL=NpcMoveComponent.js.map