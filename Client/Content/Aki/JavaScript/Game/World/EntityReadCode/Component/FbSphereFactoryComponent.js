"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSphereFactoryComponent = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSphereFactoryComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Sqh = false;
    this.Mqh = undefined;
    this.Eqh = false;
    this.Iqh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSphereFactoryComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get SphereLocation() {
    if (!this.Sqh) {
      this.Sqh = true;
      this.Mqh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.sphereLocation());
    }
    return this.Mqh;
  }
  get SphereGuid() {
    if (!this.Eqh) {
      this.Eqh = true;
      this.Iqh = this.FbDataInternal.sphereGuid();
    }
    return this.Iqh;
  }
}
exports.FbSphereFactoryComponent = FbSphereFactoryComponent;
//# sourceMappingURL=FbSphereFactoryComponent.js.map