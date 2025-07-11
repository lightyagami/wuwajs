"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleControlBaseCfg = undefined;
class FbTeleControlBaseCfg {
  constructor(t) {
    this.FbDataInternal = t;
    this.o2h = false;
    this.n2h = undefined;
    this.s2h = false;
    this.a2h = false;
    this.h2h = false;
    this.l2h = false;
  }
  static Create(t) {
    if (t) {
      return new FbTeleControlBaseCfg(t);
    }
  }
  get CommonConfig() {
    if (!this.o2h) {
      this.o2h = true;
      this.n2h = this.FbDataInternal.commonConfig();
    }
    return this.n2h;
  }
  get CanRotate() {
    if (!this.s2h) {
      this.s2h = true;
      this.a2h = this.FbDataInternal.canRotate();
    }
    return this.a2h;
  }
  get InitialGravity() {
    if (!this.h2h) {
      this.h2h = true;
      this.l2h = this.FbDataInternal.initialGravity();
    }
    return this.l2h;
  }
}
exports.FbTeleControlBaseCfg = FbTeleControlBaseCfg;
//# sourceMappingURL=FbTeleControlBaseCfg.js.map