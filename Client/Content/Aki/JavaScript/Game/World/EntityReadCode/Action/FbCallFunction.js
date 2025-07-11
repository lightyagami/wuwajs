"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCallFunction = undefined;
class FbCallFunction {
  constructor(t) {
    this.FbDataInternal = t;
    this.x_h = false;
    this.FGi = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCallFunction(t);
    }
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
}
exports.FbCallFunction = FbCallFunction;
//# sourceMappingURL=FbCallFunction.js.map