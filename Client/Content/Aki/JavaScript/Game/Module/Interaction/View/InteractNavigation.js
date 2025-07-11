"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractNavigation = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const InputEnums_1 = require("../../../Input/InputEnums");
class InteractNavigation {
  constructor(t, s, h) {
    this.F_i = 0;
    this.V_i = 0;
    this.H_i = 0;
    if ((t < (this.j_i = 0) || s < 0) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Interaction", 8, "设置lookUp阈值和zoomThreshold阈值错误!", ["lookUpThreshold", t], ["zoomThreshold", s]);
    }
    this.W_i = t;
    this.K_i = s;
    this.Q_i = h;
  }
  get Index() {
    return this.V_i;
  }
  set Index(t) {
    this.V_i = t;
  }
  get TotalNum() {
    return this.F_i;
  }
  UpdateValue(t, s, h = undefined) {
    var i;
    var e = this.V_i;
    if (this.V_i !== undefined) {
      if (t === InputEnums_1.EInputAxis.LookUp) {
        if (this.H_i * s < 0) {
          this.H_i = 0;
        }
        this.H_i += s;
        if (Math.abs(this.H_i) >= this.W_i) {
          i = (s > 0 ? 1 : -1) * Math.floor(Math.abs(this.H_i / this.W_i));
          this.H_i -= this.W_i * i;
          this.V_i += i;
        }
      } else if (t === InputEnums_1.EInputAxis.Zoom && (this.j_i * (i = -s) < 0 && (this.j_i = 0), this.j_i += i, Math.abs(this.j_i) >= this.K_i)) {
        t = (i > 0 ? 1 : -1) * Math.floor(Math.abs(this.j_i / this.K_i));
        this.j_i -= this.K_i * t;
        this.V_i += t;
      }
    } else {
      this.V_i = 0;
    }
    this.X_i(h);
    return this.V_i !== e;
  }
  UpdateIndex(t) {
    var s = this.V_i;
    this.X_i(t);
    return this.V_i !== s;
  }
  X_i(t) {
    if (t) {
      this.F_i = t;
    }
    if (this.F_i && (this.V_i < 0 || this.V_i >= this.F_i)) {
      if (this.Q_i) {
        this.V_i = this.V_i % this.F_i;
        if (this.V_i < 0) {
          this.V_i = this.F_i + this.V_i;
        }
      } else {
        this.V_i = Math.max(0, Math.min(this.V_i, this.F_i - 1));
      }
    }
  }
}
exports.InteractNavigation = InteractNavigation;
//# sourceMappingURL=InteractNavigation.js.map