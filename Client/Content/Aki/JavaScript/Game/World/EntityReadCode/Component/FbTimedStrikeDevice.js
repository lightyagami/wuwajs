"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbTimedStrikeDevice = void 0;
class FbTimedStrikeDevice {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.nWh = !1, this.Fke = 0, this.sWh = !1, this.aWh = 0, this.hWh = !1, this.lWh = 0, this.cCc = !1, this.uCc = 0, this.Tuh = !1, this.buh = 0, this.Jgc = !1, this.Zgc = 0, this.eCc = !1, this.tCc = 0, this.Yc1 = !1, this.zc1 = 0, this.UB1 = !1, this.BB1 = 0, this.kB1 = !1, this.OB1 = 0
  }
  static Create(t) {
    if (t) return new FbTimedStrikeDevice(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get MaxValue() {
    return this.nWh || (this.nWh = !0, this.Fke = this.FbDataInternal.maxValue()), this.Fke
  }
  get InitValue() {
    return this.sWh || (this.sWh = !0, this.aWh = this.FbDataInternal.initValue()), this.aWh
  }
  get ProgressPerformanceAttribute() {
    return this.hWh || (this.hWh = !0, this.lWh = this.FbDataInternal.progressPerformanceAttribute()), this.lWh
  }
  get AddValue() {
    return this.cCc || (this.cCc = !0, this.uCc = this.FbDataInternal.addValue()), this.uCc
  }
  get Timeout() {
    return this.Tuh || (this.Tuh = !0, this.buh = this.FbDataInternal.timeout()), this.buh
  }
  get FallbackValue() {
    return this.Jgc || (this.Jgc = !0, this.Zgc = this.FbDataInternal.fallbackValue()), this.Zgc
  }
  get FallbackInterval() {
    return this.eCc || (this.eCc = !0, this.tCc = this.FbDataInternal.fallbackInterval()), this.tCc
  }
  get ZeroValuePerformanceAttribute() {
    return this.Yc1 || (this.Yc1 = !0, this.zc1 = this.FbDataInternal.zeroValuePerformanceAttribute()), this.zc1
  }
  get AscendPerformanceAttribute() {
    return this.UB1 || (this.UB1 = !0, this.BB1 = this.FbDataInternal.ascendPerformanceAttribute()), this.BB1
  }
  get DescendPerformanceAttribute() {
    return this.kB1 || (this.kB1 = !0, this.OB1 = this.FbDataInternal.descendPerformanceAttribute()), this.OB1
  }
}
exports.FbTimedStrikeDevice = FbTimedStrikeDevice;
//# sourceMappingURL=FbTimedStrikeDevice.js.map