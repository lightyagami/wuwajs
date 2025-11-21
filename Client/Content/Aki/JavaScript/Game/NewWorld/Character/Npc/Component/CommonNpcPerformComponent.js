"use strict";

var CommonNpcPerformComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var h = arguments.length;
  var o = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        o = (h < 3 ? r(o) : h > 3 ? r(e, i, o) : r(e, i)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonNpcPerformComponent = exports.DITHER_RATE_PER_SECOND = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StateMachine_1 = require("../../../../../Core/Utils/StateMachine/StateMachine");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const BehaviorTreeDefines_1 = require("../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PawnTurnActionController_1 = require("../../../Pawn/Controllers/PawnTurnActionController");
const MonsterNearbySensory_1 = require("../../../Pawn/SensoryInfo/MonsterNearbySensory");
const NpcFacialExpressionController_1 = require("../Logics/NpcFacialExpressionController");
const NpcInterestEventController_1 = require("../Logics/NpcInterestEventController");
const NpcSightController_1 = require("../Logics/NpcSightController");
const NpcPerformAlertState_1 = require("../StateMachine/NpcPerformAlertState");
const NpcPerformBornState_1 = require("../StateMachine/NpcPerformBornState");
const NpcPerformDestroyState_1 = require("../StateMachine/NpcPerformDestroyState");
const NpcPerformIdleState_1 = require("../StateMachine/NpcPerformIdleState");
const NpcPerformImpactedState_1 = require("../StateMachine/NpcPerformImpactedState");
const NpcPerformInteractState_1 = require("../StateMachine/NpcPerformInteractState");
const NpcPerformMonsterNearbyState_1 = require("../StateMachine/NpcPerformMonsterNearbyState");
const NpcPerformRideVehicleState_1 = require("../StateMachine/NpcPerformRideVehicleState");
const NpcPerformSystemUiState_1 = require("../StateMachine/NpcPerformSystemUiState");
const NpcPerformUnderAttackState_1 = require("../StateMachine/NpcPerformUnderAttackState");
const NpcPerformComponent_1 = require("./NpcPerformComponent");
const NpcPerformGroupController_1 = require("./NpcPerformGroupController");
const MIN_IMPACT_STRENGTH = 500;
const DEFAULT_SIGHT_RANGE = 300;
const SIGHT_OPEN_DEGREE = 80;
exports.DITHER_RATE_PER_SECOND = 0.33;
let CommonNpcPerformComponent = CommonNpcPerformComponent_1 = class CommonNpcPerformComponent extends NpcPerformComponent_1.NpcPerformComponent {
  constructor() {
    super(...arguments);
    this.Mne = 0;
    this.Lo = undefined;
    this.KBr = false;
    this.yvm = false;
    this.jBr = undefined;
    this.Y8e = undefined;
    this.Lie = undefined;
    this.StateMachine = undefined;
    this.BornState = undefined;
    this.IdleState = undefined;
    this.InteractState = undefined;
    this.UnderAttackState = undefined;
    this.MonsterNearbyState = undefined;
    this.RideVehicleState = undefined;
    this.DestroyState = undefined;
    this.SystemUiState = undefined;
    this.TurnActionController = undefined;
    this.Ztn = -1;
    this.vir = Vector_1.Vector.Create();
    this.QBr = Vector_1.Vector.Create();
    this.$Br = false;
    this.oin = false;
    this.IsBaseRoleNpc = false;
    this.PerformGroupController = undefined;
    this.ExpressionController = undefined;
    this.SightController = undefined;
    this.InterestEventController = undefined;
    this.AnyIdleLoopMontagePlaying = false;
    this.CachedStareTargetMap = new Map();
    this.ATl = false;
    this.xTl = false;
    this.PTl = false;
    this.wTl = false;
    this.zLn = undefined;
    this.rzr = undefined;
    this.zun = 0;
    this.BTl = undefined;
    this.bTl = undefined;
    this.rin = (t, e, i) => {
      if (!this.IsInPlot && !this.IsBeingAttacked && !this.IsBeingImpacted && this.StateMachine.CurrentState === 1) {
        if (Global_1.Global.BaseCharacter === e) {
          if (this.nin() && this.ActorComp?.CreatureData.GetSubEntityType() !== 1) {
            if (this.Lo.NpcHitShow) {
              this.ain();
            }
          } else if (this.Lo.IsShowStrike) {
            this.hin();
          }
        }
      }
    };
    this.Pz = (t, e) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 29, "NPC切换状态", ["ConfigId", this.Mne], ["旧状态", CommonNpcPerformComponent_1.GetStateName(t)], ["新状态", CommonNpcPerformComponent_1.GetStateName(e)]);
      }
    };
    this._in = 0;
    this.uin = 0;
    this.cin = false;
    this.OnNpcInAiControl = () => {
      if (this._in === 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("NPC", 29, "关卡Ai控制中，与行为树不兼容", ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()]);
        }
      } else if (this.IsInPlot) {
        this.uin = 1;
      }
    };
    this.InLevelAiControl = () => this._in === 1 ? (Log_1.Log.CheckError() && Log_1.Log.Error("NPC", 29, "行为树控制中，与关卡Ai不兼容", ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()]), false) : !this.IsInPlot && !this.cin || !(this.uin = 2);
    this.OnStartMoveWithSpline = (t, e, i) => {
      this.ATl = true;
      this.bTl = i;
      var s = {
        DebugMode: false,
        ReturnFalseWhenNavigationFailed: false,
        UseNearestPoint: true,
        IsFollowStrictly: t.IsFollowStrictly,
        StartPointIndex: t.StartPointIndex,
        EndPointIndex: t.EndPointIndex,
        OnArrivePointHandle: undefined,
        OnPatrolEndHandle: t => {
          if (t === 1) {
            if (i) {
              i(true);
            }
          } else if (i) {
            i(false);
          }
          this.ATl = false;
        }
      };
      this.zLn?.StartPatrol(t.SplineEntityId, s);
      this.zun = t.SplineEntityId;
      this.BTl = t;
      this.qTl(t);
    };
    this.GTl = t => {
      if (t !== this.xTl) {
        if (t) {
          this.zLn?.PausePatrol(this.zun, "perform");
          this.xTl = true;
          this.wTl = true;
          t = this.BTl?.NpcFollow?.PerformerWhenExit?.Actions;
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t, LevelGeneralContextDefine_1.EntityContext.Create(this.ActorComp.Entity.Id), t => {
            if (t === 1) {
              this.wTl = false;
              this.GTl(this.PTl);
            } else {
              this.ATl = false;
              if (this.bTl) {
                this.bTl(false);
              }
            }
          });
        } else {
          this.wTl = true;
          t = this.BTl?.NpcFollow?.PerformerWhenEnter?.Actions;
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t, LevelGeneralContextDefine_1.EntityContext.Create(this.ActorComp.Entity.Id), t => {
            if (t === 1) {
              this.zLn?.ResumePatrol(this.zun, "perform");
              this.xTl = false;
              this.wTl = false;
              this.GTl(this.PTl);
            } else {
              this.ATl = false;
              if (this.bTl) {
                this.bTl(false);
              }
            }
          });
        }
      }
    };
  }
  GetCurrentState() {
    return this.StateMachine?.CurrentState;
  }
  OnInitData() {
    var t = this.Entity.GetComponent(0).GetPbEntityInitData();
    if (!t?.ComponentsData) {
      return !(this.oin = false);
    }
    t = (0, IComponent_1.getComponent)(t.ComponentsData, "NpcPerformComponent");
    if (!t) {
      return !(this.oin = false);
    }
    this.oin = true;
    this.IsBaseRoleNpc = t.SpecialNpcPerformConfig?.Type === IComponent_1.ESpecialNpcType.BaseRoleNpc;
    var e = this.Entity.GetComponent(0);
    this.Mne = e.GetPbDataId();
    this.Y8e = this.Entity.GetComponent(122);
    this.Lie = this.Entity.GetComponent(200);
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e.GetCreatureDataId());
    this.StateMachine = new StateMachine_1.StateMachine(e, this.Pz);
    this.StateMachine.AddState(0, NpcPerformBornState_1.NpcPerformBornState, t);
    this.StateMachine.AddState(1, NpcPerformIdleState_1.NpcPerformIdleState, t);
    this.StateMachine.AddState(2, NpcPerformInteractState_1.NpcPerformInteractState, t);
    this.StateMachine.AddState(3, NpcPerformUnderAttackState_1.NpcPerformUnderAttackState, t);
    this.StateMachine.AddState(4, NpcPerformImpactedState_1.NpcPerformImpactedState);
    this.StateMachine.AddState(5, NpcPerformSystemUiState_1.NpcPerformSystemUiState, t);
    this.StateMachine.AddState(6, NpcPerformAlertState_1.NpcPerformAlertState);
    this.StateMachine.AddState(7, NpcPerformMonsterNearbyState_1.NpcPerformMonsterNearbyState, t);
    this.StateMachine.AddState(8, NpcPerformRideVehicleState_1.NpcPerformRideVehicleState, t);
    this.StateMachine.AddState(9, NpcPerformDestroyState_1.NpcPerformDestroyState, t);
    this.BornState = this.StateMachine.GetState(0);
    this.IdleState = this.StateMachine.GetState(1);
    this.InteractState = this.StateMachine.GetState(2);
    this.UnderAttackState = this.StateMachine.GetState(3);
    this.MonsterNearbyState = this.StateMachine.GetState(7);
    this.SystemUiState = this.StateMachine.GetState(5);
    this.RideVehicleState = this.StateMachine.GetState(8);
    this.DestroyState = this.StateMachine.GetState(9);
    this.Lo = t;
    return true;
  }
  OnStart() {
    var t;
    super.OnStart();
    this.vir.DeepCopy(this.ActorComp.ActorForwardProxy);
    this.TurnActionController = new PawnTurnActionController_1.PawnTurnActionController(this.Entity);
    this.PerformGroupController = new NpcPerformGroupController_1.PerformGroupController(this.Entity);
    this.SightController = new NpcSightController_1.NpcSightController(this.Entity);
    this.InterestEventController = new NpcInterestEventController_1.NpcInterestEventController(this.Entity);
    this.ExpressionController = new NpcFacialExpressionController_1.NpcFacialExpressionController(this.Entity.Id);
    if (this.oin) {
      if (this.Owner.IsA(UE.BP_BaseNPC_C.StaticClass()) && ((t = this.Owner).CanPlayerImpact = this.Lo.IsShowStrike, t.CanLookAtPlayer = this.Lo.IsStare, this.KBr = t.CanLookAtPlayer, this.Lo.NpcHitShow ? t.CanPlayerAttack = true : t.CanPlayerAttack = false, this.oin) && (this.Lo.IsShowStrike || this.Lo.NpcHitShow)) {
        t.HitCollision.OnComponentBeginOverlap.Add(this.rin);
      }
      this.jBr = this.Entity.GetComponent(123);
      if (this.jBr) {
        this.jBr.SetSightRange(DEFAULT_SIGHT_RANGE);
      }
      this.Ore();
      this.zLn = this.Entity.GetComponent(48);
      this.rzr = this.Entity.GetComponent(125);
    }
    return true;
  }
  OnActivate() {
    super.OnActivate();
    this.HandleEntryPerform();
    this.PerformGroupController.Init();
    this.ExpressionController.Init();
    this.InterestEventController.Init();
    this.SightController.Init();
    if (this.oin) {
      this.InitAiControllerType();
      this.Cin();
      this.StateMachine.Start(0);
      this.gin();
    }
  }
  OnEnd() {
    this.TurnActionController?.Dispose();
    this.ExpressionController?.Dispose();
    super.OnEnd();
    if (this.oin) {
      this.fin();
      this.kre();
    }
    return true;
  }
  OnClear() {
    this.TurnActionController = undefined;
    if (this.oin) {
      this.StateMachine.Destroy();
      this.pin();
    }
    return true;
  }
  pin() {
    this.BornState = undefined;
    this.StateMachine = undefined;
    this.IdleState = undefined;
    this.InteractState = undefined;
    this.UnderAttackState = undefined;
    this.MonsterNearbyState = undefined;
    this.SystemUiState = undefined;
    this.RideVehicleState = undefined;
    this.DestroyState = undefined;
  }
  Ore() {
    if (!this.$Br) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRunBehaviorTree, this.OnNpcInAiControl);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.StartMoveWithSpline, this.OnStartMoveWithSpline);
      this.$Br = true;
    }
  }
  kre() {
    if (this.$Br) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRunBehaviorTree, this.OnNpcInAiControl);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.StartMoveWithSpline, this.OnStartMoveWithSpline);
      this.$Br = false;
    }
  }
  Cin() {
    this.IdleState.NpcMoveComp = this.Entity.GetComponent(45);
    this.UnderAttackState.SetDefaultDirect(this.ActorComp.ActorForwardProxy);
  }
  OnMonsterNearby() {
    return this.StateMachine.CurrentState === 7 || !this.IsInPlot && this.StateMachine.CurrentState === 1 && this.IdleState.OnMonsterNearby();
  }
  gin() {
    if (this.Lo?.NpcMonsterClosePerform) {
      const e = new MonsterNearbySensory_1.MonsterNearbySensory();
      e.Init(this.Lo.NpcMonsterClosePerform.Range);
      e.OnEnterSensoryRange = t => this.OnMonsterNearby();
      e.OnExitSensoryRange = t => !!e.CheckInRange() || this.StateMachine.CurrentState !== 7 || this.StateMachine.Switch(1);
      this.Ztn = this.Entity.GetComponent(124).AddSensoryInfo(e);
    }
  }
  fin() {
    if (this.Ztn >= 0) {
      this.Entity.GetComponent(124).RemoveSensoryInfo(this.Ztn);
      this.Ztn = -1;
    }
  }
  OnPlayerAttack() {
    if (!this.IsInPlot && this.StateMachine.CurrentState === 1) {
      this.IdleState.OnPlayerAttack();
    }
  }
  OnPlayerAttackBegin() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("NPC", 42, "NPC进入受到攻击ABP动画状态 [OnPlayerAttackBegin]", ["ConfigId", this.Mne]);
    }
    this.IsBeingAttacked = false;
  }
  OnPlayerAttackEnd() {
    this.vin(false);
    if (this.StateMachine.CurrentState !== 3) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("NPC", 42, "NPC退出Attack状态失败 [OnPlayerAttackEnd]", ["ConfigId", this.Mne], ["CurrentState", this.StateMachine.CurrentState]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 42, "NPC退出受到攻击ABP动画状态 [OnPlayerAttackEnd]", ["ConfigId", this.Mne]);
      }
      this.StateMachine.Switch(1);
    }
  }
  OnPlayerImpact() {
    if (!this.IsInPlot && this.StateMachine.CurrentState === 1) {
      this.IdleState.OnPlayerImpact();
    }
  }
  OnPlayerImpactBegin() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("NPC", 42, "NPC进入受到冲撞ABP动画状态 [OnPlayerImpactBegin]", ["ConfigId", this.Mne]);
    }
    this.IsBeingImpacted = false;
  }
  OnPlayerImpactEnd() {
    this.vin(false);
    if (this.StateMachine.CurrentState !== 4) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("NPC", 42, "NPC退出Impact状态失败 [OnPlayerImpactEnd]", ["ConfigId", this.Mne], ["CurrentState", this.StateMachine.CurrentState]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 42, "NPC退出受到冲撞ABP动画状态 [OnPlayerImpactEnd]", ["ConfigId", this.Mne]);
      }
      this.StateMachine.Switch(1);
    }
  }
  OnEnterVehicle() {
    if (this.StateMachine.CurrentState !== 8 && this.StateMachine.CurrentState === 1) {
      this.StateMachine.Switch(8);
    }
  }
  OnLeaveVehicle() {
    if (!!this.StateMachine?.Owner?.Entity && !this.IsPendingDestroy) {
      if (this.StateMachine.CurrentState !== 8) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("NPC", 50, "NPC退出RideVehicle状态失败 [OnLeaveVehicle]", ["ConfigId", this.Mne], ["CurrentState", this.StateMachine.CurrentState]);
        }
      } else {
        this.StateMachine.Switch(1);
      }
    }
  }
  OnPlayerInteractStart(t, e, i, s = undefined) {
    return !!this.TurnActionController && !this.IsInPlot && !(this.StateMachine ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("NPC", 50, "[NpcPerformComp.OnPlayerInteractStart] 开始执行交互转身", ["PbDataID", this.ActorComp?.CreatureData.GetPbDataId()]), this.TurnActionController.NeedTurn = t, this.TurnActionController.WaitTurnEnd = e, this.TurnActionController.OnTurnToInteractTargetEndHandle = i, s ? this.TurnActionController.PlayerOffset.DeepCopy(s) : this.TurnActionController.PlayerOffset.DeepCopy(Vector_1.Vector.ZeroVectorProxy), (this.StateMachine.CurrentState === 8 ? this.RideVehicleState : (this.StateMachine.CurrentState !== 1 && this.StateMachine.Switch(1), this.IdleState)).OnPlayerInteractTurnActionStart(), 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("NPC", 50, "没有勾选NpcPerformComp, 无法交互转身", ["PbDataId", this.Mne]), 1));
  }
  OnPlayerInteractEnd() {
    var t;
    if (this.TurnActionController && !this.IsInPlot && (t = this.StateMachine?.CurrentState)) {
      this.StateMachine.GetState(t).OnPlayerInteractTurnActionEnd();
    }
  }
  OnTick(t) {
    if (this.AnimComp && (this.PerformGroupController?.Tick(t), this.InterestEventController?.Tick(t), this.oin)) {
      this.StateMachine.Update(t);
      this.Svm(t);
    }
  }
  Svm(t) {
    if (this.KBr) {
      if (this.jBr.IsInSightRange && this.lbr()) {
        this.EnableLookAtPlayer(true);
      } else {
        this.EnableLookAtPlayer(false);
      }
    }
  }
  lbr() {
    var t;
    return !!Global_1.Global.BaseCharacter?.IsValid() && (t = Global_1.Global.BaseCharacter.CharacterActorComponent, this.QBr.FromUeVector(t.ActorLocationProxy), this.QBr.SubtractionEqual(this.ActorComp.ActorLocationProxy), this.QBr.Z = 0, this.QBr.Normalize(), MathUtils_1.MathUtils.GetAngleByVectorDot(this.QBr, this.ActorComp.ActorForwardProxy) <= SIGHT_OPEN_DEGREE);
  }
  SightTarget(t, e) {
    if (this.SightController) {
      this.SightController.ChangeSightTarget(t, e);
    } else {
      this.CachedStareTargetMap.set(e, t);
    }
  }
  HandleCachedStareAction() {
    for (var [t, e] of this.CachedStareTargetMap) {
      this.SightController.ChangeSightTarget(e, t);
    }
    this.CachedStareTargetMap.clear();
  }
  get OpenLookAt() {
    return this.KBr;
  }
  SetLookAtPlayerEnabled(t) {
    if (!t && this.AnimComp) {
      this.AnimComp.SetSightTargetItem(undefined);
      this.AnimComp.SetSightTargetPoint(undefined);
    }
    this.KBr = t;
  }
  SetUiOpenPerformance(t, e) {
    if (this.IsInPlot) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 29, "开启系统UI失败，剧情中开启系统UI", ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()], ["已开启系统UI", t], ["正在开启系统UI", this.SystemUiState.SystemUiViewName]);
      }
    } else if (this.StateMachine.CurrentState === 5) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 29, "开启系统UI失败，系统UI已开启", ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()], ["已开启系统UI", t], ["正在开启系统UI", this.SystemUiState.SystemUiViewName]);
      }
    } else {
      this.SystemUiState.SystemUiViewName = t;
      this.SystemUiState.BoardId = e;
      this.StateMachine.Switch(5);
      var i = this.Entity.GetComponent(0);
      if (i?.Valid) {
        i = i.GetBaseInfo().ChildEntityIds;
        if (i && !(i.length < 1)) {
          var s = ModelManager_1.ModelManager.CreatureModel;
          for (const h of i) {
            var r = s.GetEntityByPbDataId(h);
            if (r?.Valid && (r = r.Entity.GetComponent(191))?.Valid) {
              r.SetUiOpenPerformance(t, e);
            }
          }
        }
      }
    }
  }
  ain() {
    this.IsBeingAttacked = true;
    this.vin(true);
    this.Y8e?.ForceUpdate();
    this.OnPlayerAttack();
  }
  hin() {
    var t = Global_1.Global.BaseCharacter.D_GetVelocity().Size2D();
    if (!(t < MIN_IMPACT_STRENGTH)) {
      this.CollisionStrength = t;
      this.Ein();
      this.IsBeingImpacted = true;
      this.vin(true);
      this.Y8e?.ForceUpdate();
      this.OnPlayerImpact();
    }
  }
  vin(t) {
    if (this.Lie && (t && !this.Lie.HasTag(-2044964178) && this.Lie.AddTag(-2044964178), !t) && this.Lie.HasTag(-2044964178)) {
      this.Lie.RemoveTag(-2044964178);
    }
  }
  nin() {
    var t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(209);
    return !!t && (t.HasTag(1408042260) || t.HasTag(64219164) || t.HasTag(1733479717));
  }
  Ein() {
    var t = Global_1.Global.BaseCharacter.D_GetVelocity();
    var e = this.ActorComp.Actor.D_GetVelocity();
    var t = t.op_Subtraction(e);
    var e = this.ActorComp.ActorRight;
    var e = t.CosineAngle2D(e);
    var e = MathCommon_1.MathCommon.RadianToDegree(Math.acos(e));
    var i = this.ActorComp.ActorForward;
    var t = t.CosineAngle2D(i);
    var i = MathCommon_1.MathCommon.RadianToDegree(Math.acos(t));
    if (e > MathCommon_1.MathCommon.RightAngle) {
      this.CollisionDirection = i * -1;
    } else {
      this.CollisionDirection = i;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("NPC", 42, "NPC受到冲撞", ["ConfigId", this.Mne], ["碰撞角度", this.CollisionDirection]);
    }
  }
  static GetStateName(t) {
    switch (t) {
      case 0:
        return "出生";
      case 1:
        return "空闲";
      case 2:
        return "交互";
      case 3:
        return "受到攻击";
      case 4:
        return "受到冲撞";
      case 5:
        return "系统UI";
      case 6:
        return "警觉";
      case 7:
        return "怪物靠近";
      case 8:
        return "乘坐载具";
      case 9:
        return "销毁";
    }
    return "undefined";
  }
  get HasBrain() {
    return this._in !== 0 || this.uin !== 0;
  }
  ResumeAi(t) {
    if (this._in === 2) {
      this.Entity.GetComponent(73).Resume(t);
    } else if (this._in === 1) {
      this.Entity.GetComponent(47).EnableAi(t);
    }
    this.cin = false;
  }
  PauseAi(t) {
    if (this._in === 2) {
      this.Entity.GetComponent(73).Pause(t);
    } else if (this._in === 1) {
      this.Entity.GetComponent(47).DisableAi(t);
    }
    this.cin = true;
  }
  InitAiControllerType() {
    var t = this.Entity.GetComponent(47);
    var e = this.Entity.GetComponent(73);
    if (t && e?.IsNeedPlan) {
      this._in = BehaviorTreeDefines_1.BehaviorTreeDefines.CanUseLevelAiBehaviorTree(this.Entity) ? 1 : 2;
    } else if (t) {
      this._in = 1;
    } else if (e) {
      this._in = 2;
    }
  }
  OnNpcInPlot(t) {
    super.OnNpcInPlot(t);
    if (t) {
      this.PauseAi("OnNpcInPlot");
    } else {
      this.ResumeAi("OnNpcInPlot");
    }
  }
  HandleEntryPerform() {
    this.HandleEntryMaterial();
    this.HandleEntryEffect();
  }
  HandleEntryMaterial() {
    var t;
    if (this.ActorComp?.Actor?.IsA(UE.BP_BaseNPC_C.StaticClass()) && (t = this.ActorComp.Owner)?.BornEffect && (t = t.BornEffect.AssetPathName.toString()) !== "" && t !== "None") {
      this.MaterialController.ApplyMaterialEffect(t);
    }
  }
  HandleEntryEffect() {
    this.HandleCommonNpcEntryEffect();
  }
  HandleCommonNpcEntryEffect() {
    var t = this.Entity.GetComponent(0)?.GetPbEntityInitData();
    if ((t &&= (0, IComponent_1.getComponent)(t.ComponentsData, "EntityVisibleComponent")) && t.UseHolographicEffect) {
      this.MaterialController.LoadAndSetHolographicEffect();
    }
  }
  HandlePendingDestroy() {
    if (this.StateMachine) {
      this.IsPendingDestroy = true;
      this.StateMachine.Switch(9);
    } else {
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    }
  }
  qTl(t) {
    this.rzr.CreatePerceptionEvent(t.NpcFollow.PerformerWhenEnter.Range, this.Entity?.GameBudgetManagedToken, () => {
      if (this.ATl) {
        this.PTl = false;
        if (!this.wTl) {
          this.GTl(this.PTl);
        }
      }
    }, () => {
      if (this.ATl) {
        this.PTl = true;
        if (!this.wTl) {
          this.GTl(this.PTl);
        }
      }
    }, undefined, undefined, t.NpcFollow.PerformerWhenExit.Range);
  }
  EnableLookAtPlayer(t) {
    if (this.yvm !== t) {
      if (this.yvm = t) {
        this.SightTarget(Global_1.Global.BaseCharacter.CharacterActorComponent, 1);
      } else {
        this.SightTarget(undefined, 1);
      }
    }
  }
};
CommonNpcPerformComponent = CommonNpcPerformComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(191)], CommonNpcPerformComponent);
exports.CommonNpcPerformComponent = CommonNpcPerformComponent; //# sourceMappingURL=CommonNpcPerformComponent.js.map