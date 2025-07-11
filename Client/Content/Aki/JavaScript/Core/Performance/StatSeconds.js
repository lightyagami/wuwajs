"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatSecondsAccumulator = undefined;
const UE = require("ue");
const Log_1 = require("../Common/Log");
const CycleCounter_1 = require("./CycleCounter");
class StatSecondsAccumulator {
  constructor(t) {
    this.JWa = "";
    this.JWa = t;
  }
  static Create(t, e = "", o = "") {
    if (!CycleCounter_1.CycleCounter.IsEnabled) {
      return StatSecondsAccumulator.ZWa;
    }
    let r = t;
    if (r.length > CycleCounter_1.STAT_MAX_NAME_LENGTH) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Stat", 30, "名字过长", ["name", t]);
      }
      r = t.substring(0, CycleCounter_1.STAT_MAX_NAME_LENGTH);
    }
    UE.KuroJsStatsLibrary.CreateSimpleSeconds(r, e, o, true);
    return new StatSecondsAccumulator(r);
  }
  Start() {
    if (CycleCounter_1.CycleCounter.IsEnabled) {
      UE.KuroJsStatsLibrary.StartSimpleSeconds(this.JWa);
    }
  }
  Stop() {
    if (CycleCounter_1.CycleCounter.IsEnabled) {
      UE.KuroJsStatsLibrary.StopSimpleSeconds(this.JWa);
    }
  }
}
(exports.StatSecondsAccumulator = StatSecondsAccumulator).ZWa = new StatSecondsAccumulator("");
//# sourceMappingURL=StatSeconds.js.map