"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbIconNearByTrackingConfig = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbIconNearByTrackingConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Rjh = false;
    this.wjh = 0;
    this.Pjh = false;
    this.Ujh = 0;
    this.Djh = false;
    this.Bjh = undefined;
    this.qjh = false;
    this.kjh = undefined;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbIconNearByTrackingConfig(t);
    }
  }
  get ShowRange() {
    if (!this.Rjh) {
      this.Rjh = true;
      this.wjh = this.FbDataInternal.showRange();
    }
    return this.wjh;
  }
  get HideRange() {
    if (!this.Pjh) {
      this.Pjh = true;
      this.Ujh = this.FbDataInternal.hideRange();
    }
    return this.Ujh;
  }
  get TexturePath() {
    if (!this.Djh) {
      this.Djh = true;
      this.Bjh = this.FbDataInternal.texturePath();
    }
    return this.Bjh;
  }
  get UiOffset() {
    if (!this.qjh) {
      this.qjh = true;
      this.kjh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.uiOffset());
    }
    return this.kjh;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbIconNearByTrackingConfig = FbIconNearByTrackingConfig;
//# sourceMappingURL=FbIconNearByTrackingConfig.js.map