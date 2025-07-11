"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUndergroundComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbUndergroundStateInfo_1 = require("./FbUndergroundStateInfo");
class FbUndergroundComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Ekh = false;
    this.Ikh = 0;
    this.Tkh = false;
    this.bkh = false;
    this.Lkh = false;
    this.Akh = undefined;
    this.xkh = false;
    this.Rkh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbUndergroundComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get TestState() {
    if (!this.Ekh) {
      this.Ekh = true;
      this.Ikh = this.FbDataInternal.testState();
    }
    return this.Ikh;
  }
  get IsRestartPlayer() {
    if (!this.Tkh) {
      this.Tkh = true;
      this.bkh = this.FbDataInternal.isRestartPlayer();
    }
    return this.bkh;
  }
  get DestroyTag() {
    if (!this.Lkh) {
      this.Lkh = true;
      this.Akh = new Array();
      var s = this.FbDataInternal.destroyTagLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.Akh.push(this.FbDataInternal.destroyTag(t));
        }
      }
    }
    return this.Akh;
  }
  get StateInfo() {
    if (!this.xkh) {
      this.xkh = true;
      this.Rkh = new Array();
      var s = this.FbDataInternal.stateInfoLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          var e = this.FbDataInternal.stateInfo(t, new fb_component_1.UndergroundStateInfo());
          this.Rkh.push(FbUndergroundStateInfo_1.FbUndergroundStateInfo.Create(e));
        }
      }
    }
    return this.Rkh;
  }
}
exports.FbUndergroundComponent = FbUndergroundComponent;
//# sourceMappingURL=FbUndergroundComponent.js.map