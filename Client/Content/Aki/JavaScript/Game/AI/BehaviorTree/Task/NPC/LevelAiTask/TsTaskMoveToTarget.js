"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../../Global");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
const MIN_MOVE_SPEED = 20;
const MOVE_FAILED_TIME = 5;
const MIN_ARRIVE_DISTANCE_TOLERANCE = 30;
class TsTaskMoveToTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveMode = 0;
    this.MoveState = 0;
    this.IsFollow = false;
    this.TargetEntityId = 0;
    this.TargetPos = new UE.Vector();
    this.IsFly = false;
    this.Distance = MIN_ARRIVE_DISTANCE_TOLERANCE;
    this.IsInitTsVariables = false;
    this.TsMoveMode = 0;
    this.TsMoveState = 0;
    this.TsIsFollow = false;
    this.TsIsFly = false;
    this.TsTargetEntityId = 0;
    this.TsTargetPos = undefined;
    this.TsDistance = 0;
    this.MoveComp = undefined;
    this.LastLocation = undefined;
    this.TargetLocation = undefined;
    this.TmpVector = undefined;
    this.LastTime = 0;
    this.MoveFailedCountDown = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMoveMode = 0;
    this.TsMoveState = 0;
    this.TsIsFollow = false;
    this.TsIsFly = false;
    this.TsTargetEntityId = 0;
    this.TsTargetPos = undefined;
    this.TsDistance = 0;
    this.MoveComp = undefined;
    this.LastLocation = undefined;
    this.TargetLocation = undefined;
    this.TmpVector = undefined;
    this.LastTime = 0;
    this.MoveFailedCountDown = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMoveMode = this.MoveMode;
      this.TsMoveState = this.MoveState;
      this.TsIsFollow = this.IsFollow;
      this.TsIsFly = this.IsFly;
      this.TsDistance = this.Distance;
      this.TsTargetEntityId = this.TargetEntityId;
      this.TsTargetPos = Vector_1.Vector.Create(this.TargetPos.X, this.TargetPos.Y, this.TargetPos.Z);
      this.LastLocation = Vector_1.Vector.Create();
      this.TargetLocation = Vector_1.Vector.Create();
      this.TmpVector = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s;
    var e = t.AiController;
    if (e) {
      s = (e = e.CharActorComp).Entity;
      this.MoveComp = s.GetComponent(48);
      if (this.GetMoveToTargetPosition(this.TargetLocation)) {
        if (this.TryFindPathToTarget(this.TargetLocation)) {
          this.LastTime = Time_1.Time.WorldTime;
          this.LastLocation?.Reset();
          this.LastLocation?.DeepCopy(e.ActorLocationProxy);
        } else {
          this.Finish(true);
        }
      } else {
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(true);
    }
  }
  ReceiveTickAI(t, i, s) {
    var t = t.AiController;
    if (!t || (t = t.CharActorComp, this.CheckMoveFailed(t, s))) {
      this.Finish(true);
    } else if (this.TsIsFollow) {
      if (this.GetMoveToTargetPosition(this.TmpVector)) {
        if (Vector_1.Vector.DistSquared(this.TmpVector, this.TargetLocation) > this.TsDistance * this.TsDistance) {
          if (this.TryFindPathToTarget(this.TmpVector)) {
            this.TargetLocation.DeepCopy(this.TmpVector);
          } else {
            this.Finish(true);
          }
        }
      } else {
        this.Finish(true);
      }
    }
  }
  OnClear() {
    if (this.MoveComp) {
      this.MoveComp.StopMoveNew();
      this.MoveComp = undefined;
    }
    this.LastTime = 0;
    this.MoveFailedCountDown = 0;
    this.LastLocation?.Reset();
    this.TargetLocation?.Reset();
  }
  CheckMoveFailed(t, i) {
    var s = Vector_1.Vector.Dist(t.ActorLocationProxy, this.LastLocation);
    if ((Time_1.Time.WorldTime - this.LastTime) * MathUtils_1.MathUtils.MillisecondToSecond * MIN_MOVE_SPEED >= s) {
      this.MoveFailedCountDown += i;
      if (this.MoveFailedCountDown >= MOVE_FAILED_TIME) {
        t.SetActorLocation(this.TargetLocation.ToUeVector(), "[TsTaskMoveToLocation]长时间处于某点", false);
        return true;
      }
    } else {
      this.MoveFailedCountDown = 0;
    }
    this.LastTime = Time_1.Time.WorldTime;
    this.LastLocation.DeepCopy(t.ActorLocationProxy);
    return false;
  }
  TryFindPathToTarget(t) {
    return !!this.MoveComp && this.MoveComp.MoveController.NavigateMoveToLocation({
      Position: t,
      MoveState: this.ConvertToCharMoveState(this.TsMoveState),
      IsFly: this.TsIsFly,
      Distance: this.TsDistance,
      UseNearestDirection: false,
      CallbackList: [() => {
        this.Finish(true);
      }],
      ResetCondition: () => false
    }, true, false);
  }
  ConvertToCharMoveState(t) {
    switch (t) {
      case 1:
        return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
      case 2:
        return CharacterUnifiedStateTypes_1.ECharMoveState.Run;
    }
    return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
  }
  GetMoveToTargetPosition(t) {
    switch (this.TsMoveMode) {
      case 1:
        t.DeepCopy(this.TsTargetPos);
        break;
      case 2:
        var i = Global_1.Global.BaseCharacter;
        if (!i?.IsValid()) {
          return false;
        }
        t.DeepCopy(i.CharacterActorComponent.ActorLocationProxy);
        break;
      case 3:
        i = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.TsTargetEntityId);
        if (!i?.Valid) {
          return false;
        }
        i = i.Entity.GetComponent(1);
        t.DeepCopy(i.ActorLocationProxy);
        break;
      default:
        return false;
    }
    return true;
  }
}
exports.default = TsTaskMoveToTarget;
//# sourceMappingURL=TsTaskMoveToTarget.js.map