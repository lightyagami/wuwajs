"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRestorePhantomFormation = undefined;
class FbRestorePhantomFormation {
  constructor(t) {
    this.FbDataInternal = t;
    this.$Th = false;
    this.XTh = 0;
    this.ybh = false;
    this.Sbh = false;
  }
  static Create(t) {
    if (t) {
      return new FbRestorePhantomFormation(t);
    }
  }
  get TeleportEntityId() {
    if (!this.$Th) {
      this.$Th = true;
      this.XTh = this.FbDataInternal.teleportEntityId();
    }
    return this.XTh;
  }
  get RetainPhantom() {
    if (!this.ybh) {
      this.ybh = true;
      this.Sbh = this.FbDataInternal.retainPhantom();
    }
    return this.Sbh;
  }
}
exports.FbRestorePhantomFormation = FbRestorePhantomFormation;
//# sourceMappingURL=FbRestorePhantomFormation.js.map