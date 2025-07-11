"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMontageData = undefined;
const FbMontageParam_1 = require("./FbMontageParam");
class FbMontageData {
  constructor(t) {
    this.FbDataInternal = t;
    this.xfh = false;
    this.Y_i = 0;
    this.Rfh = false;
    this.wfh = 0;
    this.Pfh = false;
    this.Ufh = false;
    this.Dfh = false;
    this.Bfh = false;
    this.qfh = false;
    this.kfh = false;
    this.Gfh = false;
    this.Ofh = 0;
    this.Ffh = false;
    this.Nfh = false;
    this.Vfh = false;
    this.jfh = false;
    this.O1_ = false;
    this.G1_ = false;
    this.Hfh = false;
    this.Wfh = undefined;
    this.Qfh = false;
    this.Kfh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbMontageData(t);
    }
  }
  get ActorIndex() {
    if (!this.xfh) {
      this.xfh = true;
      this.Y_i = this.FbDataInternal.actorIndex();
    }
    return this.Y_i;
  }
  get MontageId() {
    if (!this.Rfh) {
      this.Rfh = true;
      this.wfh = this.FbDataInternal.montageId();
    }
    return this.wfh;
  }
  get IsAbpMontage() {
    if (!this.Pfh) {
      this.Pfh = true;
      this.Ufh = this.FbDataInternal.isAbpMontage();
    }
    return this.Ufh;
  }
  get IsLoop() {
    if (!this.Dfh) {
      this.Dfh = true;
      this.Bfh = this.FbDataInternal.isLoop();
    }
    return this.Bfh;
  }
  get KeepPose() {
    if (!this.qfh) {
      this.qfh = true;
      this.kfh = this.FbDataInternal.keepPose();
    }
    return this.kfh;
  }
  get DelayTime() {
    if (!this.Gfh) {
      this.Gfh = true;
      this.Ofh = this.FbDataInternal.delayTime();
    }
    return this.Ofh;
  }
  get EndLoopingMontage() {
    if (!this.Ffh) {
      this.Ffh = true;
      this.Nfh = this.FbDataInternal.endLoopingMontage();
    }
    return this.Nfh;
  }
  get EndMontageDirectly() {
    if (!this.Vfh) {
      this.Vfh = true;
      this.jfh = this.FbDataInternal.endMontageDirectly();
    }
    return this.jfh;
  }
  get StartFromLoop() {
    if (!this.O1_) {
      this.O1_ = true;
      this.G1_ = this.FbDataInternal.startFromLoop();
    }
    return this.G1_;
  }
  get OverlayMontage() {
    if (!this.Hfh) {
      this.Hfh = true;
      this.Wfh = FbMontageParam_1.FbMontageParam.Create(this.FbDataInternal.overlayMontage());
    }
    return this.Wfh;
  }
  get FaceExpressionId() {
    if (!this.Qfh) {
      this.Qfh = true;
      this.Kfh = this.FbDataInternal.faceExpressionId();
    }
    return this.Kfh;
  }
}
exports.FbMontageData = FbMontageData;
//# sourceMappingURL=FbMontageData.js.map