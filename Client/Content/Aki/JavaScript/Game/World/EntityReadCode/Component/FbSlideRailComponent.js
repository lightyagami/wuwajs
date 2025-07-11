"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSlideRailComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbExchangeSlideRailConfig_1 = require("./FbExchangeSlideRailConfig");
class FbSlideRailComponent {
  constructor(i) {
    this.FbDataInternal = i;
    this.q_h = false;
    this.k_h = false;
    this.n2c = false;
    this.s2c = 0;
    this.a2c = false;
    this.h2c = 0;
    this.l2c = false;
    this._2c = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbSlideRailComponent(i);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get SlideSpeed() {
    if (!this.n2c) {
      this.n2c = true;
      this.s2c = this.FbDataInternal.slideSpeed();
    }
    return this.s2c;
  }
  get RailSplineEntityId() {
    if (!this.a2c) {
      this.a2c = true;
      this.h2c = this.FbDataInternal.railSplineEntityId();
    }
    return this.h2c;
  }
  get ExchangeRailConfigs() {
    if (!this.l2c) {
      this.l2c = true;
      this._2c = new Array();
      var t = this.FbDataInternal.exchangeRailConfigsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.exchangeRailConfigs(i, new fb_component_1.ExchangeSlideRailConfig());
          this._2c.push(FbExchangeSlideRailConfig_1.FbExchangeSlideRailConfig.Create(e));
        }
      }
    }
    return this._2c;
  }
}
exports.FbSlideRailComponent = FbSlideRailComponent;
//# sourceMappingURL=FbSlideRailComponent.js.map