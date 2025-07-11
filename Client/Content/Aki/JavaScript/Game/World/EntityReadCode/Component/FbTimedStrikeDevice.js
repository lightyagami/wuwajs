"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimedStrikeDevice = undefined;
class FbTimedStrikeDevice {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.nWh = false;
    this.Fke = 0;
    this.sWh = false;
    this.aWh = 0;
    this.hWh = false;
    this.lWh = 0;
    this.cCc = false;
    this.uCc = 0;
    this.Tuh = false;
    this.buh = 0;
    this.Jgc = false;
    this.Zgc = 0;
    this.eCc = false;
    this.tCc = 0;
    this.Su1 = false;
    this.Mu1 = 0;
    this.uk1 = false;
    this.ck1 = 0;
    this.dk1 = false;
    this.mk1 = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTimedStrikeDevice(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MaxValue() {
    if (!this.nWh) {
      this.nWh = true;
      this.Fke = this.FbDataInternal.maxValue();
    }
    return this.Fke;
  }
  get InitValue() {
    if (!this.sWh) {
      this.sWh = true;
      this.aWh = this.FbDataInternal.initValue();
    }
    return this.aWh;
  }
  get ProgressPerformanceAttribute() {
    if (!this.hWh) {
      this.hWh = true;
      this.lWh = this.FbDataInternal.progressPerformanceAttribute();
    }
    return this.lWh;
  }
  get AddValue() {
    if (!this.cCc) {
      this.cCc = true;
      this.uCc = this.FbDataInternal.addValue();
    }
    return this.uCc;
  }
  get Timeout() {
    if (!this.Tuh) {
      this.Tuh = true;
      this.buh = this.FbDataInternal.timeout();
    }
    return this.buh;
  }
  get FallbackValue() {
    if (!this.Jgc) {
      this.Jgc = true;
      this.Zgc = this.FbDataInternal.fallbackValue();
    }
    return this.Zgc;
  }
  get FallbackInterval() {
    if (!this.eCc) {
      this.eCc = true;
      this.tCc = this.FbDataInternal.fallbackInterval();
    }
    return this.tCc;
  }
  get ZeroValuePerformanceAttribute() {
    if (!this.Su1) {
      this.Su1 = true;
      this.Mu1 = this.FbDataInternal.zeroValuePerformanceAttribute();
    }
    return this.Mu1;
  }
  get AscendPerformanceAttribute() {
    if (!this.uk1) {
      this.uk1 = true;
      this.ck1 = this.FbDataInternal.ascendPerformanceAttribute();
    }
    return this.ck1;
  }
  get DescendPerformanceAttribute() {
    if (!this.dk1) {
      this.dk1 = true;
      this.mk1 = this.FbDataInternal.descendPerformanceAttribute();
    }
    return this.mk1;
  }
}
exports.FbTimedStrikeDevice = FbTimedStrikeDevice;
//# sourceMappingURL=FbTimedStrikeDevice.js.map