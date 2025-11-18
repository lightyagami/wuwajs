"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollingNumberTool = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const LoadAsyncPromise_1 = require("../UiComponent/LoadAsyncPromise");
class ScrollingNumberTool {
  constructor() {
    this.YWd = undefined;
    this.eHd = undefined;
    this.tHd = undefined;
    this.FHt = 0;
    this.zwr = 0;
    this.qte = 0;
    this.r1t = 0;
    this.H6 = 0;
    this.EYa = false;
    this.Cl = t => {
      if (this.EYa) {
        this.H6 += t;
        t = Math.min(this.H6 / this.r1t, 1);
        let i = t;
        i = this.YWd ? this.YWd.GetFloatValue(t) : this.iHd(t);
        this.qte = this.FHt + (this.zwr - this.FHt) * i;
        this.rHd();
        if (t >= 1) {
          this.xHe();
          this.EYa = false;
          this.qte = this.zwr;
          this.rHd();
        }
      }
    };
  }
  async InitCurve(i = "UiCurve_ScrollingTime") {
    this.YWd = await this.SAo(i);
  }
  Init(i, t, s, e = 1000) {
    this.xHe();
    this.tHd = s;
    this.FHt = i;
    this.zwr = t;
    this.r1t = e;
    this.qte = i;
    this.rHd();
  }
  StartScrolling() {
    this.EYa = true;
    this.H6 = 0;
    this.FHt = this.qte;
    this.xHe();
    this.eHd = TimerSystem_1.GameplayTimerSystem.Forever(this.Cl, TimerSystem_1.MIN_TIME);
  }
  Clear() {
    this.YWd = undefined;
    this.tHd = undefined;
    this.xHe();
  }
  async SAo(i) {
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    return new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat).Promise;
  }
  xHe() {
    if (this.eHd && TimerSystem_1.GameplayTimerSystem.Has(this.eHd)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.eHd);
    }
    this.eHd = undefined;
  }
  rHd() {
    this.tHd?.(this.qte);
  }
  iHd(i) {
    return i * (2 - i);
  }
  SetTargetNumber(i, t) {
    this.zwr = i;
    if (t !== undefined) {
      this.r1t = t;
    }
    this.StartScrolling();
  }
  GetCurrentValue() {
    return this.qte;
  }
}
exports.ScrollingNumberTool = ScrollingNumberTool;
//# sourceMappingURL=ScrollingNumberTool.js.map