"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskLog = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskLog extends LevelAiTask_1.LevelAiTask {
  ExecuteTask() {
    var e = this.Params;
    if (e) {
      switch (e.Level) {
        case "Warn":
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelAi", 29, e.Content);
          }
          break;
        case "Info":
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelAi", 29, e.Content);
          }
          break;
        case "Error":
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelAi", 29, e.Content);
          }
      }
    }
    return 0;
  }
}
exports.LevelAiTaskLog = LevelAiTaskLog;
//# sourceMappingURL=LevelAiTaskLog.js.map