"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTaskPatrol = undefined;
const GlobalData_1 = require("../../../GlobalData");
const TsAiController_1 = require("../../Controller/TsAiController");
const AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskPatrol extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments);
    this.JLn = undefined;
    this.$ie = undefined;
    this.Jh = undefined;
    this.Gce = undefined;
    this.mBe = undefined;
    this.zLn = undefined;
    this.Hte = undefined;
    this.Bte = undefined;
    this.MoveState = 0;
    this.OpenDebugMode = false;
  }
  OnInit(t) {
    this.MoveState = t.TaskPatrol.MoveState;
    this.OpenDebugMode = t.TaskPatrol.OpenDebugMode;
    return true;
  }
  OnEnter(t) {
    var i = this.Node.AiComponent.TsAiController;
    if (i instanceof TsAiController_1.default && (this.Bte = i.AiController, this.JLn = this.Bte.AiPatrol, this.$ie = this.JLn.GetConfig(), this.$ie) && (this.Jh = this.Bte.CharAiDesignComp.Entity, this.Gce = this.Jh.GetComponent(48), this.mBe = this.Jh.GetComponent(111), this.zLn = this.Jh.GetComponent(51), this.Hte = this.Bte.CharActorComp, this.zLn)) {
      this.ZLn();
    } else {
      this.$ne();
    }
  }
  OnExit(t) {
    if (!this.Node.TaskFinished) {
      if (this.zLn && this.$ie) {
        this.zLn.PausePatrol(this.$ie.SplineEntityId, "AiStateMachineTaskPatrol");
      }
      this.eDn();
      this.$ne();
    }
    if (this.Gce) {
      this.Gce.StopMoveNew();
      this.Gce.IsSpecialMove = false;
    }
  }
  $ne() {
    this.Node.TaskFinished = true;
  }
  tDn() {
    this.JLn.GeneratePatrol(true);
    this.JLn.StartPatrol(true, () => {
      this.iDn();
    });
    this.JLn.ResetBaseInfoByMainPoint(this.Gce, this.mBe, this.MoveState);
  }
  iDn() {
    var t;
    if (GlobalData_1.GlobalData.BpEventManager && (t = this.JLn?.PatrolPoint) && t.IsMain) {
      GlobalData_1.GlobalData.BpEventManager.AI巡逻达到样条点.Broadcast(this.Hte.Actor, this.JLn.PatrolIndex);
    }
  }
  oDn() {
    const i = this.JLn?.PatrolPoint;
    var t;
    if (i) {
      if (this.zLn.HasPatrolRecord()) {
        this.zLn.ResumePatrol(this.$ie.SplineEntityId, "AiStateMachineTaskPatrol");
      } else {
        t = {
          DebugMode: this.OpenDebugMode,
          UseNearestPoint: true,
          ReturnFalseWhenNavigationFailed: false,
          OnArrivePointHandle: () => {
            var t = this.zLn.GetLastPointRawIndex();
            if (t !== -1) {
              this.JLn.SetPatrolIndex(t);
            }
            if (i.IsMain) {
              this.iDn();
            }
          },
          OnPatrolEndHandle: t => {
            if (t === 1) {
              this.eDn();
            }
            this.$ne();
          }
        };
        this.zLn.StartPatrol(this.$ie.SplineEntityId, t);
      }
    }
  }
  eDn() {
    this.iDn();
    this.JLn?.PatrolFinish();
  }
  ZLn() {
    if (this.$ie.ContainZ && this.Gce) {
      this.Hte?.Actor.KuroSetMovementMode({
        Mode: 5,
        Context: "[AiStateMachineTaskPatrol.BeginPatrol]"
      });
    }
    this.tDn();
    if (this.JLn?.PatrolPoint) {
      this.oDn();
      if (this.Bte.AiPatrol.StartWithInversePath !== undefined) {
        this.Bte.AiPatrol.StartWithInversePath = undefined;
      }
    } else {
      this.$ne();
    }
  }
}
exports.AiStateMachineTaskPatrol = AiStateMachineTaskPatrol;
//# sourceMappingURL=AiStateMachineTaskPatrol.js.map