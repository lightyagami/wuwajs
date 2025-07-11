"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCameraGaze = undefined;
class FbCameraGaze {
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
    this.Yxh = false;
    this.zxh = 0;
    this.Jxh = false;
    this.Zxh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCameraGaze(t);
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
  get LockPriority() {
    if (!this.Yxh) {
      this.Yxh = true;
      this.zxh = this.FbDataInternal.lockPriority();
    }
    return this.zxh;
  }
  get GazeInHook() {
    if (!this.Jxh) {
      this.Jxh = true;
      this.Zxh = this.FbDataInternal.gazeInHook();
    }
    return this.Zxh;
  }
}
exports.FbCameraGaze = FbCameraGaze;
//# sourceMappingURL=FbCameraGaze.js.map