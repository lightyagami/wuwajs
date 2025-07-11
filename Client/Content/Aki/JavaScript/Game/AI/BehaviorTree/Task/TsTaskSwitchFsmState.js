"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSwitchFsmState extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.States = undefined;
  }
  Constructor() {
    super.Constructor();
  }
  ReceiveTickAI(e, s, t) {
    if (!e.AiController) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
    this.FinishExecute(true);
  }
}
exports.default = TsTaskSwitchFsmState;
//# sourceMappingURL=TsTaskSwitchFsmState.js.map