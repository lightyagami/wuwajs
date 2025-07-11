"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventLog = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventLog extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    var r = e;
    if (r) {
      switch (r.Level) {
        case "Warn":
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelEvent", 7, r.Content);
          }
          break;
        case "Info":
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 7, r.Content);
          }
          break;
        case "Error":
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, r.Content);
          }
      }
    }
  }
}
exports.LevelEventLog = LevelEventLog;
//# sourceMappingURL=LevelEventLog.js.map