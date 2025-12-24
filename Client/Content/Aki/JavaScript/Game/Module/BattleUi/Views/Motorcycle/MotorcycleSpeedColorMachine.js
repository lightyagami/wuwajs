"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSpeedColorMachine = undefined;
const UE = require("ue");
const COLOR_NUM = 3;
const DURATION = 350;
function sRGBToLinear(t) {
  if (t <= 0.04045) {
    return t / 12.92;
  } else {
    return Math.pow((t + 0.055) / 1.055, 2.4);
  }
}
function linearToSRGB(t) {
  if (t <= 0.0031308) {
    return t * 12.92;
  } else {
    return Math.pow(t, 1 / 2.4) * 1.055 - 0.055;
  }
}
class MotorcycleSpeedColorMachine {
  constructor() {
    this.R9f = [0, 0, 0];
    this.L9f = [0, 0, 0];
    this.Ist = [0, 0, 0];
    this.wlh = "";
    this.lRe = undefined;
    this.w9f = false;
    this.Duration = DURATION;
    this.IsLerpInLinearSpace = false;
  }
  Init(t, i) {
    this.wlh = t;
    this.P9f(t, this.R9f);
    this.P9f(t, this.L9f);
    if (i) {
      this.Duration = i;
      this.Ist[0] = this.Ist[1] = this.Ist[2] = 0;
    }
    this.w9f = true;
    this.lRe = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(t));
  }
  P9f(i, s) {
    for (let t = 0; t < COLOR_NUM; t++) {
      s[t] = parseInt(i.substring(t * 2, (t + 1) * 2), 16);
      if (this.IsLerpInLinearSpace) {
        s[t] = sRGBToLinear(s[t] / 255);
      }
    }
  }
  SetTargetColor(t) {
    if (t !== this.wlh) {
      this.wlh = t;
      this.P9f(t, this.L9f);
      for (let t = 0; t < COLOR_NUM; t++) {
        this.Ist[t] = (this.L9f[t] - this.R9f[t]) / this.Duration;
      }
      this.w9f = false;
    }
  }
  Update(i) {
    if (this.w9f) {
      return false;
    }
    let s = 0;
    for (let t = 0; t < COLOR_NUM; t++) {
      var h = this.Ist[t];
      if (h === 0) {
        s += 1;
      } else {
        this.R9f[t] += h * i;
        if (h > 0) {
          if (this.R9f[t] >= this.L9f[t]) {
            this.R9f[t] = this.L9f[t];
            this.Ist[t] = 0;
            s += 1;
          }
        } else if (this.R9f[t] <= this.L9f[t]) {
          this.R9f[t] = this.L9f[t];
          this.Ist[t] = 0;
          s += 1;
        }
      }
    }
    if (this.IsLerpInLinearSpace) {
      this.lRe.R = linearToSRGB(this.R9f[0]);
      this.lRe.G = linearToSRGB(this.R9f[1]);
      this.lRe.B = linearToSRGB(this.R9f[2]);
    } else {
      this.lRe.R = this.R9f[0] / 255;
      this.lRe.G = this.R9f[1] / 255;
      this.lRe.B = this.R9f[2] / 255;
    }
    if (s === COLOR_NUM) {
      this.w9f = true;
    }
    return true;
  }
  GetColor() {
    return this.lRe;
  }
}
exports.MotorcycleSpeedColorMachine = MotorcycleSpeedColorMachine;
//# sourceMappingURL=MotorcycleSpeedColorMachine.js.map