"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureRestrictionTemplate = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class FeatureRestrictionTemplate {
  constructor(e, t = 0) {
    this.lNn = 0;
    this._Nn = 0;
    this.uNn = 2;
    this.cNn = 0;
    this.uNn = e;
    this.cNn = t;
  }
  mNn(e) {
    this.lNn = this.lNn | e;
  }
  dNn(e, t) {
    return (e & t) === t;
  }
  CNn() {
    let e = 0;
    if (ConfigManager_1.ConfigManager.CommonConfig?.GetPioneerFlag() || ControllerHolder_1.ControllerHolder.KuroSdkController.CheckIfPioneer()) {
      e |= 8;
    }
    return e;
  }
  gNn() {
    return 0;
  }
  Check() {
    switch (this.cNn) {
      case 1:
        return true;
      case 2:
        return false;
    }
    switch (this.uNn) {
      case 0:
        return this.dNn(this.CNn(), this.lNn);
      case 1:
        return this.dNn(this.gNn(), this._Nn);
      case 2:
        return this.dNn(this.CNn(), this.lNn) && this.dNn(this.gNn(), this._Nn);
      default:
        return false;
    }
  }
  static get TemplateForPioneerClient() {
    var e;
    return FeatureRestrictionTemplate.fNn || ((e = new FeatureRestrictionTemplate(0)).mNn(8), FeatureRestrictionTemplate.fNn = e);
  }
}
(exports.FeatureRestrictionTemplate = FeatureRestrictionTemplate).fNn = undefined;
//# sourceMappingURL=FeatureRestrictionTemplate.js.map