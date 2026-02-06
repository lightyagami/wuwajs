"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiMiSiHudUnitRotateMachine = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class AiMiSiHudUnitRotateMachine {
  constructor() {
    this.YawSpeedMin = 0.02;
    this.Speed = 0.002;
    this.Countdown = 500;
    this.ljg = 0;
    this.gU = false;
    this._jg = 0;
    this.ujg = 0;
    this.cjg = 0;
    this.CurValue = 0;
  }
  Update(t, i) {
    if (!this.gU) {
      this.ljg = i;
      return !(this.gU = true);
    }
    let s = i - this.ljg;
    if (s < -180) {
      s += 360;
    } else if (s > 180) {
      s -= 360;
    }
    this.ljg = i;
    i = s / t;
    if (i > this.YawSpeedMin) {
      this.djg(1);
    } else if (i < -this.YawSpeedMin) {
      this.djg(-1);
    } else {
      this.djg(0);
    }
    i = this.CurValue;
    this.iSo(t);
    return i !== this.CurValue;
  }
  djg(t) {
    this._jg = t;
  }
  iSo(t) {
    if (this.cjg > 0) {
      this.cjg -= t;
      if (this.cjg <= 0) {
        this.cjg = 0;
      }
    } else if (this._jg !== this.ujg) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 17, "[AiMiSiHud]UI移动", ["dir", this._jg]);
      }
      this.ujg = this._jg;
      this.cjg = this.Countdown;
    }
    if (this.CurValue !== this.ujg) {
      if (this.CurValue < this.ujg) {
        this.CurValue += this.Speed * t;
        if (this.CurValue > this.ujg) {
          this.CurValue = this.ujg;
        }
      } else {
        this.CurValue -= this.Speed * t;
        if (this.CurValue < this.ujg) {
          this.CurValue = this.ujg;
        }
      }
    }
  }
}
exports.AiMiSiHudUnitRotateMachine = AiMiSiHudUnitRotateMachine;
//# sourceMappingURL=AiMiSiHudUnitRotateMachine.js.map