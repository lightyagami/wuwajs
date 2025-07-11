"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiTickConditionModule = undefined;
const Log_1 = require("../../Core/Common/Log");
const TickSystem_1 = require("../../Core/Tick/TickSystem");
class UiTickConditionModule {
  constructor(i) {
    this.HDe = undefined;
    this.gzo = undefined;
    this.yzt = undefined;
    this.sgr = 0;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.r6 = i => {
      if (this.yzt?.(i)) {
        this.HDe?.(this.sgr);
        this.gzo?.(this.sgr);
        this.agr();
      } else {
        this.sgr += i;
      }
    };
    this.lZo = i;
  }
  StartTick(i, t, s) {
    this.yzt = i;
    this.gzo = t;
    this.HDe = s;
    this.sKe = TickSystem_1.TickSystem.Add(this.r6, "UiTickConditionModule", 0, true).Id;
  }
  ManualStopTick() {
    if (this.gzo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTickConditionModule", 10, "手动停止Tick,执行停止回调", ["标识", this.lZo]);
      }
      this.gzo?.(this.sgr);
      this.agr();
    }
  }
  agr() {
    this.S0t();
    this.sgr = 0;
    this.yzt = undefined;
    this.gzo = undefined;
    this.HDe = undefined;
  }
  S0t() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
    }
  }
}
exports.UiTickConditionModule = UiTickConditionModule;
//# sourceMappingURL=UiTickConditionModule.js.map