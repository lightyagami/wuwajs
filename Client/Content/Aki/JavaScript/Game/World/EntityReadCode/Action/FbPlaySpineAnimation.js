"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlaySpineAnimation = undefined;
class FbPlaySpineAnimation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.x_h = false;
    this.FGi = undefined;
    this.Dfh = false;
    this.Bfh = false;
  }
  static Create(t) {
    if (t) {
      return new FbPlaySpineAnimation(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get IsLoop() {
    if (!this.Dfh) {
      this.Dfh = true;
      this.Bfh = this.FbDataInternal.isLoop();
    }
    return this.Bfh;
  }
}
exports.FbPlaySpineAnimation = FbPlaySpineAnimation;
//# sourceMappingURL=FbPlaySpineAnimation.js.map