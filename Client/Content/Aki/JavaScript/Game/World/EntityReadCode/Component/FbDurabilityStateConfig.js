"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDurabilityStateConfig = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbDurabilityState_1 = require("./FbDurabilityState");
class FbDurabilityStateConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.y3h = false;
    this.S3h = false;
    this.M3h = false;
    this.E3h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDurabilityStateConfig(t);
    }
  }
  get NonDestructable() {
    if (!this.y3h) {
      this.y3h = true;
      this.S3h = this.FbDataInternal.nonDestructable();
    }
    return this.S3h;
  }
  get DurabilityStates() {
    if (!this.M3h) {
      this.M3h = true;
      this.E3h = new Array();
      var i = this.FbDataInternal.durabilityStatesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.durabilityStates(t, new fb_component_1.DurabilityState());
          this.E3h.push(FbDurabilityState_1.FbDurabilityState.Create(e));
        }
      }
    }
    return this.E3h;
  }
}
exports.FbDurabilityStateConfig = FbDurabilityStateConfig;
//# sourceMappingURL=FbDurabilityStateConfig.js.map