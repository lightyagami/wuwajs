"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HpBufferStateMachine = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
class HpBufferStateMachine {
  constructor() {
    this.G2e = 0;
    this.y_t = 0;
    this.I_t = 0;
    this.TargetPercent = 0;
    this.CurrentPercent = 0;
    this.Cce = 0;
    this.T_t = -0;
    this.L_t = -0;
    this.D_t = -0;
    this.T_t = CommonParamById_1.configCommonParamById.GetIntConfig("HitDelayTime");
    this.L_t = CommonParamById_1.configCommonParamById.GetIntConfig("HitRefreshTime");
    this.D_t = CommonParamById_1.configCommonParamById.GetIntConfig("HitBufferDisappearTime");
    this.Cce = this.D_t;
  }
  UpdateParams(t) {
    if (t === 6) {
      this.T_t = CommonParamById_1.configCommonParamById.GetIntConfig("DurabilityHitDelayTime");
      this.D_t = CommonParamById_1.configCommonParamById.GetIntConfig("DurabilityHitBufferDisappearTime");
    }
  }
  UpdatePercent(t) {
    var i;
    if (this.G2e === 2) {
      i = (this.CurrentPercent - this.TargetPercent) / this.Cce;
      this.CurrentPercent -= t * i;
      this.Cce -= t;
      if (this.Cce <= 0) {
        this.G2e = 0;
        return this.TargetPercent;
      } else {
        return this.CurrentPercent;
      }
    } else if (this.G2e === 1) {
      this.y_t += t;
      if (this.y_t > this.T_t) {
        this.G2e = 2;
      }
      return this.CurrentPercent;
    } else {
      return -1;
    }
  }
  GetHit(t, i) {
    if (!(i < t)) {
      if (this.G2e === 0) {
        this.G2e = 1;
        this.I_t = 1;
        this.y_t = 0;
        this.CurrentPercent = i;
        this.TargetPercent = t;
        this.Cce = this.D_t;
      } else if (this.G2e === 1) {
        this.I_t += 1;
        if (this.I_t > this.L_t) {
          this.G2e = 2;
        }
        this.y_t = 0;
        this.TargetPercent = t;
      } else if (this.G2e === 2) {
        this.TargetPercent = t;
        this.Cce = this.D_t;
      }
    }
  }
  Reset() {
    this.G2e = 0;
  }
  IsOriginState() {
    return this.G2e === 0;
  }
}
exports.HpBufferStateMachine = HpBufferStateMachine;
//# sourceMappingURL=HpBufferStateMachine.js.map