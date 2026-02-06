"use strict";

var CharacterFloatingComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var a = arguments.length;
  var n = a < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        n = (a < 3 ? h(n) : a > 3 ? h(i, e, n) : h(i, e)) || n;
      }
    }
  }
  if (a > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterFloatingComponent = undefined;
const ue_1 = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StateBase_1 = require("../../../../../../Core/Utils/StateMachine/StateBase");
const StateMachine_1 = require("../../../../../../Core/Utils/StateMachine/StateMachine");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../Global");
const InputEnums_1 = require("../../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
const PROFILE_KEY = "Floating";
const TRACE_ERROR_VALUE = 1;
const COMPONENT_DISABLE_KEY = -1;
const FAST_MOVE_MIX = 1;
const NORMAL_MOVE_MIX = 0.5;
const MAX_FLOOR_DIST = 999999999;
const WATER_TRACE_DEPTH = 550;
const TRACE_ERROR_THRESHOLD = 3;
const DEFAULT_DA_PATH = "/Game/Aki/Character/Role/FemaleZ2/AimisiGD/Data/DA_FloatingMovementConfig.DA_FloatingMovementConfig";
const emptyArray = [];
class MovementStateConfig {
  constructor() {
    this.Mode = 0;
    this.MovementTagList = [];
    this.BannedMovementTagList = [];
    this.MoveTagList = [];
    this.StandTagList = [];
  }
  SetConfig(i) {
    this.Mode = i.Mode;
    this.MovementTagList.length = 0;
    var e = i.MovementTagList.GameplayTags.Num();
    for (let t = 0; t < e; t++) {
      this.MovementTagList.push(i.MovementTagList.GameplayTags.Get(t).TagId);
    }
    this.BannedMovementTagList.length = 0;
    var s = i.BannedMovementTagList.GameplayTags.Num();
    for (let t = 0; t < s; t++) {
      this.BannedMovementTagList.push(i.BannedMovementTagList.GameplayTags.Get(t).TagId);
    }
    this.MoveTagList.length = 0;
    var h = i.MoveTagList.GameplayTags.Num();
    for (let t = 0; t < h; t++) {
      this.MoveTagList.push(i.MoveTagList.GameplayTags.Get(t).TagId);
    }
    this.StandTagList.length = 0;
    var a = i.StandTagList.GameplayTags.Num();
    for (let t = 0; t < a; t++) {
      this.StandTagList.push(i.StandTagList.GameplayTags.Get(t).TagId);
    }
  }
}
class FloatingMovementConfig {
  constructor() {
    this.MoveSpeed = 600;
    this.SprintSpeed = 1200;
    this.TurnSpeedDeg = 360;
    this.AnimLerpAlpha = 0.1;
    this.SpeedAcceleration = 0.5;
    this.DirectionLerpAlpha = 0.1;
    this.EnergyRecoverSpeed = 10;
    this.EnergyRecoverCoolDownTime = 3;
    this.AirCriticalHeight = 500;
    this.CloseToGroundHeight = 550;
    this.AirEnergyConsumption = 10;
    this.DodgeEnergyConsumption = 10;
    this.DropEnergyConsumption = 5;
    this.FastMoveEnergyConsumption = 15;
    this.MoveEnergyConsumption = 15;
    this.RiseEnergyConsumption = 20;
    this.SprintEnergyConsumption = 20;
    this.RiseSpeed = 300;
    this.DropSpeed = 200;
    this.ForbidRotationTagList = [];
    this.ForbidCloseToGroundTagList = [];
    this.DefaultMoveModeConfig = new MovementStateConfig();
    this.FloatingMoveModeConfig = new MovementStateConfig();
    this.RiseMoveModeConfig = new MovementStateConfig();
    this.DropMoveModeConfig = new MovementStateConfig();
    this.WalkMoveModeConfig = new MovementStateConfig();
  }
  Init(i) {
    this.MoveSpeed = i.MoveSpeed;
    this.SprintSpeed = i.SprintSpeed;
    this.TurnSpeedDeg = i.TurnSpeedDeg;
    this.EnergyRecoverSpeed = i.EnergyRecoverSpeed;
    this.EnergyRecoverCoolDownTime = i.EnergyRecoverCoolDownTime;
    this.AirCriticalHeight = i.AirCriticalHeight;
    this.CloseToGroundHeight = i.CloseToGroundHeight;
    this.AirEnergyConsumption = i.AirEnergyConsumption;
    this.DodgeEnergyConsumption = i.DodgeEnergyConsumption;
    this.DropEnergyConsumption = i.DropEnergyConsumption;
    this.FastMoveEnergyConsumption = i.FastMoveEnergyConsumption;
    this.MoveEnergyConsumption = i.MoveEnergyConsumption;
    this.RiseEnergyConsumption = i.RiseEnergyConsumption;
    this.SprintEnergyConsumption = i.SprintEnergyConsumption;
    this.RiseSpeed = i.RiseSpeed;
    this.DropSpeed = i.DropSpeed;
    this.AnimLerpAlpha = i.AnimLerpAlpha;
    this.SpeedAcceleration = i.SpeedAcceleration;
    this.DirectionLerpAlpha = i.DirectionLerpAlpha;
    for (let t = 0; t < i?.ForbidRotationTagList.GameplayTags.Num(); t++) {
      this.ForbidRotationTagList.push(i.ForbidRotationTagList.GameplayTags.Get(t).TagId);
    }
    for (let t = 0; t < i?.ForbidCloseToGrounTagList.GameplayTags.Num(); t++) {
      this.ForbidCloseToGroundTagList.push(i.ForbidCloseToGrounTagList.GameplayTags.Get(t).TagId);
    }
    this.DefaultMoveModeConfig.SetConfig(i.DefaultMode);
    this.FloatingMoveModeConfig.SetConfig(i.FloatingMode);
    this.RiseMoveModeConfig.SetConfig(i.RiseMode);
    this.DropMoveModeConfig.SetConfig(i.DropMode);
    this.WalkMoveModeConfig.SetConfig(i.WalkMode);
  }
}
class FloatingBaseState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.IsMoved = undefined;
  }
  OnEnter(t) {
    super.OnEnter(t);
    this.OnEnterInternal();
  }
  OnReEnter() {
    super.OnReEnter();
    this.OnEnterInternal();
  }
  CanReEnter() {
    return true;
  }
  CanContiuneState() {
    return !this.Owner.TagComp.HasAnyTag(this.GetBannedStateConfigTagList());
  }
  CanChangeFrom(t) {
    return !!super.CanChangeFrom(t) && this.CanContiuneState();
  }
  OnEnterInternal() {
    this.Owner.FloatingMoveType = this.State;
    this.Owner.StateComp.SetMoveState(this.GetMoveState());
    this.AddTagList();
    if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换至状态", ["EntityId", this.Owner.Entity.Id], ["State", this.Owner.GetStateName(this.State)]);
    }
  }
  GetMoveState() {
    return CharacterUnifiedStateTypes_1.ECharMoveState.Other;
  }
  OnUpdate(t) {
    super.OnUpdate(t);
    if (this.Owner.AnimComp.GetAnimInstance().HasKuroRootMotionAnim()) {
      this.Owner.SpeedInternal = this.Owner.ActorComp.ActorVelocity.Size();
      this.Owner.FloatingMoveMixInternal = 0;
      this.Owner.MoveDelta.DeepCopy(this.Owner.MoveComp.CharacterMovement.AnimRootMotionVelocity);
      this.Owner.MoveDelta.MultiplyEqual(t);
      this.Owner.CloseToGround(t);
      if (!this.Owner.MoveDelta.IsNearlyZero()) {
        this.Owner.MoveComp.MoveCharacter(this.Owner.MoveDelta, t, "CharacterFloatingComponent.Move");
      }
      this.wPg(!this.Owner.MoveDelta.IsNearlyZero());
      this.Owner.DetectFloor();
      this.Owner.CheckGround();
      this.Owner.ClearCacheInputDirect();
    } else if (this.Owner.TagComp.HasAnyTag(this.Owner.Config.ForbidRotationTagList)) {
      this.Owner.SpeedInternal = 0;
      this.Owner.FloatingMoveMixInternal = 0;
      this.wPg(false);
      this.Owner.DetectFloor();
      this.Owner.CheckGround();
      this.Owner.ClearCacheInputDirect();
    } else {
      this.Owner.UpdateSpeed(t);
      this.UpdateActorRotation(t);
      this.UpdateActorLocation(t);
      this.wPg(!this.Owner.MoveDelta.IsNearlyZero());
      this.Owner.DetectFloor();
      this.Owner.CheckGround();
      this.PostUpdate();
    }
  }
  PostUpdate() {}
  OnExit(t) {
    super.OnExit(t);
    this.OnExitInternal();
  }
  OnExitInternal() {
    this.RemoveTagList();
    this.PPg();
  }
  GetInStateConfigTagList() {
    return emptyArray;
  }
  GetBannedStateConfigTagList() {
    return emptyArray;
  }
  GetMoveConfigTagList() {
    return emptyArray;
  }
  GetStandConfigTagList() {
    return emptyArray;
  }
  UpdateActorRotation(t) {}
  UpdateActorLocation(t) {
    this.Owner.UpdateMove(t, this.Owner.MoveDelta);
    this.Owner.CloseToGround(t);
    if (!this.Owner.MoveDelta.IsNearlyZero()) {
      this.Owner.MoveComp.MoveCharacter(this.Owner.MoveDelta, t * MathUtils_1.MathUtils.SecondToMillisecond, "CharacterFloatingComponent.Move");
    }
  }
  AddTagList() {
    var t = this.GetInStateConfigTagList();
    if (!(t.length <= 0)) {
      for (const i of t) {
        this.Owner.TagComp.AddTag(i);
      }
    }
  }
  RemoveTagList() {
    var t = this.GetInStateConfigTagList();
    if (!(t.length <= 0)) {
      for (const i of t) {
        this.Owner.TagComp.RemoveTag(i);
      }
    }
  }
  wPg(t) {
    if (this.Owner.TagComp.HasTag(-1371021686)) {
      this.PPg();
    } else if (this.IsMoved !== t) {
      this.IsMoved = t;
      this.APg(t);
      this.DPg(!t);
    }
  }
  PPg() {
    this.APg(false);
    this.DPg(false);
    this.IsMoved = undefined;
  }
  APg(t) {
    var i = this.GetMoveConfigTagList();
    if (!(i.length <= 0)) {
      for (const e of i) {
        if (t) {
          this.Owner.TagComp.AddTag(e);
        } else {
          this.Owner.TagComp.RemoveTag(e);
        }
      }
    }
  }
  DPg(t) {
    var i = this.GetStandConfigTagList();
    if (!(i.length <= 0)) {
      for (const e of i) {
        if (t) {
          this.Owner.TagComp.AddTag(e);
        } else {
          this.Owner.TagComp.RemoveTag(e);
        }
      }
    }
  }
}
class DefaultState extends FloatingBaseState {
  OnEnterInternal() {
    super.OnEnterInternal();
    this.Owner.DetectFloor();
    this.Owner.CheckGround();
  }
  GetMoveState() {
    return CharacterUnifiedStateTypes_1.ECharMoveState.Other;
  }
  GetInStateConfigTagList() {
    return this.Owner.Config.DefaultMoveModeConfig.MovementTagList;
  }
  GetBannedStateConfigTagList() {
    return this.Owner.Config.DefaultMoveModeConfig.BannedMovementTagList;
  }
  GetMoveConfigTagList() {
    return this.Owner.Config.DefaultMoveModeConfig.MoveTagList;
  }
  GetStandConfigTagList() {
    return this.Owner.Config.DefaultMoveModeConfig.StandTagList;
  }
  OnUpdate(t) {
    if (this.CanContiuneState()) {
      super.OnUpdate(t);
    } else {
      if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Drop(From: Other)"], ["Reason", "不满足Floating条件"]);
      }
      this.StateMachine.Switch(3);
    }
  }
}
class FloatingState extends FloatingBaseState {
  OnEnterInternal() {
    super.OnEnterInternal();
    this.Owner.DetectFloor();
    this.Owner.CheckGround();
  }
  GetMoveState() {
    return CharacterUnifiedStateTypes_1.ECharMoveState.Floating;
  }
  GetInStateConfigTagList() {
    return this.Owner.Config.FloatingMoveModeConfig.MovementTagList;
  }
  GetBannedStateConfigTagList() {
    return this.Owner.Config.FloatingMoveModeConfig.BannedMovementTagList;
  }
  GetMoveConfigTagList() {
    return this.Owner.Config.FloatingMoveModeConfig.MoveTagList;
  }
  GetStandConfigTagList() {
    return this.Owner.Config.FloatingMoveModeConfig.StandTagList;
  }
  OnUpdate(t) {
    if (this.CanContiuneState()) {
      super.OnUpdate(t);
    } else {
      if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Drop(From: Floating)"], ["Reason", "不满足Floating条件"]);
      }
      this.StateMachine.Switch(3);
    }
  }
}
class RiseState extends FloatingBaseState {
  OnEnterInternal() {
    super.OnEnterInternal();
    this.Owner.CheckGround();
  }
  GetMoveState() {
    return CharacterUnifiedStateTypes_1.ECharMoveState.Rise;
  }
  GetInStateConfigTagList() {
    return this.Owner.Config.RiseMoveModeConfig.MovementTagList;
  }
  GetBannedStateConfigTagList() {
    return this.Owner.Config.RiseMoveModeConfig.BannedMovementTagList;
  }
  GetMoveConfigTagList() {
    return this.Owner.Config.RiseMoveModeConfig.MoveTagList;
  }
  GetStandConfigTagList() {
    return this.Owner.Config.RiseMoveModeConfig.StandTagList;
  }
  OnUpdate(t) {
    if (this.CanContiuneState()) {
      super.OnUpdate(t);
    } else {
      if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Drop(From: Rise)"], ["Reason", "不满足Rise条件"]);
      }
      this.StateMachine.Switch(3);
    }
  }
  UpdateActorLocation(t) {
    this.Owner.UpdateMove(t, this.Owner.MoveDelta);
    this.Owner.TempVector2.DeepCopy(this.Owner.MoveComp.GravityUp);
    this.Owner.TempVector2.MultiplyEqual(this.Owner.Config.RiseSpeed * t);
    this.Owner.MoveDelta.AdditionEqual(this.Owner.TempVector2);
    if (!this.Owner.MoveDelta.IsNearlyZero()) {
      this.Owner.MoveComp.MoveCharacter(this.Owner.MoveDelta, t * MathUtils_1.MathUtils.SecondToMillisecond, "CharacterFloatingComponent.Move");
    }
  }
  PostUpdate() {
    if (this.Owner.DetectCeiling() && (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Floating(From: Rise)"], ["Reason", "Rise检测到天花板"]), this.StateMachine.Switch(1))) {
      if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Drop(From: Rise)"], ["Reason", "Rise检测到天花板,但切换到Floating失败"]);
      }
      this.StateMachine.Switch(3);
    }
  }
}
class DropState extends FloatingBaseState {
  OnEnterInternal() {
    super.OnEnterInternal();
    this.Owner.DetectFloor();
    this.Owner.CheckGround();
  }
  GetMoveState() {
    return CharacterUnifiedStateTypes_1.ECharMoveState.Drop;
  }
  CanContiuneState() {
    return !!super.CanContiuneState() && !this.Owner.IsOnGround && !this.Owner.IsOnWater;
  }
  GetInStateConfigTagList() {
    return this.Owner.Config.DropMoveModeConfig.MovementTagList;
  }
  GetBannedStateConfigTagList() {
    return this.Owner.Config.DropMoveModeConfig.BannedMovementTagList;
  }
  GetMoveConfigTagList() {
    return this.Owner.Config.DropMoveModeConfig.MoveTagList;
  }
  GetStandConfigTagList() {
    return this.Owner.Config.DropMoveModeConfig.StandTagList;
  }
  OnUpdate(t) {
    if (this.CanContiuneState()) {
      super.OnUpdate(t);
    } else {
      if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Walk(From: Drop)"], ["Reason", "不满足Drop条件"]);
      }
      this.StateMachine.Switch(4);
    }
  }
  UpdateActorLocation(t) {
    this.Owner.UpdateMove(t, this.Owner.MoveDelta);
    this.Owner.TempVector2.DeepCopy(this.Owner.MoveComp.GravityDirect);
    this.Owner.TempVector2.MultiplyEqual(this.Owner.Config.DropSpeed * t);
    this.Owner.MoveDelta.AdditionEqual(this.Owner.TempVector2);
    if (!this.Owner.MoveDelta.IsNearlyZero()) {
      this.Owner.MoveComp.MoveCharacter(this.Owner.MoveDelta, t * MathUtils_1.MathUtils.SecondToMillisecond, "CharacterFloatingComponent.Move");
    }
  }
  PostUpdate() {
    if (this.Owner.IsOnGround || this.Owner.IsOnWater) {
      if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Floating(From: Drop)"], ["Reason", "Drop检测到地面"]);
      }
      if (!this.StateMachine.Switch(1)) {
        if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Walk(From: Drop)"], ["Reason", "Drop检测到地面,但切换到Floating失败"]);
        }
        this.StateMachine.Switch(4);
      }
    }
  }
}
class WalkState extends FloatingBaseState {
  OnEnterInternal() {
    super.OnEnterInternal();
    this.Owner.DetectFloor();
    this.Owner.CheckGround();
  }
  GetMoveState() {
    return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
  }
  GetInStateConfigTagList() {
    return this.Owner.Config.WalkMoveModeConfig.MovementTagList;
  }
  GetBannedStateConfigTagList() {
    return this.Owner.Config.WalkMoveModeConfig.BannedMovementTagList;
  }
  GetMoveConfigTagList() {
    return this.Owner.Config.WalkMoveModeConfig.MoveTagList;
  }
  GetStandConfigTagList() {
    return this.Owner.Config.WalkMoveModeConfig.StandTagList;
  }
  OnUpdate(t) {
    if (this.CanContiuneState()) {
      super.OnUpdate(t);
    } else {
      if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Floating(From: Walk)"], ["Reason", "不满足Walk条件"]);
      }
      this.StateMachine.Switch(1);
    }
  }
  PostUpdate() {
    if (!this.Owner.IsOnGround && !this.Owner.IsOnWater) {
      if (CharacterFloatingComponent.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Owner.Entity.Id], ["State", "Drop(From: Walk)"], ["Reason", "Walk检测到空中"]);
      }
      this.StateMachine.Switch(3);
    }
  }
}
let CharacterFloatingComponent = CharacterFloatingComponent_1 = class CharacterFloatingComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.InFloatingState = false;
    this.InLockTargetState = false;
    this.SpeedInternal = 0;
    this.IsSprintMove = false;
    this.FloatingMoveMixInternal = 1;
    this.FloatingSpeedMixInternal = 1;
    this.FloatingMoveType = 0;
    this.HadFloatingMoveInput = false;
    this.HasFloatingMoveInput = false;
    this.IsOnWater = false;
    this.WaterDist = 0;
    this.CurrentFloor = undefined;
    this.HitFloorNonFloor = false;
    this.HitFloorDist = 0;
    this.IsNearGround = false;
    this.NearGroundDist = 0;
    this.IsOnGround = false;
    this.HasGroundTag = false;
    this.HasAirTag = false;
    this.WasNearGround = false;
    this.WasNearGroundDist = 0;
    this.WasOnGround = false;
    this.Config = undefined;
    this.TagComp = undefined;
    this.MoveComp = undefined;
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.StateComp = undefined;
    this.TimeScaleComp = undefined;
    this.Lle = undefined;
    this.vsg = COMPONENT_DISABLE_KEY;
    this.MoveDelta = Vector_1.Vector.Create();
    this.TempVector = Vector_1.Vector.Create();
    this.TempVector2 = Vector_1.Vector.Create();
    this.TempVector3 = Vector_1.Vector.Create();
    this.TempInputDirection = Vector_1.Vector.Create();
    this.TempRotator = Rotator_1.Rotator.Create();
    this.qPf = () => {
      var t;
      if (this.StateComp?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Floating) {
        this.MoveComp?.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 6,
          CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_FLOATING,
          Context: "[CharacterFloatingComponent.Enter]"
        });
      }
      if (this.vsg !== COMPONENT_DISABLE_KEY) {
        t = this.vsg;
        this.vsg = COMPONENT_DISABLE_KEY;
        this.Enable(t, "[悬浮模式][总开关]开启悬浮组件Tick功能");
      }
    };
    this.DVr = (t, i) => {
      if (this.InFloatingState) {
        if (i === CharacterUnifiedStateTypes_1.ECharPositionState.Floating) {
          if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Floating"], ["Reason", "PositionState进入Floating"], ["oldPositionState", t]);
          }
          this.UPg();
        } else if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Floating) {
          if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "None"], ["Reason", "PositionState离开Floating"], ["newPositionState", i]);
          }
          this.jUg();
        }
        this.ClearCacheInputDirect();
      }
    };
    this.P3r = (t, i) => {
      if (i !== CharacterUnifiedStateTypes_1.ECharMoveState.Floating && i !== CharacterUnifiedStateTypes_1.ECharMoveState.Rise && i !== CharacterUnifiedStateTypes_1.ECharMoveState.Drop && i !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk) {
        if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "None"], ["Reason", "UnifiedMoveState不是Flotaing/Rise/Drop/Walk"], ["newMoveState", i]);
        }
        this.jUg();
      }
    };
    this.I3r = t => {
      var i;
      if (t?.Valid && (i = t.GetComponent(186))?.Valid && (t = t.GetComponent(39))?.Valid && t.InFloatingState) {
        if (this.InFloatingState) {
          if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["PositionState", i.PositionState], ["Reason", "动作继承"]);
          }
          this.StateComp.SetPositionState(i.PositionState);
        } else if (!t.IsNearGround) {
          this.StateComp.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
          this.StateComp.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
        }
      }
    };
    this.j5g = () => {
      if (this.InFloatingState) {
        this.DetectFloor();
        this.CheckGround();
      }
    };
    this.oGr = (t, i) => {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "None"], ["Reason", "OnBeginSkill"]);
      }
      this.jUg();
      this.ClearCacheInputDirect();
    };
    this.ene = (t, i) => {
      if (this.StateComp.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Floating) {
        if (this.FloatingMoveType === 0 || this.FloatingMoveType === 3) {
          if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Floating"], ["Reason", "OnCharSkillEnd"]);
          }
          this.UPg();
        }
        this.ClearCacheInputDirect();
      }
    };
    this.lF1 = (t, i) => {
      if (this.InFloatingState && t !== i && this.Entity === i?.Entity) {
        this.WasNearGround = this.IsNearGround;
        this.WasNearGroundDist = this.NearGroundDist;
        this.WasOnGround = this.IsOnGround;
        this.MoveComp?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
        this.SpeedInternal = 0;
      }
    };
    this.xie = (t, i) => {
      if (this.Config && this.InFloatingState) {
        if (t.Id === this.Entity.Id) {
          if (this.StateComp.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Floating) {
            return;
          }
          if (this.FloatingMoveType === 0 || this.FloatingMoveType === 3) {
            if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Floating"], ["Reason", "切到自己"]);
            }
            this.UPg();
          }
          this.ClearCacheInputDirect();
        }
        if (i?.Id === this.Entity.Id) {
          if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "None"], ["Reason", "切到其他人"]);
          }
          this.jUg();
          this.ClearCacheInputDirect();
        }
      }
    };
    this.bng = undefined;
    this.Rng = undefined;
    this.jPf = undefined;
  }
  static get Dependencies() {
    return [189];
  }
  get IsFloating() {
    return this.InFloatingState;
  }
  get IsFloatingMove() {
    return this.Speed > 1;
  }
  get FloatingLocalDirection() {
    this.TempVector.FromUeVector(this.ActorComp.ActorTransform.InverseTransformVector(this.TempInputDirection.ToUeVector()));
    return this.TempVector;
  }
  get FloatingMoveMix() {
    return this.FloatingMoveMixInternal;
  }
  get FloatingSpeedMix() {
    return this.FloatingSpeedMixInternal;
  }
  get Speed() {
    return this.SpeedInternal;
  }
  OnInit() {
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(3);
    this.MoveComp = this.Entity.GetComponent(189);
    this.StateComp = this.Entity.GetComponent(186);
    this.TagComp = this.Entity.GetComponent(217);
    this.AnimComp = this.Entity.GetComponent(188);
    this.TimeScaleComp = this.Entity.GetComponent(190);
    this.WPf();
    this.Lng();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.P3r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoUpEnable, this.j5g);
    this.vsg = this.Disable("悬浮组件默认禁用");
    return true;
  }
  OnEnable() {
    if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Floating"], ["Reason", "OnEnable"]);
    }
    this.UPg(true);
    this.ClearCacheInputDirect();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.oGr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
  }
  OnDisable(t) {
    this.ClearCacheInputDirect();
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.oGr)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.oGr);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
    }
  }
  OnEnd() {
    this.Lle = undefined;
    this.bng?.EndTask();
    this.Rng?.EndTask();
    this.jPf?.EndTask();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.P3r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoUpEnable, this.j5g);
    return true;
  }
  EnableFloating(t) {
    if (this.InFloatingState) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 57, "[悬浮模式]重复进入", ["daPath", t]);
      }
    } else {
      this.InFloatingState = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 57, "[悬浮模式][总开关]进入悬浮模式", ["daPath", t]);
      }
      this.Vi(t, this.qPf);
    }
  }
  DisableFloating() {
    if (this.InFloatingState) {
      this.InFloatingState = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 57, "[悬浮模式][总开关]离开悬浮模式");
      }
      this.OPf();
    }
  }
  JumpPressInAir() {
    if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Rise"], ["Reason", "响应按键JumpPressInAir"]);
    }
    this.xPg();
  }
  JumpRelease() {
    if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Floating"], ["Reason", "响应按键JumpRelease"]);
    }
    this.UPg();
  }
  CtrlPress() {
    if (Info_1.Info.IsInTouch()) {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Drop"], ["Reason", "响应按键CtrlPress"]);
      }
      this.BPg();
    }
  }
  CtrlRelease() {
    if (this.FloatingMoveType === 3) {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Floating"], ["Reason", "响应按键CtrlRelease"]);
      }
      this.UPg();
    } else {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Drop"], ["Reason", "响应按键CtrlRelease"]);
      }
      this.BPg();
    }
  }
  jUg() {
    if (this.FloatingMoveType !== 0) {
      this.Usi(0);
    }
  }
  xPg() {
    this.qPf();
    if (this.FloatingMoveType !== 2 && !this.Usi(2)) {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Floating(From: Rise)"], ["Reason", "尝试切换Rise失败"]);
      }
      this.UPg();
    }
  }
  UPg(t = false) {
    this.qPf();
    if ((this.FloatingMoveType !== 1 || !!t) && !this.Usi(1)) {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Drop(From: Floating)"], ["Reason", "尝试切换Floating失败"]);
      }
      this.BPg();
    }
  }
  BPg() {
    this.qPf();
    if (this.FloatingMoveType !== 3 && !this.Usi(3)) {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Walk(From: Drop)"], ["Reason", "尝试切换Drop失败"]);
      }
      this.kHg();
    }
  }
  kHg() {
    if (this.FloatingMoveType !== 4 && !this.Usi(4)) {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Dop(From: Walk)"], ["Reason", "尝试切换Walk失败"]);
      }
      this.BPg();
    }
  }
  Usi(t) {
    return this.Lle.Switch(t);
  }
  OPf() {
    var t = this.IsOnGround || this.IsNearGround;
    this.ReleaseGroundTag();
    this.IsOnWater = false;
    this.IsOnGround = false;
    this.IsNearGround = false;
    if (this.StateComp?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Floating) {
      if (t) {
        this.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 1,
          Context: "[CharacterFloatingComponent.Leave] Walking"
        });
      } else {
        this.MoveComp?.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 3,
          Context: "[CharacterFloatingComponent.Leave] Falling"
        });
      }
    }
    this.MoveComp?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
    if (this.vsg === COMPONENT_DISABLE_KEY) {
      this.vsg = this.Disable("[悬浮模式][总开关]关闭悬浮组件Tick功能");
    }
  }
  Y6g(t) {
    t = ModelManager_1.ModelManager.InputModel?.GetInputData(0).GetActionNameByInputAction(t);
    return !!t && ModelManager_1.ModelManager.InputDistributeModel.IsActionInPress(t);
  }
  OnTick(t) {
    this.HasFloatingMoveInput = false;
    if (this.InFloatingState && this.Config && this.ActorComp && this.MoveComp && this.TagComp && this.AnimComp && this.StateComp && this.TimeScaleComp && this.Lle) {
      if (this.MoveComp.CharacterMovement.MovementMode === 6 && this.MoveComp.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER || this.StateComp.PositionSubState === CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface) {
        this.$in();
        this.J6g();
      } else if (this.MoveComp.CharacterMovement.MovementMode === 3) {
        this.jUg();
        this.J6g();
      } else if (this.StateComp.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 57, "[悬浮模式][总开关]地面状态进入悬浮模式", ["entityId", this.Entity.Id]);
        }
        this.qPf();
        this.J6g();
      } else if (this.StateComp.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Floating) {
        this.$in();
        this.J6g();
        this.Lle.Update(t * this.TimeScaleComp.CurrentTimeScale * this.ActorComp.TimeDilation * MathUtils_1.MathUtils.MillisecondToSecond);
      }
    } else {
      this.J6g();
    }
  }
  UpdateMove(t, i) {
    i.DeepCopy(this.ActorComp.InputDirectProxy);
    this.TempInputDirection.DeepCopy(i);
    i.MultiplyEqual(this.SpeedInternal * t);
  }
  UpdateSpeed(t) {
    if (this.ActorComp.InputDirectProxy.IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber)) {
      if (this.Speed > 0) {
        this.SpeedInternal = Math.max(this.Speed - this.Config.SpeedAcceleration * t, 0);
      } else {
        this.SpeedInternal = 0;
      }
      this.FloatingMoveMixInternal = MathUtils_1.MathUtils.Lerp(this.FloatingMoveMix, 0, this.Config.AnimLerpAlpha);
    } else if (this.IsSprintMove) {
      if (this.Speed < this.Config.SprintSpeed) {
        this.SpeedInternal = Math.min(this.Speed + this.Config.SpeedAcceleration * t, this.Config.SprintSpeed);
      } else {
        this.SpeedInternal = Math.max(this.Speed - this.Config.SpeedAcceleration * t, this.Config.SprintSpeed);
      }
      this.FloatingMoveMixInternal = MathUtils_1.MathUtils.Lerp(this.FloatingMoveMix, FAST_MOVE_MIX, this.Config.AnimLerpAlpha);
    } else {
      if (this.Speed < this.Config.MoveSpeed) {
        this.SpeedInternal = Math.min(this.Speed + this.Config.SpeedAcceleration * t, this.Config.MoveSpeed);
      } else {
        this.SpeedInternal = Math.max(this.Speed - this.Config.SpeedAcceleration * t, this.Config.MoveSpeed);
      }
      this.FloatingMoveMixInternal = MathUtils_1.MathUtils.Lerp(this.FloatingMoveMix, NORMAL_MOVE_MIX, this.Config.AnimLerpAlpha);
    }
  }
  CloseToGround(t) {
    var i;
    if (!this.TagComp.HasAnyTag(this.Config.ForbidCloseToGroundTagList)) {
      if ((i = Math.min(this.WaterDist, this.HitFloorDist)) > TRACE_ERROR_THRESHOLD && i < this.Config.CloseToGroundHeight) {
        i = i < this.ActorComp.ScaledRadius ? this.ActorComp.ScaledRadius : i;
        this.TempVector2.DeepCopy(this.MoveComp.GravityDirect);
        this.TempVector2.MultiplyEqual(i);
        this.TempVector2.AdditionEqual(this.ActorComp.ActorLocationProxy);
        this.TempVector.DeepCopy(this.ActorComp.ActorLocationProxy);
        MathUtils_1.MathUtils.VectorInterpTo(this.TempVector, this.TempVector2, t, 3, this.TempVector3);
        this.TempVector3.Subtraction(this.TempVector, this.TempVector2);
        this.MoveDelta.AdditionEqual(this.TempVector2);
      }
    }
  }
  CheckGround() {
    var t = this.GetFloorDistance();
    this.IsNearGround = t < this.Config.AirCriticalHeight;
    this.NearGroundDist = this.IsNearGround ? t : -1;
    if (this.IsNearGround && !this.TagComp?.HasTag(-1267021124)) {
      this.TagComp?.AddTag(-1267021124);
    } else if (!this.IsNearGround && this.TagComp?.HasTag(-1267021124)) {
      this.TagComp?.RemoveTag(-1267021124);
    }
    this.IsOnWater = this.WaterDist < TRACE_ERROR_THRESHOLD;
    this.IsOnGround = t < TRACE_ERROR_THRESHOLD;
    if (this.IsOnGround) {
      if (!this.HasGroundTag || !this.TagComp?.HasTag(-1898186757)) {
        this.TagComp?.AddTag(-1898186757);
        this.HasGroundTag = true;
      }
      if (this.HasAirTag && this.TagComp?.HasTag(40422668)) {
        this.TagComp?.RemoveTag(40422668);
        this.HasAirTag = false;
      }
    } else {
      if (!this.IsOnWater && (!this.HasAirTag || !this.TagComp?.HasTag(40422668))) {
        this.TagComp?.AddTag(40422668);
        this.HasAirTag = true;
      }
      if (this.HasGroundTag && this.TagComp?.HasTag(-1898186757)) {
        this.TagComp?.RemoveTag(-1898186757);
        this.HasGroundTag = false;
      }
    }
    if (this.HitFloorDist >= this.Config.CloseToGroundHeight) {
      if (this.TagComp.HasTag(1208529032)) {
        this.TagComp.RemoveTag(1208529032);
      }
    } else if (!this.TagComp.HasTag(1208529032)) {
      this.TagComp.AddTag(1208529032);
    }
  }
  ReleaseGroundTag() {
    if (this.IsNearGround && this.TagComp?.HasTag(-1267021124)) {
      this.TagComp?.RemoveTag(-1267021124);
    }
    this.IsNearGround = false;
    if (this.HasAirTag && this.TagComp?.HasTag(40422668)) {
      this.TagComp?.RemoveTag(40422668);
    }
    this.HasAirTag = false;
    if (this.HasGroundTag && this.TagComp?.HasTag(-1898186757)) {
      this.TagComp?.RemoveTag(-1898186757);
    }
    this.HasGroundTag = false;
  }
  GetTargetDirectionProjection(t) {
    if (ModelManager_1.ModelManager.CameraModel?.HasLockTarget()) {
      ModelManager_1.ModelManager.CameraModel.GetLockTargetLocation(this.TempVector);
      this.TempVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
      this.TempVector.Normalize();
    } else {
      i = Global_1.Global.CharacterCameraManager.GetCameraRotation().VectorDouble();
      this.TempVector.DeepCopy(i);
    }
    var i = this.MoveComp.GravityDirect;
    Vector_1.Vector.VectorPlaneProject(this.TempVector, i, t);
    return t.Normalize();
  }
  RotatorFloatingDirection(t, i) {
    var e;
    var s;
    if (!i.IsNearlyZero()) {
      e = this.ActorComp.ActorUpProxy;
      s = this.Config.TurnSpeedDeg;
      Vector_1.Vector.VectorPlaneProject(this.ActorComp.ActorForwardProxy, this.MoveComp.GravityDirect, this.TempVector);
      if (this.TempVector.IsNearlyZero()) {
        MathUtils_1.MathUtils.LookRotationForwardFirst(i, e, this.TempRotator);
      } else {
        this.TempVector.Normalize();
        i = MathUtils_1.MathUtils.SignedAngleOnPlaneDeg(this.TempVector, i, e);
        s = s * t * 2;
        t = MathUtils_1.MathUtils.Clamp(Math.abs(i) / 180, 0, 1);
        t = MathUtils_1.MathUtils.LerpCubic(0, 1.2, 1, 0.8, t);
        t = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, 0.1, 1);
        s = Math.min(Math.abs(i), s * t);
        t = Math.sign(i) * s;
        this.TempVector.RotateAngleAxis(t, e, this.TempVector);
        MathUtils_1.MathUtils.LookRotationForwardFirst(this.TempVector, e, this.TempRotator);
      }
      this.ActorComp.SetActorRotation(this.TempRotator.ToUeRotator(), "RailSlide.TangentRotator1", false);
      this.ActorComp.SetInputFacing(this.ActorComp.ActorForwardProxy);
    }
  }
  DetectFloor() {
    this.Kjg();
    this.ActorComp.RefreshCurrentFloor();
    this.CurrentFloor = this.MoveComp.CharacterMovement.CurrentFloor;
    return this.CurrentFloor && this.CurrentFloor.HitResult?.Actor?.IsValid() && !!this.CurrentFloor.bWalkableFloor && !(this.CurrentFloor.FloorDist >= TRACE_ERROR_THRESHOLD) || this.UVg();
  }
  Kjg() {
    var t = Math.max(WATER_TRACE_DEPTH, this.Config.CloseToGroundHeight);
    var t = (t = this.MoveComp.GetHeightAboveWater(t)) < this.ActorComp.ScaledRadius ? t : t + this.ActorComp.ScaledRadius;
    this.WaterDist = t;
  }
  UVg() {
    var t = Math.max(this.Config.AirCriticalHeight, this.Config.CloseToGroundHeight);
    var t = (t = this.MoveComp.GetHeightAboveGround(t)) < this.ActorComp.ScaledRadius ? t : t + this.ActorComp.ScaledRadius;
    this.HitFloorNonFloor = t < this.Config.AirCriticalHeight;
    this.HitFloorDist = t;
    return this.HitFloorNonFloor;
  }
  GetFloorDistance() {
    if (this.CurrentFloor?.bWalkableFloor) {
      return this.CurrentFloor.FloorDist;
    } else if (this.HitFloorNonFloor) {
      return this.HitFloorDist;
    } else {
      return MAX_FLOOR_DIST;
    }
  }
  DetectCeiling() {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = this.ActorComp.Actor;
    t.Radius = 1;
    this.TempVector.DeepCopy(this.ActorComp.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.ActorComp, this.TempVector, this.ActorComp.ScaledHalfHeight);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.TempVector);
    this.TempVector2.DeepCopy(this.TempVector);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.ActorComp, this.TempVector2, TRACE_ERROR_VALUE);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.TempVector2);
    t.ActorsToIgnore.Empty();
    for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      t.ActorsToIgnore.Add(i);
    }
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, t, PROFILE_KEY, PROFILE_KEY)) {
      return t.HitResult;
    } else {
      return undefined;
    }
  }
  $in() {
    if (this.MoveComp.CanResponseInput()) {
      if (this.Y6g(InputEnums_1.EInputAction.跳跃)) {
        this.xPg();
        this.HasFloatingMoveInput = true;
      } else if (this.FloatingMoveType === 0 && this.MoveComp.HasMoveInput) {
        this.UPg();
      }
    }
  }
  J6g() {
    if (this.HadFloatingMoveInput !== this.HasFloatingMoveInput) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnFloatingMoveInputChanged, this.HadFloatingMoveInput, this.HasFloatingMoveInput);
      this.HadFloatingMoveInput = this.HasFloatingMoveInput;
    }
  }
  ExitHitState() {
    if (this.Y6g(InputEnums_1.EInputAction.跳跃)) {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Rise"], ["Reason", "受击退出响应跳跃"]);
      }
      this.xPg();
    } else if (Info_1.Info.IsInTouch() && this.Y6g(InputEnums_1.EInputAction.下降)) {
      if (CharacterFloatingComponent_1.Debug && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[悬浮模式][调试]切换状态机", ["EntityId", this.Entity.Id], ["State", "Drop"], ["Reason", "受击退出响应下降"]);
      }
      this.BPg();
    }
  }
  ClearCacheInputDirect() {
    this.TempInputDirection.Reset();
  }
  WPf() {
    this.bng = this.TagComp?.ListenForTagAddOrRemove(-823677393, (t, i) => {
      if (i) {
        this.EnableFloating(DEFAULT_DA_PATH);
      } else {
        this.DisableFloating();
      }
    });
    this.Rng = this.TagComp?.ListenForTagAddOrRemove(1944836470, (t, i) => {
      this.InLockTargetState = i;
    });
    this.jPf = this.TagComp?.ListenForTagAddOrRemove(446479854, (t, i) => {
      this.IsSprintMove = i;
    });
  }
  Vi(t, i) {
    this.Config = new FloatingMovementConfig();
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_FloatingMovementConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, ue_1.BP_FloatingMovementConfig_C, t => {
        this.Config ||= new FloatingMovementConfig();
        if (t?.IsValid()) {
          this.Config.Init(t);
        }
        i();
      });
    });
  }
  Lng() {
    this.Lle = new StateMachine_1.StateMachine(this);
    this.Lle.AddState(0, DefaultState);
    this.Lle.AddState(1, FloatingState);
    this.Lle.AddState(2, RiseState);
    this.Lle.AddState(3, DropState);
    this.Lle.AddState(4, WalkState);
    this.Lle.Start(0);
  }
  GetStateName(t) {
    switch (t) {
      case 0:
        return "None";
      case 1:
        return "Floating";
      case 2:
        return "Rise";
      case 3:
        return "Drop";
      case 4:
        return "Walk";
    }
    return "请补充悬浮状态名称";
  }
};
CharacterFloatingComponent.Debug = false;
CharacterFloatingComponent = CharacterFloatingComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(39)], CharacterFloatingComponent);
exports.CharacterFloatingComponent = CharacterFloatingComponent; //# sourceMappingURL=CharacterFloatingComponent.js.map