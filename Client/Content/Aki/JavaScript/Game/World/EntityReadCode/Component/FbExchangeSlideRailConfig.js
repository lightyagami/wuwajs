"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExchangeSlideRailConfig = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbNextSlideRail_1 = require("./FbNextSlideRail");
class FbExchangeSlideRailConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.FGc = false;
    this.NGc = 0;
    this.Zqc = false;
    this.e2c = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbExchangeSlideRailConfig(t);
    }
  }
  get MaxExchangeDistance() {
    if (!this.FGc) {
      this.FGc = true;
      this.NGc = this.FbDataInternal.maxExchangeDistance();
    }
    return this.NGc;
  }
  get NextRails() {
    if (!this.Zqc) {
      this.Zqc = true;
      this.e2c = new Array();
      var i = this.FbDataInternal.nextRailsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.nextRails(t, new fb_component_1.NextSlideRail());
          this.e2c.push(FbNextSlideRail_1.FbNextSlideRail.Create(e));
        }
      }
    }
    return this.e2c;
  }
}
exports.FbExchangeSlideRailConfig = FbExchangeSlideRailConfig;
//# sourceMappingURL=FbExchangeSlideRailConfig.js.map