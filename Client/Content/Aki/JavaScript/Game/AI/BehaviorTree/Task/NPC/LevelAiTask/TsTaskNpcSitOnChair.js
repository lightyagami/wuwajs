"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const AiContollerLibrary_1 = require("../../../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
const TOLERANCE = 10;
const TURN_SPEED = 200;
const NEARBY_CHAIR_OFFSET = 70;
const MOVE_TO_CHAIR_SPEED = 70;
const MOVE_TO_NEARBY_CHAIR_SPEED = 100;
const MOVE_TO_CHAIR_DISTANCE_TOLERANCE = 5;
const MODEL_BUFFER_SMOOTH_TIME = 200;
class TsTaskNpcSitOnChair extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.ChairEntityId = 0;
    this.MovementMode = 0;
    this.MontagePath = "";
    this.LoopDuration = 0;
    this.RepeatTimes = 0;
    this.PlayingMontage = -1;
    this.PhaseInternal = 0;
    this.IsExecuteMoveNearby = false;
    this.IsExecuteMoveClose = false;
    this.IsExecuteTurnTo = false;
    this.IsExecutePlayMontage = false;
    this.IsExecuteMoveAway = false;
    this.Entity = undefined;
    this.Character = undefined;
    this.MoveComp = undefined;
    this.AnimComp = undefined;
    this.ChairController = undefined;
    this.IsInitTsVariables = false;
    this.TsChairEntityId = 0;
    this.TsMontagePath = "";
    this.TsLoopDuration = 0;
    this.TsRepeatTimes = 0;
    this.ChairNearbyPos = undefined;
    this.ChairSitPos = undefined;
    this.TempVec = undefined;
  }
  Constructor() {
    super.Constructor();
    this.MovementMode = 0;
    this.PlayingMontage = -1;
    this.PhaseInternal = 0;
    this.IsExecuteMoveNearby = false;
    this.IsExecuteMoveClose = false;
    this.IsExecuteTurnTo = false;
    this.IsExecutePlayMontage = false;
    this.IsExecuteMoveAway = false;
    this.Entity = undefined;
    this.Character = undefined;
    this.MoveComp = undefined;
    this.AnimComp = undefined;
    this.ChairController = undefined;
    this.IsInitTsVariables = false;
    this.TsChairEntityId = 0;
    this.TsMontagePath = "";
    this.TsLoopDuration = 0;
    this.TsRepeatTimes = 0;
    this.ChairNearbyPos = undefined;
    this.ChairSitPos = undefined;
    this.TempVec = undefined;
  }
  get Phase() {
    return this.PhaseInternal;
  }
  set Phase(i) {
    if (this.PhaseInternal !== i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "[TsTaskNpcSitOnChair] 切换阶段", ["Phase", i]);
      }
      this.PhaseInternal = i;
    }
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsChairEntityId = this.ChairEntityId;
      this.TsMontagePath = this.MontagePath;
      this.TsLoopDuration = this.LoopDuration;
      this.TsRepeatTimes = this.RepeatTimes;
      this.ChairNearbyPos = Vector_1.Vector.Create();
      this.ChairSitPos = Vector_1.Vector.Create();
      this.TempVec = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(i, t) {
    this.InitTsVariables();
    var s = i.AiController;
    if (s) {
      this.Entity = s.CharAiDesignComp.Entity;
      this.Character = this.Entity.GetComponent(3);
      this.MoveComp = this.Entity.GetComponent(48);
      this.AnimComp = this.Entity.GetComponent(188);
      if (this.MoveComp?.CharacterMovement?.IsValid()) {
        s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.TsChairEntityId);
        this.ChairController = s?.Entity?.GetComponent(209)?.GetSubEntityInteractLogicController();
        if (this.ChairController && this.ChairController.IsSceneInteractionLoadCompleted()) {
          if (this.TsMontagePath === "") {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("BehaviorTree", 50, "[TsTaskSitOnChair]无效的Montage路径", ["Type", i.GetClass().GetName()], ["PbDataId", this.Character.CreatureData.GetPbDataId()]);
            }
            this.FinishExecute(true);
          } else {
            this.Phase = 1;
          }
        } else {
          this.FinishExecute(true);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 50, "[TsTaskSitOnChair]MoveComp不合法", ["Type", i.GetClass().GetName()], ["PbDataId", this.Character.CreatureData.GetPbDataId()]);
        }
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", i.GetClass().GetName()]);
      }
      this.FinishExecute(true);
    }
  }
  ReceiveTickAI(i, t, s) {
    switch (this.Phase) {
      case 1:
        this.Phase = 2;
        break;
      case 2:
        this.ExecuteMoveNearby();
        break;
      case 3:
        this.ExecuteMoveClose();
        break;
      case 4:
        this.ExecuteTurnTo();
        if (GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(this.Character) < TOLERANCE) {
          this.MoveComp.CharacterMovement.MovementMode = this.MovementMode;
          this.Phase = 5;
        }
        break;
      case 5:
        this.ExecutePlayMontage();
        break;
      case 6:
        this.ExecuteMoveAway();
        break;
      case 7:
        this.Finish(true);
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 50, "[TsTaskTurnAndSit] 阶段切换出错", ["CurPhase", this.Phase]);
        }
    }
  }
  OnAbort() {
    var i;
    if (this.Phase === 2 || this.Phase === 3 || this.Phase === 6) {
      this.MoveComp?.StopMoveNew();
    } else if (this.Phase === 4) {
      this.Character?.ClearInput();
    } else if (this.Phase === 5 && (i = this.Entity?.GetComponent(49), this.PlayingMontage !== -1)) {
      i?.VolatileMontageStopByLoad(3, this.PlayingMontage, 0);
      this.PlayingMontage = -1;
    }
  }
  OnClear() {
    this.Character = undefined;
    this.MovementMode = 0;
    this.IsExecuteMoveNearby = false;
    this.IsExecuteMoveClose = false;
    this.IsExecuteTurnTo = false;
    this.IsExecutePlayMontage = false;
    this.IsExecuteMoveAway = false;
  }
  ExecuteMoveNearby() {
    var i;
    if (!this.IsExecuteMoveNearby) {
      this.IsExecuteMoveNearby = true;
      this.ChairController.Possess(this.Entity);
      i = this.ChairController.GetSitLocation();
      this.ChairController.GetForwardDirection().Multiply(NEARBY_CHAIR_OFFSET, this.ChairNearbyPos);
      this.ChairNearbyPos.AdditionEqual(i);
      i = {
        Points: [{
          Index: 0,
          Position: this.ChairNearbyPos,
          MoveState: IComponent_1.EPatrolMoveState.Walk,
          MoveSpeed: MOVE_TO_NEARBY_CHAIR_SPEED
        }],
        Navigation: true,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Distance: MOVE_TO_CHAIR_DISTANCE_TOLERANCE,
        Callback: i => {
          this.MoveComp?.StopMoveNew();
          this.Phase = 3;
        },
        ReturnFalseWhenNavigationFailed: false
      };
      this.MoveComp.MoveAlongPath(i);
    }
  }
  ExecuteMoveClose() {
    var i;
    var t;
    if (!this.IsExecuteMoveClose) {
      this.IsExecuteMoveClose = true;
      this.ChairController.Possess(this.Entity);
      this.ChairController.IgnoreCollision();
      i = this.Character.ActorLocationProxy;
      t = this.ChairController.GetSitLocation();
      this.ChairSitPos.Set(t.X, t.Y, i.Z);
      t = {
        Points: [{
          Index: 0,
          Position: this.ChairSitPos,
          MoveState: IComponent_1.EPatrolMoveState.Walk,
          MoveSpeed: MOVE_TO_CHAIR_SPEED
        }],
        Navigation: true,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Distance: MOVE_TO_CHAIR_DISTANCE_TOLERANCE,
        Callback: i => {
          this.MoveComp?.StopMoveNew();
          this.Phase = 4;
        },
        ReturnFalseWhenNavigationFailed: false
      };
      this.MoveComp.MoveAlongPath(t);
    }
  }
  ExecuteTurnTo() {
    if (!this.IsExecuteTurnTo) {
      this.IsExecuteTurnTo = true;
      this.ChairController.GetForwardDirection().Multiply(200, this.TempVec);
      this.TempVec.AdditionEqual(this.ChairNearbyPos);
      this.MovementMode = this.MoveComp.CharacterMovement.MovementMode;
      this.MoveComp.CharacterMovement.MovementMode = 1;
      AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(this.Character, this.TempVec, TURN_SPEED);
    }
  }
  ExecutePlayMontage() {
    var i;
    if (!this.IsExecutePlayMontage) {
      this.IsExecutePlayMontage = true;
      this.AnimComp?.SetLocationAndRotatorWithModelBuffer(this.ChairSitPos.ToUeVector(), this.Character.ActorRotationProxy.ToUeRotator(), MODEL_BUFFER_SMOOTH_TIME, "TsTaskNpcSitOnChair.ExecuteTurnToFinish");
      i = this.Entity.GetComponent(49);
      this.PlayingMontage = i.VolatileMontagePlayByLoad(3, this.TsMontagePath, undefined, undefined, i => {
        if (i) {
          this.Phase = 6;
        } else {
          this.FinishExecute(true);
        }
      }, this.TsLoopDuration, this.TsRepeatTimes);
    }
  }
  ExecuteMoveAway() {
    var i;
    if (!this.IsExecuteMoveAway) {
      this.IsExecuteMoveAway = true;
      this.ChairController.UnPossess(this.Entity);
      i = {
        Points: [{
          Index: 0,
          Position: this.ChairNearbyPos,
          MoveState: IComponent_1.EPatrolMoveState.Walk,
          MoveSpeed: MOVE_TO_CHAIR_SPEED
        }],
        Navigation: true,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Distance: MOVE_TO_CHAIR_DISTANCE_TOLERANCE,
        Callback: i => {
          this.MoveComp.StopMoveNew();
          this.ChairController.ResetCollision();
          this.ChairController.UnPossess(this.Entity);
          this.Phase = 7;
        },
        ReturnFalseWhenNavigationFailed: false
      };
      this.MoveComp.MoveAlongPath(i);
    }
  }
}
exports.default = TsTaskNpcSitOnChair;
//# sourceMappingURL=TsTaskNpcSitOnChair.js.map