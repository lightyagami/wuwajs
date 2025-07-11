"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityBundleComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityBundleChildInfo_1 = require("./FbEntityBundleChildInfo");
class FbEntityBundleComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.j9l = false;
    this.H9l = 0;
    this.W9l = false;
    this.Q9l = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityBundleComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get BundleId() {
    if (!this.j9l) {
      this.j9l = true;
      this.H9l = this.FbDataInternal.bundleId();
    }
    return this.H9l;
  }
  get ChildInfos() {
    if (!this.W9l) {
      this.W9l = true;
      this.Q9l = new Array();
      var i = this.FbDataInternal.childInfosLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.childInfos(t, new fb_component_1.EntityBundleChildInfo());
          this.Q9l.push(FbEntityBundleChildInfo_1.FbEntityBundleChildInfo.Create(e));
        }
      }
    }
    return this.Q9l;
  }
}
exports.FbEntityBundleComponent = FbEntityBundleComponent;
//# sourceMappingURL=FbEntityBundleComponent.js.map