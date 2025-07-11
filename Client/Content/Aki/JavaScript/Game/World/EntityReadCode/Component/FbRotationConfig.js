"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRotationConfig = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbRotationConfig {
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
    this.Cqh = false;
    this.gqh = undefined;
    this.fqh = false;
    this.pqh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbRotationConfig(t);
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
  get Axis() {
    if (!this.Cqh) {
      this.Cqh = true;
      this.gqh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.axis());
    }
    return this.gqh;
  }
  get Angle() {
    if (!this.fqh) {
      this.fqh = true;
      this.pqh = this.FbDataInternal.angle();
    }
    return this.pqh;
  }
}
exports.FbRotationConfig = FbRotationConfig;
//# sourceMappingURL=FbRotationConfig.js.map