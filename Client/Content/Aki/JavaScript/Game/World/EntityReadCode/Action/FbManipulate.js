"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbManipulate = undefined;
class FbManipulate {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Vvh = false;
    this.jvh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbManipulate(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetEntityId() {
    if (!this.Vvh) {
      this.Vvh = true;
      this.jvh = this.FbDataInternal.targetEntityId();
    }
    return this.jvh;
  }
}
exports.FbManipulate = FbManipulate;
//# sourceMappingURL=FbManipulate.js.map