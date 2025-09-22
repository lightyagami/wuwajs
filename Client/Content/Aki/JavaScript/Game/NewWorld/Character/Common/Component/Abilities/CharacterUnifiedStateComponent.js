"use strict";

var CharacterUnifiedStateComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, a) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, i) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, a);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(e, i, n) : s(e, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterUnifiedStateComponent = exports.outGameRoleTags = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../../Module/Abilities/FormationDataController");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const BaseUnifiedStateComponent_1 = require("../../../../Common/Component/BaseUnifiedStateComponent");
const RoleAudioController_1 = require("../../../Role/RoleAudioController");
const BaseHitComponent_1 = require("../BaseHitComponent");
const CustomMovementDefine_1 = require("../Move/CustomMovementDefine");
const CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
const GameplayCueController_1 = require("./GameplayCueSFX/Controller/GameplayCueController");
exports.outGameRoleTags = [1963731483, -208062360];
let CharacterUnifiedStateComponent = CharacterUnifiedStateComponent_1 = class CharacterUnifiedStateComponent extends BaseUnifiedStateComponent_1.BaseUnifiedStateComponent {
  constructor() {
    super(...arguments);
    this.bkr = undefined;
    this.qkr = undefined;
    this.ActorComponent = undefined;
    this.Gkr = undefined;
    this.o4o = undefined;
    this.q2d = false;
    this.Si_ = undefined;
    this.Nkr = (t, e) => {
      FormationDataController_1.FormationDataController.MarkAggroDirty();
      var i;
      var a = t.CheckGetComponent(176);
      this.Okr = a.Okr;
      if (e) {
        if (a.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Flying && a.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Roll && CharacterUnifiedStateTypes_1.legalMoveStates.get(this.PositionState).has(a.MoveState)) {
          this.SetMoveState(a.MoveState);
        }
      } else if (this.Gkr) {
        switch (a.MoveState) {
          case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
            this.SetPositionState(a.PositionState);
            if (this.Gkr.EnableRoleGaitState(1)) {
              this.SetMoveState(a.MoveState);
            } else if (i = this.Gkr.FindEnableCharMoveState()) {
              this.SetMoveState(i);
            }
            break;
          case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
            this.SetPositionState(a.PositionState);
            if (this.Gkr.EnableRoleGaitState(2)) {
              this.SetMoveState(a.MoveState);
            } else if (i = this.Gkr.FindEnableCharMoveState()) {
              this.SetMoveState(i);
            }
            break;
          case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
            this.SetPositionState(a.PositionState);
            if (this.Gkr.EnableRoleGaitState(3)) {
              this.SetMoveState(a.MoveState);
            } else if (i = this.Gkr.FindEnableCharMoveState()) {
              this.SetMoveState(i);
            }
            break;
          case CharacterUnifiedStateTypes_1.ECharMoveState.Captured:
          case CharacterUnifiedStateTypes_1.ECharMoveState.Flying:
          case CharacterUnifiedStateTypes_1.ECharMoveState.Roll:
            break;
          default:
            if (a.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ride) {
              this.SetPositionState(a.PositionState);
              this.SetMoveState(a.MoveState);
            }
        }
      }
      t = a.DirectionState;
      if (t !== CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
        this.SetDirectionState(t);
      } else {
        this.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
      }
      if (a.TagComponent.HasTag(388142570)) {
        this.TagComponent.AddTag(792724096);
      }
    };
    this.Hqr = (t, e, i, a, s) => {
      switch (i) {
        case 0:
          this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Ground);
          this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
          break;
        case 1:
        case 2:
          this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Ground);
          break;
        case 3:
          this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
          if (this.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp && this.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Captured) {
            this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
          }
          break;
        case 5:
          this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
          if (this.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Captured) {
            this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Flying);
          }
          break;
        case 7:
          this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
          this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.WalkOnAir);
          break;
        case 6:
          switch (s) {
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Climb);
              if (this.TagComponent.HasTag(388142570)) {
                this.SwitchFastClimb(true);
              }
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Water);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
              this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Glide);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Ground);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
              this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Soar);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Ski);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
              this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Roll);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
              this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Kite);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Ride);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.RailSlide);
              break;
            case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SPLINE_CLIMB:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Climb);
              break;
            default:
              this.SetPositionState(CharacterUnifiedStateTypes_1.ECharPositionState.Air);
          }
      }
    };
    this.CachedPositionState = CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
    this.CachedMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Stand;
    this.CachedDirectionState = CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection;
    this.Fkr = (t, e) => {
      if (t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
        this.TagComponent.RemoveTag(525585922);
        this.TagComponent.RemoveTag(-217225976);
      }
    };
    this.CachedPositionSubState = CharacterUnifiedStateTypes_1.ECharPositionSubState.None;
    this.InFightCueHandle = GameplayCueController_1.INVALID_CUE_HANDLE;
    this.oWe = new Set();
    this.OnAggroChanged = (t, e) => {
      var i = e.CharActorComp.Entity.Id;
      if (t) {
        this.oWe.add(i);
      } else {
        this.oWe.delete(i);
      }
      var i = this.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id;
      if (i) {
        FormationDataController_1.FormationDataController.MarkAggroDirty();
      }
      if (!this.IsInFighting && !FormationDataController_1.FormationDataController.GlobalIsInFight && !!t && this.ActorComponent?.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        i = Vector_1.Vector.Dist(this.ActorComponent.ActorLocationProxy, e.CharActorComp.ActorLocationProxy);
        RoleAudioController_1.RoleAudioController.OnPlayerEnterFight(this.Entity, i);
      }
    };
    this.OnInFight = t => {
      this.Vkr(t);
      this.Entity.GetComponent(178)?.SetAnimParamsInFight(t);
      ModelManager_1.ModelManager.CombatMessageModel.AnyHateChange = true;
    };
    this.OnUpdateSceneTeam = () => {
      var t = this.Entity.GetComponent(0);
      if (t?.IsRole() && ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t.GetPlayerId() && FormationDataController_1.FormationDataController.GlobalIsInFight) {
        this.RefreshFightState(true);
        this.OnInFight(true);
      }
    };
    this.Okr = false;
  }
  static get Dependencies() {
    return [3, 18];
  }
  OnInit() {
    CharacterUnifiedStateComponent_1.Load();
    this.Si_ = this.Entity.EntityData?.GetCharacterUnifiedStateComponent();
    return true;
  }
  OnStart() {
    this.ActorComponent = this.Entity.GetComponent(3);
    this.qkr = this.Entity.GetComponent(21);
    this.bkr = this.Entity.CheckGetComponent(18);
    this.TagComponent = this.Entity.CheckGetComponent(206);
    this.o4o = this.Entity.CheckGetComponent(179);
    this.Gkr = this.Entity.GetComponent(95);
    this.IsInGameInternal = false;
    this.InitCharState();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.Nkr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, this.Fkr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.OnAggroChanged);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.AiInFight, this.OnInFight);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.OnUpdateSceneTeam);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.Nkr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, this.Fkr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.OnAggroChanged);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.AiInFight, this.OnInFight);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.OnUpdateSceneTeam);
    if (this.Entity.GetComponent(0)?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      FormationDataController_1.FormationDataController.MarkAggroDirty();
    }
    return true;
  }
  OnEnable() {
    super.OnEnable();
    this.PreprocessChangeRole(true);
    return true;
  }
  OnDisable() {
    super.OnDisable();
    this.PreprocessChangeRole(false);
    return true;
  }
  SetPositionState(t) {
    var e = this.PositionState;
    if (this.ActorComponent.IsMoveAutonomousProxy) {
      if (this.Hkr(t)) {
        this.OnPositionStateChange(e, t);
      }
    } else {
      CombatLog_1.CombatLog.Warn("UnifiedState", this.Entity, "非主控端尝试修改位置状态", ["old", CharacterUnifiedStateTypes_1.ECharPositionState[e]], ["new", CharacterUnifiedStateTypes_1.ECharPositionState[t]]);
    }
  }
  SetPositionStateHandle(t) {
    if (!this.ActorComponent.IsMoveAutonomousProxy) {
      this.Hkr(t);
    }
  }
  Hkr(t) {
    var e = this.PositionState;
    return e !== t && (this.TagComponent.RemoveTag(1700920381), this.TagComponent.AddTag(CharacterUnifiedStateComponent_1.PositionEnumToTag.get(t)), this.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None), this.CachedPositionState = t, CombatLog_1.CombatLog.Info("UnifiedState", this.Entity, "设置位置状态", ["old", CharacterUnifiedStateTypes_1.ECharPositionState[e]], ["new", CharacterUnifiedStateTypes_1.ECharPositionState[t]]), this.Si_ && (this.Si_.PositionState = t), true);
  }
  get PositionState() {
    return this.CachedPositionState;
  }
  OnLand() {
    var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-2132334323);
    this.bkr.SendGameplayEventToActor(t);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnLand);
    if (this.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp) {
      this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.StandUp);
    } else if (!this.TagComponent.HasTag(-1503953470)) {
      this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
    }
  }
  OnPositionStateChange(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 6, "UnifiedState PositionStateChange", ["EntityId", this.Entity.Id], ["Name", this.ActorComponent?.Owner?.GetName()], ["From", CharacterUnifiedStateTypes_1.ECharPositionState[t]], ["To", CharacterUnifiedStateTypes_1.ECharPositionState[e]]);
    }
    if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      this.OnLand();
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, t, e);
  }
  SetMoveState(t) {
    RoleAudioController_1.RoleAudioController.OnMoveStateChange(t, this.Entity);
    if (this.ActorComponent.IsMoveAutonomousProxy) {
      this.Kkr(t);
    } else {
      CombatLog_1.CombatLog.Warn("UnifiedState", this.Entity, "非主控端尝试修改移动状态", ["old", CharacterUnifiedStateTypes_1.ECharMoveState[this.MoveState]], ["new", CharacterUnifiedStateTypes_1.ECharMoveState[t]]);
    }
  }
  SetMoveStateHandle(t) {
    if (!this.ActorComponent.IsMoveAutonomousProxy) {
      this.Kkr(t);
    }
  }
  Kkr(t) {
    var e = this.MoveState;
    return e !== t && (this.ActorComponent.IsRoleAndCtrlByMe && !CharacterUnifiedStateTypes_1.legalMoveStates.get(this.PositionState).has(t) ? (Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 6, "Error Move State", ["Actor", this.ActorComponent?.Actor.GetName()], ["PositionState", this.PositionState], ["MoveState", t]), false) : (CombatLog_1.CombatLog.Info("UnifiedState", this.Entity, "修改移动状态", ["position", CharacterUnifiedStateTypes_1.ECharPositionState[this.PositionState]], ["state", CharacterUnifiedStateTypes_1.ECharMoveState[t]]), this.TagComponent.RemoveTag(-5899402), this.TagComponent.AddTag(CharacterUnifiedStateComponent_1.MoveEnumToTag.get(t)), this.CachedMoveState = t, this.Si_ && (this.Si_.MoveState = t), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, e, t), true));
  }
  get MoveState() {
    return this.CachedMoveState;
  }
  EnterAimStatus(t) {
    this.TagComponent.AddTag(1118638468);
    this.TagComponent.AddTag(-100527303);
    switch (t) {
      case 0:
        this.TagComponent.AddTag(-1289344370);
        break;
      case 1:
        this.TagComponent.AddTag(1502858015);
        break;
      case 2:
        this.TagComponent.AddTag(1111570152);
        break;
      case 3:
        this.TagComponent.AddTag(-307383857);
    }
    this.ActorComponent.UseControllerRotation = true;
    this.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection);
    this.Entity.GetComponent(63)?.OnEnterAimShoot();
  }
  ExitAimStatus() {
    this.TagComponent.RemoveTag(1118638468);
    this.ActorComponent.UseControllerRotation = false;
    if (this.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
      this.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
    }
    this.Entity.GetComponent(63)?.OnExitAimShoot();
  }
  SetDirectionState(t) {
    var e;
    if (this.ActorComponent.IsAutonomousProxy && (e = this.DirectionState, this.Qkr(t))) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, e, t);
    }
  }
  SetDirectionStateHandle(t) {
    this.Qkr(t);
  }
  Qkr(t) {
    var e = this.DirectionState;
    return e !== t && (this.UpdateDirectionTag(e, t), true);
  }
  get DirectionState() {
    return this.CachedDirectionState;
  }
  UpdateDirectionTag(t, e) {
    this.ClearDirectionTag(t);
    this.AddDirectionTag(e);
    this.CachedDirectionState = e;
  }
  ClearDirectionTag(t) {
    if (t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
      this.ExitAnimState();
    }
    this.TagComponent.RemoveTag(-742468192);
  }
  AddDirectionTag(t) {
    if (t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
      this.EnterAnimState();
    }
    this.TagComponent.AddTag(CharacterUnifiedStateComponent_1.DirectionEnumToTag.get(t));
  }
  EnterAnimState() {
    if (!this.TagComponent.HasTag(-100527303) && !this.TagComponent.HasTag(-1761987351) && !this.TagComponent.HasTag(-1664105924)) {
      this.TagComponent.AddTag(-1664105924);
    }
  }
  ExitAnimState() {
    this.TagComponent.RemoveTag(-1664105924);
    this.TagComponent.RemoveTag(-100527303);
    this.TagComponent.RemoveTag(1432398233);
  }
  InitCharState() {
    this.TagComponent.AddTag(CharacterUnifiedStateComponent_1.PositionEnumToTag.get(CharacterUnifiedStateTypes_1.ECharPositionState.Ground));
    this.TagComponent.AddTag(CharacterUnifiedStateComponent_1.MoveEnumToTag.get(CharacterUnifiedStateTypes_1.ECharMoveState.Stand));
    this.TagComponent.AddTag(CharacterUnifiedStateComponent_1.DirectionEnumToTag.get(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection));
  }
  ResetCharState() {
    this.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None);
  }
  Xkr(t, e) {
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionSubStateChanged, t, e);
  }
  $kr(t, e) {
    this.Ykr(t);
    this.Jkr(e);
    this.CachedPositionSubState = e;
  }
  Ykr(t) {
    this.TagComponent.RemoveTag(-1532754767);
  }
  Jkr(t) {
    this.TagComponent.AddTag(CharacterUnifiedStateComponent_1.PositionSubStateEnumToTag.get(t));
  }
  SetPositionSubStateHandle(t) {
    this.SetPositionSubStateInternal(t);
  }
  SetPositionSubStateInternal(t) {
    var e = this.PositionSubState;
    return e !== t && (this.$kr(e, t), true);
  }
  SetPositionSubState(t) {
    var e;
    if (this.ActorComponent.IsAutonomousProxy && (e = this.PositionSubState, this.SetPositionSubStateInternal(t))) {
      this.Xkr(e, t);
    }
  }
  get PositionSubState() {
    return this.CachedPositionSubState;
  }
  zkr() {
    if (!this.TagComponent.HasTag(792724096)) {
      this.TagComponent.AddTag(792724096);
    }
  }
  Zkr() {
    this.TagComponent.RemoveTag(792724096);
  }
  SprintPress() {
    if (this.Gkr?.EnableRoleGaitState(3)) {
      this.zkr();
      RoleAudioController_1.RoleAudioController.OnPlayAccelerateAudio(this.Entity, this.MoveState, this.PositionState, this.o4o?.CharacterMovement?.MovementMode, this.o4o?.CharacterMovement?.CustomMovementMode);
    }
  }
  SprintRelease() {
    this.Zkr();
  }
  WalkPress() {
    this.e2r();
  }
  SwingPress() {
    this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Swing);
  }
  SwingRelease() {
    this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
  }
  SwitchFastSwim(t) {
    this.SetMoveState(t ? CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim : CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim);
    if (t) {
      this.zkr();
    }
  }
  SwitchFastClimb(t, e = false) {
    t = t && !this.TagComponent.HasTag(1098729489);
    if (e || this.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb && this.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb) {
      this.SetMoveState(t ? CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb : CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb);
    }
    if (t) {
      this.zkr();
      RoleAudioController_1.RoleAudioController.OnPlayAccelerateAudio(this.Entity, this.MoveState, this.PositionState, this.o4o?.CharacterMovement?.MovementMode, this.o4o?.CharacterMovement?.CustomMovementMode);
    }
  }
  ExitHitState(t = "") {
    if (this.TagComponent.HasTag(-1503953470) && !this.TagComponent.HasTag(-648310348)) {
      this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
    }
    this.Entity.GetComponent(61).DeActiveStiff(t);
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      this.Entity.GetComponent(68).CollectSampleAndSend();
    }
    if (this.ActorComponent.IsMoveAutonomousProxy) {
      BaseHitComponent_1.BaseHitComponent.HitEndRequest(this.Entity);
    }
    t = this.Entity.GetComponent(55);
    if (!!t && (t.CurrentState === 2 || t.CurrentState === 4)) {
      this.Entity.GetComponent(55).ResetState();
      this.ActorComponent.ResetMoveControlled("退出受击");
    }
  }
  e2r() {
    if (this.o4o?.CanWalkPress && this.MarkWalkOrRun(!this.Okr)) {
      this.i2r(this.IsWalkMode);
    }
  }
  CustomSetWalkOrRun(t) {
    let e = false;
    return !(e = t ? this.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk : this.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Run) || !!this.o4o?.CanWalkPress && (this.MarkWalkOrRun(t) && this.i2r(t), true);
  }
  MarkWalkOrRun(t, e = true, i) {
    if (t !== this.Okr && !this.q2d) {
      this.q2d = i ?? this.q2d;
      i = this.Okr;
      this.Okr = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeWalkOrRun, i, t, e);
    }
    return false;
  }
  i2r(t) {
    if (this.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      if (t) {
        this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
      } else {
        this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
      }
    }
  }
  IsInFightState() {
    return this.TagComponent.HasTag(1996802261);
  }
  RefreshFightState(t) {
    var e = ModelManager_1.ModelManager.PlayerInfoModel?.GetId() ?? 0;
    if (ModelManager_1.ModelManager.SceneTeamModel.GetAllGroupEntities(e).some(t => t.Id === this.Entity.Id)) {
      e = t ?? this.oWe.size > 0;
      CharacterUnifiedStateComponent_1.o2r.Start();
      if (e) {
        this.r2r();
      } else {
        this.TryClearInFightTags();
      }
      CharacterUnifiedStateComponent_1.o2r.Stop();
    }
  }
  r2r() {
    this.TagComponent?.AddTag(1996802261);
    if (this.InFightCueHandle === GameplayCueController_1.INVALID_CUE_HANDLE) {
      this.InFightCueHandle = this.qkr.AddCue(1101005001);
    }
    return true;
  }
  TryClearInFightTags() {
    this.TagComponent?.RemoveTag(1996802261);
    if (this.InFightCueHandle !== GameplayCueController_1.INVALID_CUE_HANDLE) {
      this.qkr?.RemoveCueByHandle(this.InFightCueHandle);
    }
    this.InFightCueHandle = GameplayCueController_1.INVALID_CUE_HANDLE;
    return true;
  }
  static OnPlayerBattleStateChangeNotify(t, e) {
    CharacterUnifiedStateComponent_1.n2r.Start();
    for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetAllGroupEntities(e.W5n)) {
      var i = a.Entity?.GetComponent(176);
      i?.RefreshFightState(e.iWn);
      i?.OnInFight(e.iWn);
    }
    if (e.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) {
      FormationDataController_1.FormationDataController.NotifyInFight(e.iWn);
    }
    CharacterUnifiedStateComponent_1.n2r.Stop();
  }
  Vkr(t) {
    var e;
    this.IsInFighting = t;
    if (this.Entity && this.Entity.GameBudgetManagedToken && (cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, t), e = this.ActorComponent?.Actor)) {
      EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.OnMarkActorInFighting, t);
    }
  }
  get WalkModeLocked() {
    return !this.Gkr.EnableRoleGaitState(2);
  }
  get IsWalkBaseMode() {
    return this.Okr;
  }
  get IsWalkMode() {
    return this.WalkModeLocked || this.Okr;
  }
  static Load() {
    if (this.s2r) {
      this.PositionTagList = [-1898186757, 504239013, 40422668, 855966206, 1888918118, 485336017];
      this.MoveTagList = [-1867662364, 248240472, 498191540, -1625986130, 874657114, 316338736, 1781274524, -1756660346, 1453491643, -1515012024, -846247571, -1989694637, -1654460638, 2060652336, 2111364199, 756800494, 262865373, 31862857, -1973127492, -1504358738, -652371212, -648310348, 457513750, -1220068999, 84868970, 1785019708, 1502279607, 389944200, -2027866845, -959917199, 1552667325, 427266238, -1013665181, -158175522];
      this.DirectionTagList = [-1150819426, 428837378, -1462404775, 1260125908];
      this.PositionSubStateTagList = [-1162654169, 1950824539, 1949638808];
      this.PositionEnumToTag = new Map();
      this.PositionEnumToTagInverse = new Map();
      for (const t of CharacterUnifiedStateComponent_1.PositionEnumKeys) {
        this.PositionEnumToTag.set(t, this.PositionTagList[t]);
        this.PositionEnumToTagInverse.set(this.PositionTagList[t], t);
      }
      this.MoveEnumToTag = new Map();
      this.MoveEnumToTagInverse = new Map();
      for (const e of CharacterUnifiedStateComponent_1.MoveEnumKeys) {
        this.MoveEnumToTag.set(e, this.MoveTagList[e]);
        this.MoveEnumToTagInverse.set(this.MoveTagList[e], e);
      }
      this.DirectionEnumToTag = new Map();
      this.DirectionEnumToTagInverse = new Map();
      for (const i of CharacterUnifiedStateComponent_1.DirectionEnumKeys) {
        this.DirectionEnumToTag.set(i, this.DirectionTagList[i]);
        this.DirectionEnumToTagInverse.set(this.DirectionTagList[i], i);
      }
      this.PositionSubStateEnumToTag = new Map();
      for (const a of CharacterUnifiedStateComponent_1.PositionSubStateEnumKeys) {
        this.PositionSubStateEnumToTag.set(a, this.PositionSubStateTagList[a]);
      }
      this.s2r = false;
    }
  }
  PreprocessChangeRole(t) {
    for (const e of exports.outGameRoleTags) {
      if (t) {
        this.TagComponent?.RemoveTag(e);
      } else if (!this.TagComponent?.HasTag(e)) {
        this.TagComponent?.AddTag(e);
      }
    }
  }
  GetAggroSet() {
    return this.oWe;
  }
};
CharacterUnifiedStateComponent.n2r = Stats_1.Stat.Create("OnAggroChanged.RefreshFightState");
CharacterUnifiedStateComponent.o2r = Stats_1.Stat.Create("OnAggroChanged.FightBuff");
CharacterUnifiedStateComponent.PositionEnumKeys = Object.values(CharacterUnifiedStateTypes_1.ECharPositionState).filter(t => typeof t == "number");
CharacterUnifiedStateComponent.MoveEnumKeys = Object.values(CharacterUnifiedStateTypes_1.ECharMoveState).filter(t => typeof t == "number");
CharacterUnifiedStateComponent.DirectionEnumKeys = Object.values(CharacterUnifiedStateTypes_1.ECharDirectionState).filter(t => typeof t == "number");
CharacterUnifiedStateComponent.PositionSubStateEnumKeys = Object.values(CharacterUnifiedStateTypes_1.ECharPositionSubState).filter(t => typeof t == "number");
CharacterUnifiedStateComponent.s2r = true;
__decorate([CombatMessage_1.CombatNet.Listen("y3n", false)], CharacterUnifiedStateComponent, "OnPlayerBattleStateChangeNotify", null);
CharacterUnifiedStateComponent = CharacterUnifiedStateComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(176)], CharacterUnifiedStateComponent);
exports.CharacterUnifiedStateComponent = CharacterUnifiedStateComponent; //# sourceMappingURL=CharacterUnifiedStateComponent.js.map