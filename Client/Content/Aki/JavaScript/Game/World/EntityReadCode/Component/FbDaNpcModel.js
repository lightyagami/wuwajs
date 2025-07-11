"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDaNpcModel = undefined;
class FbDaNpcModel {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.MKh = false;
    this.EKh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDaNpcModel(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Da() {
    if (!this.MKh) {
      this.MKh = true;
      this.EKh = this.FbDataInternal.da();
    }
    return this.EKh;
  }
}
exports.FbDaNpcModel = FbDaNpcModel;
//# sourceMappingURL=FbDaNpcModel.js.map