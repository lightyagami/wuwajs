"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHitTimeScaleRatio = undefined;
class FbHitTimeScaleRatio {
  constructor(t) {
    this.FbDataInternal = t;
    this.aOh = false;
    this.hOh = 0;
    this.lOh = false;
    this._Oh = 0;
    this.cOh = false;
    this.uOh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbHitTimeScaleRatio(t);
    }
  }
  get TimeRatio() {
    if (!this.aOh) {
      this.aOh = true;
      this.hOh = this.FbDataInternal.timeRatio();
    }
    return this.hOh;
  }
  get MaxExtraTime() {
    if (!this.lOh) {
      this.lOh = true;
      this._Oh = this.FbDataInternal.maxExtraTime();
    }
    return this._Oh;
  }
  get ValueRatio() {
    if (!this.cOh) {
      this.cOh = true;
      this.uOh = this.FbDataInternal.valueRatio();
    }
    return this.uOh;
  }
}
exports.FbHitTimeScaleRatio = FbHitTimeScaleRatio;
//# sourceMappingURL=FbHitTimeScaleRatio.js.map