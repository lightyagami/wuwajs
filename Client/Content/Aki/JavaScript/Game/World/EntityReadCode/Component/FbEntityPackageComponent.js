"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityPackageComponent = undefined;
const FbEntityPackageData_1 = require("./FbEntityPackageData");
class FbEntityPackageComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Gjh = false;
    this.Ojh = false;
    this.Fjh = false;
    this.Njh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityPackageComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get BindTemplate() {
    if (!this.Gjh) {
      this.Gjh = true;
      this.Ojh = this.FbDataInternal.bindTemplate();
    }
    return this.Ojh;
  }
  get PackageData() {
    if (!this.Fjh) {
      this.Fjh = true;
      this.Njh = FbEntityPackageData_1.FbEntityPackageData.Create(this.FbDataInternal.packageData());
    }
    return this.Njh;
  }
}
exports.FbEntityPackageComponent = FbEntityPackageComponent;
//# sourceMappingURL=FbEntityPackageComponent.js.map