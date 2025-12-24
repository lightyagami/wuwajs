"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPatrol extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveState = 0;
    this.MoveOnePath = false;
    this.UseSimpleMove = false;
    this.UseActorForward = true;
    this.UseLastMoveIndex = false;
    this.OpenDebugNode = false;
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.StateComp = undefined;
    this.PatrolLogic = undefined;
    this.PatrolConfig = undefined;
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsMoveOnePath = false;
    this.TsUseLastMoveIndex = false;
    this.TsOpenDebugNode = false;
    this.HandleMoveEnd = undefined;
  }
  Constructor() {
    super.Constructor();
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.StateComp = undefined;
    this.PatrolLogic = undefined;
    this.PatrolConfig = undefined;
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsMoveOnePath = false;
    this.TsUseLastMoveIndex = false;
    this.TsOpenDebugNode = false;
    this.HandleMoveEnd = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMoveState = this.MoveState;
      this.TsMoveOnePath = this.MoveOnePath;
      this.TsUseLastMoveIndex = this.UseLastMoveIndex;
      this.TsOpenDebugNode = this.OpenDebugNode;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s;
    var e = t.AiController;
    if (e) {
      this.PatrolLogic = e.AiPatrol;
      this.PatrolConfig = this.PatrolLogic.GetConfig();
      if (this.PatrolConfig && (this.Entity = e.CharAiDesignComp.Entity, this.MoveComp = this.Entity.GetComponent(46), this.StateComp = this.Entity.GetComponent(109), this.ActorComp = e.CharActorComp, this.PatrolConfig.ContainZ && e.CharActorComp?.Actor.KuroSetMovementMode({
        Mode: 5,
        Context: "[TsTaskPatrol.ReceiveExecuteAI]"
      }), this.HandleMoveEnd ||= t => {
        this.ExecuteMoveEnd(t);
      }, this.InitPatrolInfo(), this.PatrolLogic?.PatrolPoint)) {
        (s = Protocol_1.Aki.Protocol.Kes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(e.CharActorComp.CreatureData.GetCreatureDataId());
        s.V4n = !this.PatrolLogic.StartWithInversePath;
        Net_1.Net.Call(22211, s, () => {});
        this.MoveToPatrolPoint();
        if (e.AiPatrol.StartWithInversePath !== undefined) {
          e.AiPatrol.StartWithInversePath = undefined;
        }
      } else {
        this.Finish(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  CallOutside() {
    var t;
    if (GlobalData_1.GlobalData.BpEventManager && (t = this.PatrolLogic?.PatrolPoint) && t.IsMain) {
      GlobalData_1.GlobalData.BpEventManager.AI巡逻达到样条点.Broadcast(this.ActorComp.Actor, this.PatrolLogic.PatrolIndex);
    }
  }
  InitPatrolInfo() {
    this.PatrolLogic.GeneratePatrol(true);
    this.PatrolLogic.StartPatrol(this.TsUseLastMoveIndex, () => {
      this.CallOutside();
    });
    this.PatrolLogic.ResetBaseInfoByMainPoint(this.MoveComp, this.StateComp, this.TsMoveState);
  }
  MoveToPatrolPoint() {
    const s = this.PatrolLogic?.PatrolPoint;
    if (s) {
      var e = [];
      let i = 0;
      for (let t = 0; t < this.PatrolLogic.AllPatrolPoints.length; t++) {
        var h = this.PatrolLogic.AllPatrolPoints[t];
        var o = {
          Index: h.IsMain ? i : -1,
          Position: h.Point,
          MoveState: h.MoveState,
          MoveSpeed: h.MoveSpeed,
          Actions: h.Actions,
          Callback: () => {
            this.PatrolLogic.SetPatrolIndex(t);
            if (s.IsMain) {
              this.CallOutside();
            }
          }
        };
        if (h.IsMain) {
          i++;
        }
        o.Actions ||= [];
        e.push(o);
      }
      var t = {
        Points: e,
        Navigation: this.PatrolConfig.IsNavigation,
        IsFly: this.PatrolConfig.ContainZ,
        DebugMode: this.TsOpenDebugNode,
        Loop: this.PatrolConfig.Loop,
        CircleMove: this.PatrolConfig.CirclePatrol,
        StartWithInversePath: this.PatrolLogic.StartWithInversePath,
        Distance: this.PatrolConfig.EndDistance,
        TurnSpeed: this.PatrolConfig.TurnSpeed,
        Callback: t => {
          if (t === 1) {
            this.PatrolFinish();
          }
          this.Finish(true);
        },
        UsePreviousIndex: this.UseLastMoveIndex,
        UseNearestPoint: this.UseLastMoveIndex,
        ReturnFalseWhenNavigationFailed: false
      };
      this.MoveComp.MoveAlongPath(t);
    }
  }
  ExecuteMoveEnd(t) {
    if (t === 1) {
      if (this.PatrolLogic?.PatrolPoint) {
        t = this.PatrolLogic.PatrolPoint;
        if (this.CheckMoveEnd(t)) {
          this.PatrolFinish();
          this.Finish(true);
        } else if (t !== this.PatrolLogic.PatrolPoint) {
          if (t = this.PatrolLogic.PatrolPoint) {
            if (t.IsMain) {
              this.CallOutside();
              this.PatrolLogic.ResetBaseInfoByMainPoint(this.MoveComp, this.StateComp, this.TsMoveState);
            }
            this.MoveToPatrolPoint();
          } else {
            this.Finish(true);
          }
        }
      }
    } else {
      this.Finish(false);
    }
  }
  ReceiveTickAI(t, i, s) {}
  CheckMoveEnd(t) {
    let i = this.PatrolLogic.CheckPatrolEnd();
    if (t.IsMain && (this.TsMoveOnePath && !t.IsIgnorePoint && (i = true), t.Actions)) {
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t.Actions, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id));
    }
    return i;
  }
  PatrolFinish() {
    this.CallOutside();
    this.PatrolLogic?.PatrolFinish();
  }
  OnAbort() {
    this.PatrolFinish();
    this.MoveComp?.StopMove(true);
  }
  OnClear() {
    var t;
    if (this.AIOwner instanceof TsAiController_1.default) {
      if (EntitySystem_1.EntitySystem.Get(this.Entity.Id)) {
        (t = Protocol_1.Aki.Protocol.Xes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.ActorComp.CreatureData.GetCreatureDataId());
        Net_1.Net.Call(21531, t, () => {});
      }
      if (this.MoveComp) {
        if (this.TsMoveOnePath) {
          this.MoveComp.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
        }
        this.MoveComp.IsSpecialMove = false;
      }
      this.Entity = undefined;
      this.ActorComp = undefined;
      this.MoveComp = undefined;
      this.StateComp = undefined;
      this.PatrolLogic = undefined;
      this.PatrolConfig = undefined;
    }
  }
}
exports.default = TsTaskPatrol;
//# sourceMappingURL=TsTaskPatrol.js.map