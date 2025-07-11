"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSetNowTime extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "";
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
    }
  }
  ReceiveTickAI(e, s, t) {
    var r;
    var o = e.AiController;
    if (o) {
      this.InitTsVariables();
      if (this.TsBlackboardKey) {
        o = o.CharActorComp.Entity.Id;
        r = Time_1.Time.WorldTime;
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(o, this.TsBlackboardKey, r);
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
exports.default = TsTaskSetNowTime;
//# sourceMappingURL=TsTaskSetNowTime.js.map