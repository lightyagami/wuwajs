"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkBackgroundImageByMcGender = undefined;
class FbTalkBackgroundImageByMcGender {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.nph = false;
    this.sph = undefined;
    this.aph = false;
    this.hph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTalkBackgroundImageByMcGender(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ImageAssetMale() {
    if (!this.nph) {
      this.nph = true;
      this.sph = this.FbDataInternal.imageAssetMale();
    }
    return this.sph;
  }
  get ImageAssetFemale() {
    if (!this.aph) {
      this.aph = true;
      this.hph = this.FbDataInternal.imageAssetFemale();
    }
    return this.hph;
  }
}
exports.FbTalkBackgroundImageByMcGender = FbTalkBackgroundImageByMcGender;
//# sourceMappingURL=FbTalkBackgroundImageByMcGender.js.map