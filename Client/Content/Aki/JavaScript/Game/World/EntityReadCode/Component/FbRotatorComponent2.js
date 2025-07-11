"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRotatorComponent2 = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbStateRotationConfig_1 = require("./FbStateRotationConfig");
class FbRotatorComponent2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRotatorComponent2(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Config() {
    if (!this.bSh) {
      this.bSh = true;
      this.TAe = new Array();
      var o = this.FbDataInternal.configLength();
      if (o) {
        for (let t = 0; t < o; ++t) {
          var i = this.FbDataInternal.config(t, new fb_component_1.StateRotationConfig());
          this.TAe.push(FbStateRotationConfig_1.FbStateRotationConfig.Create(i));
        }
      }
    }
    return this.TAe;
  }
}
exports.FbRotatorComponent2 = FbRotatorComponent2;
//# sourceMappingURL=FbRotatorComponent2.js.map