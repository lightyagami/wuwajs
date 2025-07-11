"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const GlobalData_1 = require("../../../GlobalData");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const PROFILE_KEY = "TsTaskNpcPatrol_GetObstacleLocation";
const PATROL_TURN_SPEED = 540;
const NO_FORWARD_DISTANCE = 100;
const NO_FORWARD_TURN_SPEED = 10000;
class TsTaskPatrolLogic extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveState = 0;
    this.MoveOnePath = true;
    this.UseLastMoveIndex = true;
    this.MoveSpeed = 0;
    this.CheckObstacles = true;
    this.CheckObstacleTime = 0;
    this.CheckObstacleLength = 0;
    this.TsMoveState = 0;
    this.TsMoveOnePath = false;
    this.TsUseLastMoveIndex = false;
    this.TsMoveSpeed = 0;
    this.TsCheckObstacles = false;
    this.TsCheckObstacleTime = 0;
    this.TsCheckObstacleLength = 0;
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.StateComp = undefined;
    this.AnimComp = undefined;
    this.PatrolLogic = undefined;
    this.PatrolConfig = undefined;
    this.TraceElement = undefined;
    this.IsSplineLoading = false;
    this.IsInitTsVariables = false;
    this.IsInitComp = false;
    this.IsAvoidObstacles = false;
    this.CacheVector = Vector_1.Vector.Create();
    this.CurTime = -0;
    this.IsMoveFlyingState = false;
    this.FrameSeconds = -0;
    this.FrameRate = -0;
    this.IsPause = false;
    this.ForceExit = false;
  }
  Constructor() {
    super.Constructor();
    this.TsMoveState = 0;
    this.TsMoveOnePath = false;
    this.TsUseLastMoveIndex = false;
    this.TsMoveSpeed = 0;
    this.TsCheckObstacles = false;
    this.TsCheckObstacleTime = 0;
    this.TsCheckObstacleLength = 0;
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.StateComp = undefined;
    this.AnimComp = undefined;
    this.PatrolLogic = undefined;
    this.PatrolConfig = undefined;
    this.TraceElement = undefined;
    this.IsSplineLoading = false;
    this.IsInitTsVariables = false;
    this.IsInitComp = false;
    this.IsAvoidObstacles = false;
    this.CacheVector = Vector_1.Vector.Create();
    this.CurTime = -0;
    this.IsMoveFlyingState = false;
    this.FrameSeconds = -0;
    this.FrameRate = -0;
    this.IsPause = false;
    this.ForceExit = false;
  }
  InitTsVariables() {
    this.TsMoveState = this.MoveState;
    this.TsMoveOnePath = this.MoveOnePath;
    this.TsCheckObstacleLength = this.CheckObstacleLength;
    this.TsCheckObstacleTime = this.CheckObstacleTime;
    this.TsCheckObstacles = this.CheckObstacles;
    this.TsUseLastMoveIndex = this.UseLastMoveIndex;
    this.TsMoveSpeed = this.MoveSpeed;
    this.IsInitTsVariables = true;
  }
  InitComp(t) {
    this.FrameRate = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameRate;
    this.FrameSeconds = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameSeconds;
    this.PatrolLogic = t.AiPatrol;
    this.PatrolConfig = this.PatrolLogic.GetConfig();
    if (this.PatrolConfig) {
      this.IsMoveFlyingState = this.PatrolConfig.ContainZ;
      this.Entity = t.CharAiDesignComp.Entity;
      this.ActorComp = t.CharActorComp;
      this.MoveComp = this.Entity.GetComponent(45);
      if (this.IsMoveFlyingState && this.MoveComp) {
        this.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 5,
          Context: "[TsTaskPatrolLogic.InitComp]"
        });
      }
      this.StateComp = this.Entity.GetComponent(101);
      this.AnimComp = this.Entity.GetComponent(177);
      if (!this.PatrolLogic.IsInitialized) {
        this.PatrolLogic.GeneratePatrol(false);
      }
      this.IsSplineLoading = true;
      this.IsInitComp = true;
    } else {
      this.Finish(false);
    }
  }
  ReceiveExecuteAI(t, i) {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.InitTsVariables();
    }
    if (!this.IsInitComp) {
      var s = t.AiController;
      if (!s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
        }
        this.FinishExecute(false);
        return;
      }
      this.InitComp(s);
    }
    this.InitBaseInfo();
    if (!this.TraceElement) {
      this.InitTraceElement();
    }
  }
  InitBaseInfo() {
    this.CacheVector ||= Vector_1.Vector.Create();
    this.CurTime = 0;
    this.IsPause = false;
    this.ForceExit = false;
    this.IsAvoidObstacles = false;
  }
  InitTraceElement() {
    this.TraceElement = UE.NewObject(UE.TraceCapsuleElement.StaticClass());
    this.TraceElement.bIsSingle = true;
    this.TraceElement.bIgnoreSelf = true;
    this.TraceElement.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    this.TraceElement.HalfHeight = this.ActorComp.DefaultHalfHeight;
    this.TraceElement.Radius = this.ActorComp.DefaultRadius;
    this.TraceElement.WorldContextObject = this.ActorComp.Owner;
  }
  SetTraceElement(t, i) {
    this.TraceElement.SetStartLocation(t.X, t.Y, t.Z);
    this.TraceElement.SetEndLocation(i.X, i.Y, i.Z);
    return TraceElementCommon_1.TraceElementCommon.CapsuleTrace(this.TraceElement, PROFILE_KEY);
  }
  CallOutside() {
    var t;
    if (GlobalData_1.GlobalData.BpEventManager && (t = this.PatrolLogic?.PatrolPoint) && t.IsMain) {
      GlobalData_1.GlobalData.BpEventManager.AI巡逻达到样条点.Broadcast(this.ActorComp.Actor, this.PatrolLogic.PatrolIndex);
    }
  }
  InitPatrolInfo() {
    var t = this.ActorComp.CreatureData;
    this.PatrolLogic.StartPatrol(this.TsUseLastMoveIndex, () => {
      this.CallOutside();
    });
    t.SetPosAbnormal(false);
    this.PatrolLogic.ResetBaseInfoByMainPoint(this.MoveComp, this.StateComp, this.TsMoveState);
  }
  CheckSplineLoading() {
    return !!this.IsSplineLoading && !!this.PatrolLogic?.IsInitialized && !(this.IsSplineLoading = false);
  }
  ReceiveTickAI(t, i, s) {
    if (this.ForceExit) {
      this.Finish(false);
    } else if (!this.IsPause) {
      if (this.CheckSplineLoading()) {
        this.InitPatrolInfo();
        this.PatrolLogic.CheckPatrolEnd();
      } else {
        this.CurTime += s;
        if (!this.TsCheckObstacles || !(this.CurTime > this.TsCheckObstacleTime) || !(this.CurTime = 0, this.ExecuteObstacle(), this.IsAvoidObstacles)) {
          if (!this.PatrolLogic || this.CheckMoveEnd(this.PatrolLogic.PatrolPoint)) {
            this.PatrolFinish();
            this.Finish(true);
          } else if (this.CheckCanMove()) {
            this.MoveToPatrolPoint(s);
          }
        }
      }
    }
  }
  CheckCanMove() {
    return !this.ForceExit && !this.IsPause && !!this.MoveComp && !!this.MoveComp.CanMove() && !!this.MoveComp.CanUpdateMovingRotation();
  }
  MoveToPatrolPoint(t) {
    this.CacheVector.FromUeVector(this.PatrolLogic.PatrolPoint.Point);
    this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
    if (!this.IsMoveFlyingState) {
      this.CacheVector.Z -= this.ActorComp.HalfHeight;
    }
    var i = [this.CacheVector.X, this.CacheVector.Y, this.CacheVector.Z];
    this.CacheVector.Z = 0;
    var s = this.CacheVector.Size();
    this.CacheVector.Z = i[2];
    this.TurnToDirect(this.CacheVector, s, t);
    this.CacheVector.Set(i[0], i[1], i[2]);
    this.MoveCharacter(this.CacheVector, s, t);
  }
  TurnToNextPoint() {
    return !!this.PatrolLogic?.PatrolPoint && (this.CacheVector.FromUeVector(this.PatrolLogic.PatrolPoint.Point), this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy), this.CacheVector.Size() < NO_FORWARD_DISTANCE) && this.PatrolLogic.CheckPatrolEnd();
  }
  CheckMoveEnd(t) {
    return !!this.TurnToNextPoint() || (t !== this.PatrolLogic.PatrolPoint && (this.TsMoveOnePath && t.IsMain && !t.IsIgnorePoint && t.Actions && ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t.Actions, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)), this.PatrolLogic.PatrolPoint.IsMain) && (this.CallOutside(), this.PatrolLogic.ResetBaseInfoByMainPoint(this.MoveComp, this.StateComp, this.TsMoveState)), false);
  }
  TurnToDirect(t, i, s) {
    this.CacheVector.FromUeVector(t);
    this.CacheVector.Normalize();
    let h = PATROL_TURN_SPEED;
    if (i < NO_FORWARD_DISTANCE) {
      h = NO_FORWARD_TURN_SPEED;
    }
    this.MoveComp.SmoothCharacterRotation(Rotator_1.Rotator.Create(0, MathUtils_1.MathUtils.GetAngleByVector2D(this.CacheVector), 0), h, s);
  }
  MoveCharacter(i, s, h) {
    this.CacheVector.FromUeVector(i);
    this.CacheVector.Normalize();
    if (this.CacheVector.IsNearlyZero()) {
      if (this.Entity.GetTickInterval() <= 1) {
        this.AnimComp.StopModelBuffer();
      }
    } else {
      i = this.TsMoveSpeed / this.FrameRate * (h / this.FrameSeconds);
      let t = h;
      this.CacheVector.Addition(this.ActorComp.ActorForwardProxy, this.CacheVector);
      this.CacheVector.Normalize();
      this.CacheVector.MultiplyEqual(i);
      h = this.AnimComp?.GetMeshTransform();
      if (s < i) {
        t = s / this.TsMoveSpeed;
        this.SetPatrolPointLocation();
      } else {
        this.MoveComp.MoveCharacter(this.CacheVector, t);
      }
      if (this.AnimComp?.Valid && this.Entity.GetTickInterval() > 1 && this.ActorComp.Owner?.WasRecentlyRenderedOnScreen() && h) {
        this.AnimComp.SetModelBuffer(h, t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      }
    }
    this.MoveComp.IsSpecialMove = true;
    this.MoveComp.HasMoveInput = true;
    this.MoveComp.Speed = this.TsMoveSpeed;
  }
  SetPatrolPointLocation() {
    this.CacheVector.FromUeVector(this.PatrolLogic.PatrolPoint.Point);
    if (!this.IsMoveFlyingState) {
      this.CacheVector.Z += this.ActorComp.HalfHeight;
    }
    this.ActorComp.SetActorLocation(this.CacheVector.ToUeVector(), "角色移动到位置.MoveCharacter", false);
  }
  ExecuteObstacle() {
    var t;
    var i;
    if (this.PatrolLogic?.PatrolPoint && this.PatrolLogic.PatrolPoint.Point && (this.CacheVector.FromUeVector(this.PatrolLogic.PatrolPoint.Point), this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy), this.CacheVector.Z = 0, this.CacheVector.Normalize(), this.CacheVector.MultiplyEqual(this.TsCheckObstacleLength), this.CacheVector.AdditionEqual(this.ActorComp.ActorLocationProxy), t = this.SetTraceElement(this.ActorComp.ActorLocationProxy, this.CacheVector), i = this.TraceElement.HitResult, t) && i.bBlockingHit) {
      if (!this.IsAvoidObstacles) {
        this.StopMove();
      }
      this.IsAvoidObstacles = true;
    } else {
      this.IsAvoidObstacles = false;
    }
  }
  StopMove() {
    if (this.AnimComp) {
      this.AnimComp.StopModelBuffer();
    }
    if (this.MoveComp) {
      this.MoveComp.Speed = 0;
      this.MoveComp.HasMoveInput = false;
      this.MoveComp.IsSpecialMove = false;
      this.MoveComp.StopMove(true);
    }
    if (this.ActorComp) {
      this.ActorComp.ClearInput();
    }
  }
  PatrolFinish() {
    this.ForceExit = true;
    this.StopMove();
    this.CallOutside();
    this.PatrolLogic?.PatrolFinish();
  }
  OnAbort() {
    this.PatrolFinish();
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      this.StopMove();
      this.CurTime = 0;
      this.ForceExit = false;
      this.IsPause = false;
    }
  }
}
exports.default = TsTaskPatrolLogic;
//# sourceMappingURL=TsTaskPatrolLogic.js.map