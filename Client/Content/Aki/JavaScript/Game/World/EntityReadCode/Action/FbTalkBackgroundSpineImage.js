"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkBackgroundSpineImage = undefined;
class FbTalkBackgroundSpineImage {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tgh = false;
    this.FFe = 0;
    this.Dfh = false;
    this.Bfh = false;
  }
  static Create(t) {
    if (t) {
      return new FbTalkBackgroundSpineImage(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get IsLoop() {
    if (!this.Dfh) {
      this.Dfh = true;
      this.Bfh = this.FbDataInternal.isLoop();
    }
    return this.Bfh;
  }
}
exports.FbTalkBackgroundSpineImage = FbTalkBackgroundSpineImage;
//# sourceMappingURL=FbTalkBackgroundSpineImage.js.map