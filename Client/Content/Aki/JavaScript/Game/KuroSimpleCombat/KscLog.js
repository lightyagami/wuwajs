"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscLog = undefined;
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const GlobalData_1 = require("../GlobalData");
class KscLog {
  static A5(o, e, r, a, t, s) {
    var c = `[KSC][${r}][Object:${a?.GetName()}] ${t}`;
    switch (o) {
      case 1:
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CombatInfo", e, c, ...s);
        }
        break;
      case 0:
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CombatInfo", e, c, ...s);
        }
        break;
      case 2:
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("CombatInfo", e, c, ...s);
        }
        break;
      case 3:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CombatInfo", e, c, ...s);
        }
    }
  }
  static Info(o, e, r, a, ...t) {
    this.A5(1, e, o, r, a, t);
  }
  static Warn(o, e, r, a, ...t) {
    this.A5(2, e, o, r, a, t);
  }
  static Error(o, e, r, a, ...t) {
    this.A5(3, e, o, r, a, t);
  }
}
(exports.KscLog = KscLog).DebugCombatInfo = new Set();
//# sourceMappingURL=KscLog.js.map