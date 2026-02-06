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
    this.LZf = [0, 0, 0];
    this.wZf = [0, 0, 0];
    this.Ist = [0, 0, 0];
    this.wlh = "";
    this.lRe = undefined;
    this.PZf = false;
    this.Duration = DURATION;
    this.IsLerpInLinearSpace = false;
  }
  Init(t, i) {
    this.wlh = t;
    this.AZf(t, this.LZf);
    this.AZf(t, this.wZf);
    if (i) {
      this.Duration = i;
      this.Ist[0] = this.Ist[1] = this.Ist[2] = 0;
    }
    this.PZf = true;
    this.lRe = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(t));
  }
  AZf(i, s) {
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
      this.AZf(t, this.wZf);
      for (let t = 0; t < COLOR_NUM; t++) {
        this.Ist[t] = (this.wZf[t] - this.LZf[t]) / this.Duration;
      }
      this.PZf = false;
    }
  }
  Update(i) {
    if (this.PZf) {
      return false;
    }
    let s = 0;
    for (let t = 0; t < COLOR_NUM; t++) {
      var h = this.Ist[t];
      if (h === 0) {
        s += 1;
      } else {
        this.LZf[t] += h * i;
        if (h > 0) {
          if (this.LZf[t] >= this.wZf[t]) {
            this.LZf[t] = this.wZf[t];
            this.Ist[t] = 0;
            s += 1;
          }
        } else if (this.LZf[t] <= this.wZf[t]) {
          this.LZf[t] = this.wZf[t];
          this.Ist[t] = 0;
          s += 1;
        }
      }
    }
    if (this.IsLerpInLinearSpace) {
      this.lRe.R = linearToSRGB(this.LZf[0]);
      this.lRe.G = linearToSRGB(this.LZf[1]);
      this.lRe.B = linearToSRGB(this.LZf[2]);
    } else {
      this.lRe.R = this.LZf[0] / 255;
      this.lRe.G = this.LZf[1] / 255;
      this.lRe.B = this.LZf[2] / 255;
    }
    if (s === COLOR_NUM) {
      this.PZf = true;
    }
    return true;
  }
  GetColor() {
    return this.lRe;
  }
}
exports.MotorcycleSpeedColorMachine = MotorcycleSpeedColorMachine;
//# sourceMappingURL=MotorcycleSpeedColorMachine.js.map