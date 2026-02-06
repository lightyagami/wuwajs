"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const GlobalData_1 = require("../../../../../GlobalData");
const BehaviorTreeDefines_1 = require("../../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskPatrolWithEvents extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.UseLastMoveIndex = false;
    this.StartWithNearestPoint = false;
    this.SplineId = 0;
    this.PatrolComp = undefined;
    this.IsInitTsVariables = false;
    this.TsStartWithNearestPoint = false;
    this.TsSplineId = 0;
  }
  Constructor() {
    super.Constructor();
    this.PatrolComp = undefined;
    this.IsInitTsVariables = false;
    this.TsStartWithNearestPoint = false;
    this.TsSplineId = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsStartWithNearestPoint = this.StartWithNearestPoint;
      this.TsSplineId = this.SplineId;
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var r = e.AiController;
    if (r) {
      const s = r.CharAiDesignComp.Entity;
      this.PatrolComp = s.GetComponent(51);
      const i = this.TsSplineId;
      const o = s.GetComponent(51);
      if (o) {
        if (o.HasPatrolRecord(this.TsSplineId)) {
          o.ResumePatrol(this.TsSplineId, "PatrolWithEvents");
        } else {
          r = {
            DebugMode: false,
            UseNearestPoint: this.TsStartWithNearestPoint,
            ReturnFalseWhenNavigationFailed: false,
            OnTriggerActionsHandle: () => {
              var e = o.GetLastPointRawIndex();
              var e = BehaviorTreeDefines_1.BehaviorTreeDefines.GetPatrolActionStateName(i, e);
              ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(s.Id, BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreePatrolStateName, e);
            },
            OnPatrolEndHandle: e => {
              ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(s.Id, BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreePatrolStateName, BehaviorTreeDefines_1.BehaviorTreeDefines.PatrolFinishName);
              this.Finish(e === 1);
            }
          };
          o.StartPatrol(this.TsSplineId, r);
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  OnAbort() {
    this.PatrolComp.PausePatrol(this.TsSplineId, "PatrolWithEvents");
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      this.PatrolComp = undefined;
    }
  }
}
exports.default = TsTaskPatrolWithEvents;
//# sourceMappingURL=TsTaskPatrolWithEvents.js.map