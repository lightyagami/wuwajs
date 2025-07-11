"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTargetGearGroupComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbTargetGearGroupConfig_1 = require("./FbTargetGearGroupConfig");
class FbTargetGearGroupComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.u_h = false;
    this.f8o = undefined;
    this.AOh = false;
    this.xOh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTargetGearGroupComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get GroupConfigs() {
    if (!this.AOh) {
      this.AOh = true;
      this.xOh = new Array();
      var e = this.FbDataInternal.groupConfigsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.groupConfigs(t, new fb_component_1.TargetGearGroupConfig());
          this.xOh.push(FbTargetGearGroupConfig_1.FbTargetGearGroupConfig.Create(r));
        }
      }
    }
    return this.xOh;
  }
}
exports.FbTargetGearGroupComponent = FbTargetGearGroupComponent;
//# sourceMappingURL=FbTargetGearGroupComponent.js.map