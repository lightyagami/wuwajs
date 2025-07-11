"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbModelId = undefined;
class FbModelId {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.hNh = false;
    this.lNh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbModelId(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ModelId() {
    if (!this.hNh) {
      this.hNh = true;
      this.lNh = this.FbDataInternal.modelId();
    }
    return this.lNh;
  }
}
exports.FbModelId = FbModelId;
//# sourceMappingURL=FbModelId.js.map