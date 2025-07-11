"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInhalationAbilityComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbInhalationConfig_1 = require("./FbInhalationConfig");
class FbInhalationAbilityComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.JXh = false;
    this.ZXh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInhalationAbilityComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get InhalationConfigs() {
    if (!this.JXh) {
      this.JXh = true;
      this.ZXh = new Array();
      var i = this.FbDataInternal.inhalationConfigsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.inhalationConfigs(t, new fb_component_1.InhalationConfig());
          this.ZXh.push(FbInhalationConfig_1.FbInhalationConfig.Create(n));
        }
      }
    }
    return this.ZXh;
  }
}
exports.FbInhalationAbilityComponent = FbInhalationAbilityComponent;
//# sourceMappingURL=FbInhalationAbilityComponent.js.map