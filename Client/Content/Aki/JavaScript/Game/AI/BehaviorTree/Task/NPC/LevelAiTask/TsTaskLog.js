"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskLog extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Level = "";
    this.Content = "";
  }
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, s) {
    if (this.Level && this.Content) {
      switch (this.Level) {
        case "Warn":
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("BehaviorTree", 50, this.Content);
          }
          break;
        case "Info":
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("BehaviorTree", 50, this.Content);
          }
          break;
        case "Error":
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 50, this.Content);
          }
          break;
        default:
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("BehaviorTree", 50, this.Content);
          }
      }
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskLog;
//# sourceMappingURL=TsTaskLog.js.map