"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThreeSectionTimeline = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const RenderModuleController_1 = require("../Manager/RenderModuleController");
class ThreeSectionTimeline {
  constructor() {
    this.il = -0;
    this.kC = -0;
    this.wXt = -0;
    this.r_r = false;
    this.n_r = false;
    this.s_r = -0;
    this.a_r = false;
    this.h_r = -0;
    this.l_r = false;
    this.__r = true;
    this.blr = false;
    this.u_r = undefined;
    this.c_r = -0;
  }
  Setup(t, i, s, h = true, e = false) {
    this.il = t;
    this.kC = i;
    this.wXt = s;
    this.s_r = t + i + s;
    this.a_r = h;
    this.h_r = 0;
    this.l_r = false;
    this.__r = false;
    this.blr = e;
    this.u_r = 0;
    this.c_r = 0;
    if (MathUtils_1.MathUtils.IsNearlyEqual(i, 0, 0.001)) {
      this.r_r = true;
    } else {
      this.r_r = false;
    }
    if (MathUtils_1.MathUtils.IsNearlyEqual(s, 0, 0.001)) {
      this.n_r = true;
    } else {
      this.n_r = false;
    }
  }
  Update(t) {
    if (!this.__r) {
      t = this.m_r(t);
      this.h_r += t;
      if (this.l_r) {
        if (this.h_r >= this.s_r) {
          this.__r = true;
        }
      } else if (this.h_r >= this.il + this.kC) {
        if (this.a_r) {
          if (this.r_r) {
            this.h_r = this.il;
          } else {
            t = this.h_r - this.il;
            this.h_r = this.il + (t - Math.floor(t / this.kC) * this.kC);
          }
        } else {
          this.l_r = true;
          if (this.n_r || this.h_r >= this.s_r) {
            this.__r = true;
          }
        }
      }
      this.d_r();
    }
  }
  TriggerEnd() {
    this.l_r = true;
    this.h_r = this.il + this.kC;
    if (this.n_r) {
      this.__r = true;
    }
    this.d_r();
  }
  SetLoop(t) {
    this.a_r = t;
  }
  GetCurrState() {
    return this.u_r;
  }
  IsDead() {
    return this.__r;
  }
  GetCurrFactor() {
    return this.c_r;
  }
  GetFloatFromGroup(t) {
    switch (this.u_r) {
      case 0:
        return UE.KuroCurveLibrary.GetValue_Float(t.Start, this.GetCurrFactor());
      case 1:
        return UE.KuroCurveLibrary.GetValue_Float(t.Loop, this.GetCurrFactor());
      default:
        return UE.KuroCurveLibrary.GetValue_Float(t.End, this.GetCurrFactor());
    }
  }
  GetColorFromGroup(t) {
    switch (this.u_r) {
      case 0:
        return UE.KuroCurveLibrary.GetValue_LinearColor(t.Start, this.GetCurrFactor());
      case 1:
        return UE.KuroCurveLibrary.GetValue_LinearColor(t.Loop, this.GetCurrFactor());
      default:
        return UE.KuroCurveLibrary.GetValue_LinearColor(t.End, this.GetCurrFactor());
    }
  }
  m_r(t) {
    if (!this.blr && RenderModuleController_1.RenderModuleController.IsGamePaused) {
      return 0;
    }
    if (this.blr) {
      var i = RenderModuleController_1.RenderModuleController.GlobalTimeDilation;
      if (!MathUtils_1.MathUtils.IsNearlyEqual(i, 1)) {
        return t * (1 / i);
      }
    }
    return t;
  }
  d_r() {
    if (this.__r) {
      this.u_r = 3;
      this.c_r = 1;
    } else if (this.l_r) {
      this.u_r = 2;
      this.c_r = (this.h_r - this.il - this.kC) / this.wXt;
    } else if (this.h_r < this.il) {
      this.u_r = 0;
      this.c_r = this.h_r / this.il;
    } else {
      this.u_r = 1;
      if (this.r_r) {
        this.c_r = 1;
      }
      this.c_r = (this.h_r - this.il) / this.kC;
    }
  }
}
exports.ThreeSectionTimeline = ThreeSectionTimeline;
//# sourceMappingURL=ThreeSectionTimeline.js.map