"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGrabComponent = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbGrabComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.sDh = false;
    this.aDh = undefined;
    this.hDh = false;
    this.lDh = 0;
    this._Dh = false;
    this.cDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbGrabComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get GrabPos() {
    if (!this.sDh) {
      this.sDh = true;
      this.aDh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.grabPos());
    }
    return this.aDh;
  }
  get ThrowPow() {
    if (!this.hDh) {
      this.hDh = true;
      this.lDh = this.FbDataInternal.throwPow();
    }
    return this.lDh;
  }
  get ThrowHight() {
    if (!this._Dh) {
      this._Dh = true;
      this.cDh = this.FbDataInternal.throwHight();
    }
    return this.cDh;
  }
}
exports.FbGrabComponent = FbGrabComponent;
//# sourceMappingURL=FbGrabComponent.js.map