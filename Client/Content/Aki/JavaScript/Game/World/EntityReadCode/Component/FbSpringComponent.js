"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpringComponent = undefined;
const FbSettingSpringDir_1 = require("./FbSettingSpringDir");
class FbSpringComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Tqh = false;
    this.bqh = false;
    this.Lqh = false;
    this.Aqh = false;
    this.xqh = false;
    this.Rqh = undefined;
    this.wqh = false;
    this.Pqh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSpringComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get IsNormalSpring() {
    if (!this.Tqh) {
      this.Tqh = true;
      this.bqh = this.FbDataInternal.isNormalSpring();
    }
    return this.bqh;
  }
  get IsHitNormalSpring() {
    if (!this.Lqh) {
      this.Lqh = true;
      this.Aqh = this.FbDataInternal.isHitNormalSpring();
    }
    return this.Aqh;
  }
  get SettingDir() {
    if (!this.xqh) {
      this.xqh = true;
      this.Rqh = FbSettingSpringDir_1.FbSettingSpringDir.Create(this.FbDataInternal.settingDir());
    }
    return this.Rqh;
  }
  get SpringPow() {
    if (!this.wqh) {
      this.wqh = true;
      this.Pqh = this.FbDataInternal.springPow();
    }
    return this.Pqh;
  }
}
exports.FbSpringComponent = FbSpringComponent;
//# sourceMappingURL=FbSpringComponent.js.map