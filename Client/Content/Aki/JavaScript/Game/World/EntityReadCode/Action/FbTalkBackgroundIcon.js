"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkBackgroundIcon = undefined;
class FbTalkBackgroundIcon {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.rph = false;
    this.oph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTalkBackgroundIcon(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ImageAsset() {
    if (!this.rph) {
      this.rph = true;
      this.oph = this.FbDataInternal.imageAsset();
    }
    return this.oph;
  }
}
exports.FbTalkBackgroundIcon = FbTalkBackgroundIcon;
//# sourceMappingURL=FbTalkBackgroundIcon.js.map