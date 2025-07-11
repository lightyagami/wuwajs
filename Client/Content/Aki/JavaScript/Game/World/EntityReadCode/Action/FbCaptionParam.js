"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCaptionParam = undefined;
class FbCaptionParam {
  constructor(t) {
    this.FbDataInternal = t;
    this.Dgh = false;
    this.Bgh = 0;
    this.SCh = false;
    this.MCh = 0;
    this.qgh = false;
    this.kgh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCaptionParam(t);
    }
  }
  get StartTime() {
    if (!this.Dgh) {
      this.Dgh = true;
      this.Bgh = this.FbDataInternal.startTime();
    }
    return this.Bgh;
  }
  get TotalTime() {
    if (!this.SCh) {
      this.SCh = true;
      this.MCh = this.FbDataInternal.totalTime();
    }
    return this.MCh;
  }
  get IntervalTime() {
    if (!this.qgh) {
      this.qgh = true;
      this.kgh = this.FbDataInternal.intervalTime();
    }
    return this.kgh;
  }
}
exports.FbCaptionParam = FbCaptionParam;
//# sourceMappingURL=FbCaptionParam.js.map