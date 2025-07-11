"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbItemFoundation = undefined;
const FbAdsortTransform_1 = require("./FbAdsortTransform");
const FbEntityMatch_1 = require("./FbEntityMatch");
const FbItemChangeAdsorbateState_1 = require("./FbItemChangeAdsorbateState");
class FbItemFoundation {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.YOh = false;
    this.zOh = undefined;
    this.JOh = false;
    this.ZOh = undefined;
    this.eFh = false;
    this.tFh = undefined;
    this.iFh = false;
    this.rFh = false;
    this.bEh = false;
    this.LEh = false;
    this.oFh = false;
    this.nFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbItemFoundation(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get AdsorptionPoint() {
    if (!this.YOh) {
      this.YOh = true;
      this.zOh = FbAdsortTransform_1.FbAdsortTransform.Create(this.FbDataInternal.adsorptionPoint());
    }
    return this.zOh;
  }
  get AdsorptionMatch() {
    if (!this.JOh) {
      this.JOh = true;
      this.ZOh = FbEntityMatch_1.FbEntityMatch.Create(this.FbDataInternal.adsorptionMatch());
    }
    return this.ZOh;
  }
  get ActiveMatch() {
    if (!this.eFh) {
      this.eFh = true;
      this.tFh = FbEntityMatch_1.FbEntityMatch.Create(this.FbDataInternal.activeMatch());
    }
    return this.tFh;
  }
  get IsSilent() {
    if (!this.iFh) {
      this.iFh = true;
      this.rFh = this.FbDataInternal.isSilent();
    }
    return this.rFh;
  }
  get IsDestroy() {
    if (!this.bEh) {
      this.bEh = true;
      this.LEh = this.FbDataInternal.isDestroy();
    }
    return this.LEh;
  }
  get ChangeAdsorbateState() {
    if (!this.oFh) {
      this.oFh = true;
      this.nFh = FbItemChangeAdsorbateState_1.FbItemChangeAdsorbateState.Create(this.FbDataInternal.changeAdsorbateState());
    }
    return this.nFh;
  }
}
exports.FbItemFoundation = FbItemFoundation;
//# sourceMappingURL=FbItemFoundation.js.map