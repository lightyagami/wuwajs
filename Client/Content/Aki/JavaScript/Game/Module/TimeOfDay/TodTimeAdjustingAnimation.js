"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodTimeAdjustingAnimation = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimeOfDayDefine_1 = require("./TimeOfDayDefine");
const MINIMAL_SPEED = 10000;
class TodTimeAdjustingAnimation {
  constructor(i, t, s, h) {
    this.hLo = 0;
    this.RJ = 0;
    this.lLo = 0;
    this._Lo = 0;
    this.uLo = 0;
    this.cLo = -1;
    this.mLo = -1;
    this.dLo = 0;
    this.CLo = 0;
    this.gLo = 0;
    this.hLo = i;
    this.RJ = t;
    this.fLo = s;
    this.pLo = h;
  }
  get IsPlaying() {
    return this.cLo >= 0;
  }
  get IsFinished() {
    return !!this.IsPlaying && this.cLo >= this.mLo;
  }
  $ne() {
    this.Stop();
    this.pLo();
  }
  Play(i, t) {
    this.Stop();
    this.cLo = i;
    this.mLo = t;
    i = this.hLo / this.RJ;
    this.dLo = Math.abs(this.vLo() - this.RJ * 0.5 * i * i);
  }
  vLo() {
    return this.mLo - this.cLo;
  }
  Tick(i) {
    if (this.IsPlaying) {
      if (this.IsFinished) {
        this.$ne();
      } else {
        i = i / TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND;
        this._Lo = this._Lo + i;
        if (this.uLo >= this.dLo) {
          this.CLo += i;
          this.lLo = this.gLo - this.CLo * this.RJ;
          if (this.lLo <= MINIMAL_SPEED) {
            this.lLo = MINIMAL_SPEED;
          }
        } else {
          this.lLo = this._Lo * this.RJ;
          if (this.lLo >= this.hLo) {
            this.lLo = this.hLo;
            this.gLo = this.hLo;
          }
          this.gLo = this.lLo;
        }
        i = i * this.lLo;
        this.uLo += i;
        this.cLo += i;
        if (this.IsFinished) {
          this.cLo = this.mLo;
        }
        this.fLo(this.cLo);
      }
    }
  }
  Stop() {
    this.lLo = 0;
    this._Lo = 0;
    this.cLo = -1;
    this.mLo = -1;
    this.CLo = 0;
    this.uLo = 0;
    this.dLo = 0;
    this.gLo = 0;
  }
  DebugPrint() {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TimeOfDay", 16, "TodTimeAdjustingAnimation", ["this.MaxV", this.hLo], ["this.A", this.RJ], ["this.StartSecond", this.cLo], ["this.ToSecond", this.mLo]);
    }
  }
}
exports.TodTimeAdjustingAnimation = TodTimeAdjustingAnimation;
//# sourceMappingURL=TodTimeAdjustingAnimation.js.map