"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelAIComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbLevelAIState_1 = require("./FbLevelAIState");
class FbLevelAIComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Dxh = false;
    this.Bxh = undefined;
    this.JRh = false;
    this.ZRh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLevelAIComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get States() {
    if (!this.Dxh) {
      this.Dxh = true;
      this.Bxh = new Array();
      var e = this.FbDataInternal.statesLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var s = this.FbDataInternal.states(t, new fb_component_1.LevelAIState());
          this.Bxh.push(FbLevelAIState_1.FbLevelAIState.Create(s));
        }
      }
    }
    return this.Bxh;
  }
  get BtTreeAsset() {
    if (!this.JRh) {
      this.JRh = true;
      this.ZRh = this.FbDataInternal.btTreeAsset();
    }
    return this.ZRh;
  }
}
exports.FbLevelAIComponent = FbLevelAIComponent;
//# sourceMappingURL=FbLevelAIComponent.js.map