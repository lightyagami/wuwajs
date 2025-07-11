"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbKeyRotatorConfig = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbKeyRotatorConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Fph = false;
    this.Nph = 0;
    this.zDh = false;
    this.JDh = 0;
    this.dqh = false;
    this.mqh = undefined;
    this.vqh = false;
    this.yqh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbKeyRotatorConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get Cd() {
    if (!this.zDh) {
      this.zDh = true;
      this.JDh = this.FbDataInternal.cd();
    }
    return this.JDh;
  }
  get Curve() {
    if (!this.dqh) {
      this.dqh = true;
      this.mqh = this.FbDataInternal.curve();
    }
    return this.mqh;
  }
  get KeyRotator() {
    if (!this.vqh) {
      this.vqh = true;
      this.yqh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.keyRotator());
    }
    return this.yqh;
  }
}
exports.FbKeyRotatorConfig = FbKeyRotatorConfig;
//# sourceMappingURL=FbKeyRotatorConfig.js.map