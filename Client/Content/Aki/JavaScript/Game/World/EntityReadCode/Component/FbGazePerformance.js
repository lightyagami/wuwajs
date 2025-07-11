"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGazePerformance = undefined;
class FbGazePerformance {
  constructor(t) {
    this.FbDataInternal = t;
    this.mch = false;
    this.Cch = 0;
    this.gch = false;
    this.fch = 0;
    this.pch = false;
    this.vch = 0;
    this.ych = false;
    this.Sch = false;
  }
  static Create(t) {
    if (t) {
      return new FbGazePerformance(t);
    }
  }
  get FadeInTime() {
    if (!this.mch) {
      this.mch = true;
      this.Cch = this.FbDataInternal.fadeInTime();
    }
    return this.Cch;
  }
  get StayTime() {
    if (!this.gch) {
      this.gch = true;
      this.fch = this.FbDataInternal.stayTime();
    }
    return this.fch;
  }
  get FadeOutTime() {
    if (!this.pch) {
      this.pch = true;
      this.vch = this.FbDataInternal.fadeOutTime();
    }
    return this.vch;
  }
  get LockCamera() {
    if (!this.ych) {
      this.ych = true;
      this.Sch = this.FbDataInternal.lockCamera();
    }
    return this.Sch;
  }
}
exports.FbGazePerformance = FbGazePerformance;
//# sourceMappingURL=FbGazePerformance.js.map