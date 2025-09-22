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
    this.BVd = undefined;
    this.O4d = undefined;
    this.q4d = undefined;
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
        i = this.BVd ? this.BVd.GetFloatValue(t) : this.G4d(t);
        this.qte = this.FHt + (this.zwr - this.FHt) * i;
        this.F4d();
        if (t >= 1) {
          this.xHe();
          this.EYa = false;
          this.qte = this.zwr;
          this.F4d();
        }
      }
    };
  }
  async InitCurve(i = "UiCurve_ScrollingTime") {
    this.BVd = await this.SAo(i);
  }
  Init(i, t, s, e = 1000) {
    this.xHe();
    this.q4d = s;
    this.FHt = i;
    this.zwr = t;
    this.r1t = e;
    this.qte = i;
    this.F4d();
  }
  StartScrolling() {
    this.EYa = true;
    this.H6 = 0;
    this.FHt = this.qte;
    this.xHe();
    this.O4d = TimerSystem_1.GameplayTimerSystem.Forever(this.Cl, TimerSystem_1.MIN_TIME);
  }
  Clear() {
    this.BVd = undefined;
    this.q4d = undefined;
    this.xHe();
  }
  async SAo(i) {
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    return new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat).Promise;
  }
  xHe() {
    if (this.O4d && TimerSystem_1.GameplayTimerSystem.Has(this.O4d)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.O4d);
    }
    this.O4d = undefined;
  }
  F4d() {
    this.q4d?.(this.qte);
  }
  G4d(i) {
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