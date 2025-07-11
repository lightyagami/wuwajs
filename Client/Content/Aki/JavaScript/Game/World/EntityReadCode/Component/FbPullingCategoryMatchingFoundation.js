"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPullingCategoryMatchingFoundation = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCategoryMatchingConfigBase_1 = require("./FbCategoryMatchingConfigBase");
class FbPullingCategoryMatchingFoundation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.sFh = false;
    this.aFh = 0;
    this.hFh = false;
    this.lFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPullingCategoryMatchingFoundation(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get InitMatchEntity() {
    if (!this.sFh) {
      this.sFh = true;
      this.aFh = this.FbDataInternal.initMatchEntity();
    }
    return this.aFh;
  }
  get MatchingConfigs() {
    if (!this.hFh) {
      this.hFh = true;
      this.lFh = new Array();
      var i = this.FbDataInternal.matchingConfigsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchingConfigs(t, new fb_component_1.CategoryMatchingConfigBase());
          this.lFh.push(FbCategoryMatchingConfigBase_1.FbCategoryMatchingConfigBase.Create(e));
        }
      }
    }
    return this.lFh;
  }
}
exports.FbPullingCategoryMatchingFoundation = FbPullingCategoryMatchingFoundation;
//# sourceMappingURL=FbPullingCategoryMatchingFoundation.js.map