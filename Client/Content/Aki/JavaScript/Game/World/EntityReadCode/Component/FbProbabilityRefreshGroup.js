"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbProbabilityRefreshGroup = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbProbabilityRefreshItem_1 = require("./FbProbabilityRefreshItem");
class FbProbabilityRefreshGroup {
  constructor(t) {
    this.FbDataInternal = t;
    this.cBh = false;
    this.uBh = undefined;
    this.dBh = false;
    this.mBh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbProbabilityRefreshGroup(t);
    }
  }
  get CheckOccupation() {
    if (!this.cBh) {
      this.cBh = true;
      this.uBh = this.FbDataInternal.checkOccupation();
    }
    return this.uBh;
  }
  get RefreshItems() {
    if (!this.dBh) {
      this.dBh = true;
      this.mBh = new Array();
      var e = this.FbDataInternal.refreshItemsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.refreshItems(t, new fb_component_1.ProbabilityRefreshItem());
          this.mBh.push(FbProbabilityRefreshItem_1.FbProbabilityRefreshItem.Create(i));
        }
      }
    }
    return this.mBh;
  }
}
exports.FbProbabilityRefreshGroup = FbProbabilityRefreshGroup;
//# sourceMappingURL=FbProbabilityRefreshGroup.js.map