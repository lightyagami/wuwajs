"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscLog = undefined;
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Macro_1 = require("../../Core/Preprocessor/Macro");
class KscLog {
  static A5(o, e, r, t, s, a) {
    var c = `[KSC][${r}][Object:${t?.GetName()}] ${s}`;
    switch (o) {
      case 1:
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CombatInfo", e, c, ...a);
        }
        break;
      case 0:
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CombatInfo", e, c, ...a);
        }
        break;
      case 2:
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("CombatInfo", e, c, ...a);
        }
        break;
      case 3:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CombatInfo", e, c, ...a);
        }
    }
  }
  static Info(o, e, r, t, ...s) {
    this.A5(1, e, o, r, t, s);
  }
  static Warn(o, e, r, t, ...s) {
    this.A5(2, e, o, r, t, s);
  }
  static Error(o, e, r, t, ...s) {
    this.A5(3, e, o, r, t, s);
  }
}
(exports.KscLog = KscLog).DebugCombatInfo = new Set();
//# sourceMappingURL=KscLog.js.map