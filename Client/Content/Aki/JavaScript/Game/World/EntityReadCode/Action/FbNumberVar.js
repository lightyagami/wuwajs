"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNumberVar = undefined;
class FbNumberVar {
  constructor(t) {
    this.FbDataInternal = t;
    this.x_h = false;
    this.FGi = undefined;
    this.kmh = false;
    this.Gmh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbNumberVar(t);
    }
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get Value() {
    if (!this.kmh) {
      this.kmh = true;
      this.Gmh = this.FbDataInternal.value();
    }
    return this.Gmh;
  }
}
exports.FbNumberVar = FbNumberVar;
//# sourceMappingURL=FbNumberVar.js.map