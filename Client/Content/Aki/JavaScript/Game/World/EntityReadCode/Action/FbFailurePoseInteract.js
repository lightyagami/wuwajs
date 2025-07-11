"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFailurePoseInteract = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFailurePoseInteract {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Aph = false;
    this.xph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFailurePoseInteract(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Rot() {
    if (!this.Aph) {
      this.Aph = true;
      this.xph = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rot());
    }
    return this.xph;
  }
}
exports.FbFailurePoseInteract = FbFailurePoseInteract;
//# sourceMappingURL=FbFailurePoseInteract.js.map