"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckDataLayerCondition = undefined;
class FbCheckDataLayerCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Nzh = false;
    this.Vzh = 0;
    this.jzh = false;
    this.Hzh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckDataLayerCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get DataLayerId() {
    if (!this.Nzh) {
      this.Nzh = true;
      this.Vzh = this.FbDataInternal.dataLayerId();
    }
    return this.Vzh;
  }
  get IsLoad() {
    if (!this.jzh) {
      this.jzh = true;
      this.Hzh = this.FbDataInternal.isLoad();
    }
    return this.Hzh;
  }
}
exports.FbCheckDataLayerCondition = FbCheckDataLayerCondition;
//# sourceMappingURL=FbCheckDataLayerCondition.js.map