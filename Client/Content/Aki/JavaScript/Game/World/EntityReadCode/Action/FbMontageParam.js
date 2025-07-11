"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMontageParam = undefined;
const FbMontageId_1 = require("./FbMontageId");
class FbMontageParam {
  constructor(t) {
    this.FbDataInternal = t;
    this.Rfh = false;
    this.wfh = undefined;
    this.Dfh = false;
    this.Bfh = false;
    this.qfh = false;
    this.kfh = false;
    this.Gfh = false;
    this.Ofh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbMontageParam(t);
    }
  }
  get MontageId() {
    if (!this.Rfh) {
      this.Rfh = true;
      this.wfh = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.montageId());
    }
    return this.wfh;
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
}
exports.FbMontageParam = FbMontageParam;
//# sourceMappingURL=FbMontageParam.js.map