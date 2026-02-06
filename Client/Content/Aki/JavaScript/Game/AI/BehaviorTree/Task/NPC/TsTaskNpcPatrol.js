"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const CharacterUnifiedStateTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
const AiPatrolController_1 = require("../../../Controller/AiPatrolController");
const TsAiController_1 = require("../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const PROFILE_KEY = "TsTaskNpcPatrol_GetObstacleLocation";
const CHECK_RAYCAST_INTERVAL = 0.5;
const DEBUG_CONFIG_ID = [109002526, 109002530];
class TsTaskNpcPatrol extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.DebugMode = false;
    this.MoveState = 0;
    this.MoveOnePath = false;
    this.UseSimpleMove = false;
    this.RaycastLength = 0;
    this.ChangeMoveTime = 0;
    this.ChangeMoveAngle = 0;
    this.MaxChangeAngle = 0;
    this.ChangeMoveDistance = 0;
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.StateComp = undefined;
    this.AnimComp = undefined;
    this.AiComp = undefined;
    this.CacheCrossVector = undefined;
    this.CacheVector = undefined;
    this.SingleMoveForward = undefined;
    this.CurTime = -0;
    this.ChangeMoveTimeInternal = -0;
    this.TraceElement = undefined;
    this.IsInit = false;
    this.IsPause = false;
    this.ForceExit = false;
    this.EntityConfigId = 0;
    this.IsDebugEntity = false;
    this.DebugComp = undefined;
    this.PatrolLogic = undefined;
    this.PatrolConfig = undefined;
    this.IsInitTsVariables = false;
    this.TsDebugMode = false;
    this.TsMoveState = 0;
    this.TsMoveOnePath = false;
    this.TsUseSimpleMove = false;
    this.TsRaycastLength = 0;
    this.TsChangeMoveTime = -0;
    this.TsChangeMoveAngle = 0;
    this.TsMaxChangeAngle = 0;
    this.TsChangeMoveDistance = 0;
    this.HandleMoveEnd = undefined;
    this.ChangeStateHandle = undefined;
  }
  Constructor() {
    super.Constructor();
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.StateComp = undefined;
    this.AnimComp = undefined;
    this.AiComp = undefined;
    this.CacheCrossVector = undefined;
    this.CacheVector = undefined;
    this.SingleMoveForward = undefined;
    this.CurTime = -0;
    this.ChangeMoveTimeInternal = -0;
    this.TraceElement = undefined;
    this.IsInit = false;
    this.IsPause = false;
    this.ForceExit = false;
    this.EntityConfigId = 0;
    this.IsDebugEntity = false;
    this.DebugComp = undefined;
    this.PatrolLogic = undefined;
    this.PatrolConfig = undefined;
    this.IsInitTsVariables = false;
    this.TsDebugMode = false;
    this.TsMoveState = 0;
    this.TsMoveOnePath = false;
    this.TsUseSimpleMove = false;
    this.TsRaycastLength = 0;
    this.TsChangeMoveTime = -0;
    this.TsChangeMoveAngle = 0;
    this.TsMaxChangeAngle = 0;
    this.TsChangeMoveDistance = 0;
    this.HandleMoveEnd = undefined;
    this.ChangeStateHandle = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsDebugMode = this.DebugMode;
      this.TsMoveState = this.MoveState;
      this.TsMoveOnePath = this.MoveOnePath;
      this.TsUseSimpleMove = this.UseSimpleMove;
      this.TsRaycastLength = this.RaycastLength;
      this.TsChangeMoveTime = this.ChangeMoveTime;
      this.TsChangeMoveAngle = this.ChangeMoveAngle;
      this.TsMaxChangeAngle = this.MaxChangeAngle;
      this.TsChangeMoveDistance = this.ChangeMoveDistance;
    }
  }
  ReceiveExecuteAI(t, i) {
    var s;
    this.InitTsVariables();
    if (t instanceof TsAiController_1.default) {
      s = t.AiController;
      this.PatrolLogic = s.AiPatrol;
      this.PatrolConfig = this.PatrolLogic.GetConfig();
      if (this.PatrolConfig) {
        this.ActorComp = s.CharActorComp;
        if (GlobalData_1.GlobalData.IsPlayInEditor) {
          this.DebugComp = this.ActorComp.Actor.TsCharacterDebugComponent;
        }
        this.Entity = s.CharAiDesignComp.Entity;
        this.InitBaseInfo();
        this.InitTraceElement();
        if (AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 42, "NPC开始巡逻", ["Id", this.EntityConfigId], ["IsLogicAutonomousProxy", this.ActorComp.IsAutonomousProxy], ["IsMoveAutonomousProxy", this.ActorComp.IsMoveAutonomousProxy]);
        }
        this.HandleMoveEnd ||= t => {
          this.ExecuteMoveEnd(t);
        };
        this.PatrolLogic.GeneratePatrol(false);
        this.InitPatrolInfo();
      } else {
        this.Finish(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.Finish(false);
    }
  }
  InitBaseInfo() {
    if (!this.CacheVector) {
      this.CacheCrossVector = Vector_1.Vector.Create();
      this.CacheVector = Vector_1.Vector.Create();
      this.SingleMoveForward = Vector_1.Vector.Create();
    }
    this.MoveComp = this.Entity.GetComponent(48);
    this.StateComp = this.Entity.GetComponent(186);
    this.AnimComp = this.Entity.GetComponent(188);
    this.AiComp = this.Entity.GetComponent(50);
    this.CurTime = 0;
    this.IsInit = false;
    this.IsPause = false;
    this.ForceExit = false;
    this.EntityConfigId = this.ActorComp.CreatureData.GetPbDataId();
    this.IsDebugEntity = DEBUG_CONFIG_ID.includes(this.EntityConfigId);
    if (this.DebugComp) {
      this.DebugComp.ClearDebugPatrolPoints();
    }
    if (this.IsDebugEntity && AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode) {
      this.ChangeStateHandle = (t, i) => {
        this.HandleChangedState(t, i);
      };
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.ChangeStateHandle);
    }
  }
  HandleChangedState(t, i) {
    if (this.IsInit) {
      if (i === CharacterUnifiedStateTypes_1.ECharMoveState.Other) {
        this.ForceExit = true;
      } else if (this.AiComp.AiController.AiPatrol.CheckMoveStateChanged(this.StateComp, this.TsMoveState)) {
        TimerSystem_1.TimerSystem.Next(() => {
          var t = this.AiComp?.AiController?.AiPatrol;
          if (t) {
            t.ChangeMoveState(this.StateComp, this.TsMoveState);
          }
        });
      }
    }
  }
  InitTraceElement() {
    if (!this.TraceElement) {
      this.TraceElement = UE.NewObject(UE.TraceBoxElement.StaticClass());
      this.TraceElement.bIsSingle = true;
      this.TraceElement.bIgnoreSelf = true;
      this.TraceElement.SetBoxHalfSize(this.TsRaycastLength / 2, 20, this.ActorComp.HalfHeight / 2);
      this.TraceElement.DrawTime = CHECK_RAYCAST_INTERVAL;
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.TraceElement, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.TraceElement, ColorUtils_1.ColorUtils.LinearRed);
      this.TraceElement.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
      this.TraceElement.SetDrawDebugTrace(this.TsDebugMode ? 2 : 0);
    }
    this.TraceElement.WorldContextObject = this.ActorComp.Owner;
  }
  InitPatrolInfo() {
    var t = this.ActorComp.ActorLocationProxy;
    var i = this.ActorComp.CreatureData;
    this.PatrolLogic.StartPatrol(false, undefined);
    i.SetPosAbnormal(false);
    this.PatrolLogic.ResetBaseInfoByMainPoint(this.MoveComp, this.StateComp, this.TsMoveState);
    if (this.TsDebugMode && this.DebugComp) {
      this.DebugComp.SaveDebugPatrolPoint(t);
    }
    this.MoveToPatrolPoint();
    this.IsInit = true;
  }
  MoveToPatrolPoint() {
    var t = this.PatrolLogic.PatrolPoint;
    if (t) {
      this.CacheVector.FromUeVector(t.Point);
      this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
      this.CacheVector.Normalize();
      this.SingleMoveForward.FromUeVector(this.CacheVector);
      t = {
        Points: [{
          Index: 0,
          Position: t.Point,
          MoveState: this.TsMoveState
        }],
        Navigation: true,
        IsFly: this.PatrolConfig.ContainZ,
        DebugMode: this.TsDebugMode,
        Loop: false,
        Callback: this.HandleMoveEnd,
        ReturnFalseWhenNavigationFailed: false
      };
      this.MoveComp.MoveAlongPath(t);
    } else {
      this.Finish(false);
    }
  }
  ExecuteMoveEnd(t) {
    var i;
    if (t === 1) {
      i = this.PatrolLogic.PatrolPoint;
      if (this.CheckMoveEnd(i)) {
        this.PatrolLogic.PatrolFinish();
        this.Finish(true);
      } else if (i !== this.PatrolLogic.PatrolPoint) {
        if (i = this.PatrolLogic.PatrolPoint) {
          if (i.IsMain) {
            this.PatrolLogic.ResetBaseInfoByMainPoint(this.MoveComp, this.StateComp, this.TsMoveState);
          }
          this.MoveToPatrolPoint();
        } else {
          this.Finish(true);
        }
      }
    } else if (t === 2) {
      this.Finish(false);
    } else if (t === 3) {
      this.PatrolError();
    }
  }
  ReceiveTickAI(t, i, s) {
    if (this.ForceExit) {
      this.Finish(false);
    } else if (!this.IsPause) {
      if (this.ChangeMoveTimeInternal > 0 && (this.ChangeMoveTimeInternal -= s, this.ChangeMoveTimeInternal < 0)) {
        this.MoveToPatrolPoint();
      }
      this.CurTime += s;
      if (this.CurTime > CHECK_RAYCAST_INTERVAL) {
        this.CurTime = 0;
        this.ExecuteObstacle();
      }
    }
  }
  ExecuteObstacle() {
    var t;
    if (this.IsDebugEntity && AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode && this.DebugComp) {
      this.DebugComp.SaveDebugPatrolPoint(this.ActorComp.ActorLocationProxy);
    }
    if (this.GetObstacleLocation()) {
      t = this.MoveComp.MoveController.GetCurrentToLocation();
      t = this.CalculateAmendForward(t);
      if (!(Math.abs(MathUtils_1.MathUtils.GetAngleByVectorDot(this.SingleMoveForward, t)) > this.TsMaxChangeAngle)) {
        this.CalculateAmendMovePoint(t);
      }
    }
  }
  CalculateAmendForward(t) {
    this.CacheVector.FromUeVector(t);
    this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
    this.CacheVector.Z = 0;
    this.CacheVector.Normalize();
    Vector_1.Vector.CrossProduct(this.ActorComp.ActorForwardProxy, this.CacheVector, this.CacheCrossVector);
    this.CacheVector.FromUeVector(this.ActorComp.ActorForwardProxy);
    if (this.CacheCrossVector.Z > 0) {
      this.CacheVector.RotateAngleAxis(-this.TsChangeMoveAngle, Vector_1.Vector.UpVectorProxy, this.CacheVector);
    } else {
      this.CacheVector.RotateAngleAxis(this.TsChangeMoveAngle, Vector_1.Vector.UpVectorProxy, this.CacheVector);
    }
    return this.CacheVector;
  }
  CalculateAmendMovePoint(t) {
    this.CacheVector.FromUeVector(t);
    this.CacheVector.MultiplyEqual(this.TsChangeMoveDistance);
    this.CacheVector.AdditionEqual(this.ActorComp.ActorLocationProxy);
    t = {
      Points: [{
        Index: 0,
        Position: this.CacheVector,
        MoveState: this.TsMoveState
      }],
      Navigation: true,
      IsFly: this.PatrolConfig.ContainZ,
      DebugMode: this.TsDebugMode,
      Loop: false,
      Callback: this.HandleMoveEnd,
      ReturnFalseWhenNavigationFailed: false
    };
    this.MoveComp.MoveAlongPath(t);
    this.ChangeMoveTimeInternal = this.TsChangeMoveTime;
  }
  GetObstacleLocation() {
    this.CacheVector.FromUeVector(this.ActorComp.ActorForwardProxy);
    this.CacheVector.MultiplyEqual(this.TraceElement.HalfSizeX);
    this.CacheVector.AdditionEqual(this.ActorComp.ActorLocationProxy);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.TraceElement, this.CacheVector);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.TraceElement, this.CacheVector);
    TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(this.TraceElement, this.ActorComp.ActorRotationProxy);
    var t = TraceElementCommon_1.TraceElementCommon.BoxTrace(this.TraceElement, PROFILE_KEY);
    var i = this.TraceElement.HitResult;
    return !!t && !!i.bBlockingHit && !(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, 0, this.CacheVector), this.IsDebugEntity && AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode && Log_1.Log.CheckInfo() && Log_1.Log.Info("Level", 42, "NPC巡逻，碰撞到实体", ["Id", this.EntityConfigId], ["Actor", i.Actors.Get(0).GetActorLabel()], ["NowLocation", this.ActorComp.ActorLocationProxy], ["HitLocation", this.CacheVector]), 0);
  }
  CheckMoveEnd(t) {
    let i = false;
    if (this.ChangeMoveTimeInternal > 0) {
      this.ChangeMoveTimeInternal = 0;
      this.MoveToPatrolPoint();
    } else {
      i = this.PatrolLogic.CheckPatrolEnd();
      if (this.TsMoveOnePath && t.IsMain && !t.IsIgnorePoint && t.Actions) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t.Actions, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id));
      }
    }
    return i;
  }
  PatrolError() {
    var t;
    var i;
    var s;
    this.IsPause = true;
    if (AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode && (t = this.ActorComp.ActorLocationProxy, s = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy, Log_1.Log.CheckWarn() && Log_1.Log.Warn("AI", 42, "NPC巡逻，触发异常停止", ["Id", this.EntityConfigId], ["EntityActive", this.Entity.Active], ["HasMove", this.MoveComp.HasMoveInput], ["TickInterval", this.Entity.GetTickInterval()], ["HasModelBuffer", this.AnimComp.HasModelBuffer()], ["WasRecentlyRenderedOnScreen", this.ActorComp.Owner.WasRecentlyRenderedOnScreen()], ["CustomTimeDilation", this.ActorComp.Owner.CustomTimeDilation]), i = this.PatrolLogic.PatrolPoint.Point, Log_1.Log.CheckWarn() && Log_1.Log.Warn("AI", 42, "NPC巡逻，巡逻信息", ["PlayerDist", Math.ceil(Vector_1.Vector.Dist2D(t, s))], ["PatrolDist", Math.ceil(Vector_1.Vector.Dist2D(t, i))], ["PatrolIndex", this.PatrolLogic.PatrolIndex], ["NowLocation", t], ["ToLocation", i]), Log_1.Log.CheckWarn() && Log_1.Log.Warn("AI", 42, "NPC巡逻，角色输入信息", ["SimpleMove", this.TsUseSimpleMove], ["MoveState", this.StateComp?.MoveState], ["MovementMode", this.MoveComp.CharacterMovement.MovementMode], ["MoveSpeed", this.MoveComp.Speed], ["MaxSpeed", this.MoveComp.CharacterMovement.MaxWalkSpeed], ["MoveInput", this.ActorComp.Actor.K2_GetMovementInputVector()], ["InputDirect", this.ActorComp.InputDirectProxy], ["InputFacing", this.ActorComp.InputFacingProxy], ["ActorForward", this.ActorComp.ActorForwardProxy], ["Velocity", this.ActorComp.Owner.D_GetVelocity()]), s = this.AnimComp.MainAnimInstance, Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("AI", 42, "NPC巡逻，角色ABP动画详细信息", ["Anims", s.GetDebugAnimNodeString()]);
    }
    this.ActorComp.CreatureData.RequestPosAbnormal();
    this.ActorComp.ClearInput();
    this.AnimComp.StopModelBuffer();
    this.MoveComp.StopMove(true);
    this.MoveComp.IsSpecialMove = false;
    this.MoveComp.HasMoveInput = false;
  }
  OnAbort() {
    this.PatrolLogic?.PatrolFinish();
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      if (AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 42, "NPC退出巡逻", ["Id", this.EntityConfigId]);
      }
      if (this.MoveComp) {
        if (this.TsMoveOnePath) {
          this.MoveComp.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
        }
        this.MoveComp.IsSpecialMove = false;
        this.MoveComp.HasMoveInput = false;
      }
      if (this.IsDebugEntity && AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.ChangeStateHandle);
      }
      this.Entity = undefined;
      this.ActorComp = undefined;
      this.DebugComp = undefined;
      this.MoveComp = undefined;
      this.StateComp = undefined;
      this.AnimComp = undefined;
      this.AiComp = undefined;
      this.PatrolLogic = undefined;
      this.PatrolConfig = undefined;
      this.CurTime = 0;
      this.IsPause = false;
      this.ForceExit = false;
      this.IsInit = false;
    }
  }
}
exports.default = TsTaskNpcPatrol;
//# sourceMappingURL=TsTaskNpcPatrol.js.map