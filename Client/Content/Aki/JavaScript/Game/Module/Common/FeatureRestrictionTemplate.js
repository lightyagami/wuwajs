"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureRestrictionTemplate = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
class FeatureRestrictionTemplate {
  constructor(t, e = 0) {
    this.lNn = 0;
    this._Nn = 0;
    this.uNn = 2;
    this.cNn = 0;
    this.uNn = t;
    this.cNn = e;
  }
  mNn(t) {
    this.lNn = this.lNn | t;
  }
  dNn(t, e) {
    return (t & e) === e;
  }
  CNn() {
    let t = 0;
    if (ConfigManager_1.ConfigManager.CommonConfig?.GetPioneerFlag()) {
      t |= 8;
    }
    return t;
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
    var t;
    return FeatureRestrictionTemplate.fNn || ((t = new FeatureRestrictionTemplate(0)).mNn(8), FeatureRestrictionTemplate.fNn = t);
  }
}
(exports.FeatureRestrictionTemplate = FeatureRestrictionTemplate).fNn = undefined;
//# sourceMappingURL=FeatureRestrictionTemplate.js.map