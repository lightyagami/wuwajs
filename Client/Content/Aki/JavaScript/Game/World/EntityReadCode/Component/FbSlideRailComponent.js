"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbSlideRailComponent = void 0;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbExchangeSlideRailConfig_1 = require("./FbExchangeSlideRailConfig");
class FbSlideRailComponent {
  constructor(i) {
    this.FbDataInternal = i, this.q_h = !1, this.k_h = !1, this.n2c = !1, this.s2c = 0, this.a2c = !1, this.h2c = 0, this.l2c = !1, this._2c = void 0
  }
  static Create(i) {
    if (i) return new FbSlideRailComponent(i)
  }
  get Disabled() {
    return this.q_h || (this.q_h = !0, this.k_h = this.FbDataInternal.disabled()), this.k_h
  }
  get SlideSpeed() {
    return this.n2c || (this.n2c = !0, this.s2c = this.FbDataInternal.slideSpeed()), this.s2c
  }
  get RailSplineEntityId() {
    return this.a2c || (this.a2c = !0, this.h2c = this.FbDataInternal.railSplineEntityId()), this.h2c
  }
  get ExchangeRailConfigs() {
    if (!this.l2c) {
      this.l2c = !0, this._2c = new Array;
      var t = this.FbDataInternal.exchangeRailConfigsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.exchangeRailConfigs(i, new fb_component_1.ExchangeSlideRailConfig);
          this._2c.push(FbExchangeSlideRailConfig_1.FbExchangeSlideRailConfig.Create(e))
        }
    }
    return this._2c
  }
}
exports.FbSlideRailComponent = FbSlideRailComponent;
//# sourceMappingURL=FbSlideRailComponent.js.map