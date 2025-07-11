"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityPackageData = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityPackageNode_1 = require("./FbEntityPackageNode");
class FbEntityPackageData {
  constructor(t) {
    this.FbDataInternal = t;
    this.Vjh = false;
    this.jjh = 0;
    this.Hjh = false;
    this.Wjh = 0;
    this.Qjh = false;
    this.Kjh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityPackageData(t);
    }
  }
  get PackagedLevelId() {
    if (!this.Vjh) {
      this.Vjh = true;
      this.jjh = this.FbDataInternal.packagedLevelId();
    }
    return this.jjh;
  }
  get PackageEntityId() {
    if (!this.Hjh) {
      this.Hjh = true;
      this.Wjh = this.FbDataInternal.packageEntityId();
    }
    return this.Wjh;
  }
  get PackageTree() {
    if (!this.Qjh) {
      this.Qjh = true;
      this.Kjh = new Array();
      var e = this.FbDataInternal.packageTreeLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.packageTree(t, new fb_component_1.EntityPackageNode());
          this.Kjh.push(FbEntityPackageNode_1.FbEntityPackageNode.Create(i));
        }
      }
    }
    return this.Kjh;
  }
}
exports.FbEntityPackageData = FbEntityPackageData;
//# sourceMappingURL=FbEntityPackageData.js.map