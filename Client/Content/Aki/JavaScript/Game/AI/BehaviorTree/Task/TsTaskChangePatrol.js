"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangePatrol extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.PatrolIndex = 0;
    this.PatrolIdBlackboardKey = "";
    this.IsInitTsVariables = false;
    this.TsPatrolIndex = 0;
    this.TsPatrolIdBlackboardKey = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsPatrolIndex = 0;
    this.TsPatrolIdBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsPatrolIndex = this.PatrolIndex;
      this.TsPatrolIdBlackboardKey = this.PatrolIdBlackboardKey;
    }
  }
  ReceiveExecuteAI(e, s) {
    this.InitTsVariables();
    var t;
    var r = e.AiController;
    if (r) {
      t = r.CharActorComp.Entity.Id;
      r = r.AiPatrol;
      if (this.TsPatrolIdBlackboardKey) {
        t = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(t, this.TsPatrolIdBlackboardKey);
        r.ResetPatrolById(t);
      } else {
        r.ResetPatrol(this.TsPatrolIndex);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskChangePatrol;
//# sourceMappingURL=TsTaskChangePatrol.js.map