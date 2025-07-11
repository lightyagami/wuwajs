"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportTransitionWithMp4 = undefined;
const FbMp4BackgroundColor_1 = require("./FbMp4BackgroundColor");
class FbTeleportTransitionWithMp4 {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ivh = false;
    this.rvh = undefined;
    this.ovh = false;
    this.nvh = false;
    this.fd_ = false;
    this.vd_ = false;
    this.$qc = false;
    this.Wqc = undefined;
    this.Qqc = false;
    this.Kqc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportTransitionWithMp4(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Mp4Path() {
    if (!this.ivh) {
      this.ivh = true;
      this.rvh = this.FbDataInternal.mp4Path();
    }
    return this.rvh;
  }
  get IsFadeInScreenAfterTeleport() {
    if (!this.ovh) {
      this.ovh = true;
      this.nvh = this.FbDataInternal.isFadeInScreenAfterTeleport();
    }
    return this.nvh;
  }
  get ReplayWhenReLogin() {
    if (!this.fd_) {
      this.fd_ = true;
      this.vd_ = this.FbDataInternal.replayWhenReLogin();
    }
    return this.vd_;
  }
  get BackgroundColor() {
    if (!this.$qc) {
      this.$qc = true;
      this.Wqc = FbMp4BackgroundColor_1.FbMp4BackgroundColor.Create(this.FbDataInternal.backgroundColor());
    }
    return this.Wqc;
  }
  get AfterTeleportScreenColor() {
    if (!this.Qqc) {
      this.Qqc = true;
      this.Kqc = this.FbDataInternal.afterTeleportScreenColor();
    }
    return this.Kqc;
  }
}
exports.FbTeleportTransitionWithMp4 = FbTeleportTransitionWithMp4;
//# sourceMappingURL=FbTeleportTransitionWithMp4.js.map