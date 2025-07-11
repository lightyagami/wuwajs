"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFightInteractComponent = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFightInteractComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Cjh = false;
    this._an = 0;
    this.gjh = false;
    this.fjh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFightInteractComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get LockRange() {
    if (!this.Cjh) {
      this.Cjh = true;
      this._an = this.FbDataInternal.lockRange();
    }
    return this._an;
  }
  get LockOffset() {
    if (!this.gjh) {
      this.gjh = true;
      this.fjh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.lockOffset());
    }
    return this.fjh;
  }
}
exports.FbFightInteractComponent = FbFightInteractComponent;
//# sourceMappingURL=FbFightInteractComponent.js.map