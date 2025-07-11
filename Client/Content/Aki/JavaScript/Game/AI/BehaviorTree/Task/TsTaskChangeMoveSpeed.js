"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeMoveSpeed extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveSpeed = 0;
    this.ResetDefault = false;
    this.IsInitTsVariables = false;
    this.TsMoveSpeed = 0;
    this.TsResetDefault = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMoveSpeed = 0;
    this.TsResetDefault = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMoveSpeed = this.MoveSpeed;
      this.TsResetDefault = this.ResetDefault;
    }
  }
  ReceiveExecuteAI(s, t) {
    this.InitTsVariables();
    var e;
    var i = s.AiController;
    if (i) {
      if ((i = i.CharActorComp) && (i = ActorUtils_1.ActorUtils.GetEntityByActor(i.Actor)) && (e = i.Entity.GetComponent(45))) {
        if (this.TsResetDefault) {
          i = i.Entity.GetComponent(175).MoveState;
          e.ResetMaxSpeed(i);
        } else {
          e.SetMaxSpeed(this.TsMoveSpeed);
          e.SetSpeedLock();
        }
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", s.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskChangeMoveSpeed;
//# sourceMappingURL=TsTaskChangeMoveSpeed.js.map