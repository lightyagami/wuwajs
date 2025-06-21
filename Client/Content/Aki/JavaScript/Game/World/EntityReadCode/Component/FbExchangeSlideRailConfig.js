"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbExchangeSlideRailConfig = void 0;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbNextSlideRail_1 = require("./FbNextSlideRail");
class FbExchangeSlideRailConfig {
  constructor(t) {
    this.FbDataInternal = t, this.FGc = !1, this.NGc = 0, this.Zqc = !1, this.e2c = void 0
  }
  static Create(t) {
    if (t) return new FbExchangeSlideRailConfig(t)
  }
  get MaxExchangeDistance() {
    return this.FGc || (this.FGc = !0, this.NGc = this.FbDataInternal.maxExchangeDistance()), this.NGc
  }
  get NextRails() {
    if (!this.Zqc) {
      this.Zqc = !0, this.e2c = new Array;
      var i = this.FbDataInternal.nextRailsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.nextRails(t, new fb_component_1.NextSlideRail);
          this.e2c.push(FbNextSlideRail_1.FbNextSlideRail.Create(e))
        }
    }
    return this.e2c
  }
}
exports.FbExchangeSlideRailConfig = FbExchangeSlideRailConfig;
//# sourceMappingURL=FbExchangeSlideRailConfig.js.map