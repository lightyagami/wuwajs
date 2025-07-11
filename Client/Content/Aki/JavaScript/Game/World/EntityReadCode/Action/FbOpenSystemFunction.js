"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenSystemFunction = undefined;
class FbOpenSystemFunction {
  constructor(t) {
    this.FbDataInternal = t;
    this.bdh = false;
    this.Ldh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbOpenSystemFunction(t);
    }
  }
  get FunctionId() {
    if (!this.bdh) {
      this.bdh = true;
      this.Ldh = this.FbDataInternal.functionId();
    }
    return this.Ldh;
  }
}
exports.FbOpenSystemFunction = FbOpenSystemFunction;
//# sourceMappingURL=FbOpenSystemFunction.js.map