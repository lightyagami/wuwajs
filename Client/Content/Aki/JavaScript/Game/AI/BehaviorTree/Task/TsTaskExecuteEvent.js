"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskExecuteEvent extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.EventGroupId = 0;
    this.IsInitTsVariables = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
    }
  }
  ReceiveExecuteAI(e, s) {
    this.InitTsVariables();
    if (e.AiController) {
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskExecuteEvent;
//# sourceMappingURL=TsTaskExecuteEvent.js.map