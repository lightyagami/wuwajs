"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSearchTargetCfg = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityAngleWeight_1 = require("./FbEntityAngleWeight");
const FbEntityCategoryWeight_1 = require("./FbEntityCategoryWeight");
class FbSearchTargetCfg {
  constructor(t) {
    this.FbDataInternal = t;
    this._2h = false;
    this.c2h = undefined;
    this.u2h = false;
    this.d2h = undefined;
    this.Kn_ = false;
    this.$n_ = false;
  }
  static Create(t) {
    if (t) {
      return new FbSearchTargetCfg(t);
    }
  }
  get AngleWeight() {
    if (!this._2h) {
      this._2h = true;
      this.c2h = new Array();
      var e = this.FbDataInternal.angleWeightLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.angleWeight(t, new fb_component_1.EntityAngleWeight());
          this.c2h.push(FbEntityAngleWeight_1.FbEntityAngleWeight.Create(i));
        }
      }
    }
    return this.c2h;
  }
  get LockConditions() {
    if (!this.u2h) {
      this.u2h = true;
      this.d2h = new Array();
      var e = this.FbDataInternal.lockConditionsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.lockConditions(t, new fb_component_1.EntityCategoryWeight());
          this.d2h.push(FbEntityCategoryWeight_1.FbEntityCategoryWeight.Create(i));
        }
      }
    }
    return this.d2h;
  }
  get IgnoreDistanceWeight() {
    if (!this.Kn_) {
      this.Kn_ = true;
      this.$n_ = this.FbDataInternal.ignoreDistanceWeight();
    }
    return this.$n_;
  }
}
exports.FbSearchTargetCfg = FbSearchTargetCfg;
//# sourceMappingURL=FbSearchTargetCfg.js.map