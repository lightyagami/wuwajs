"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAccelerateSkiConfig = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbAccelerateSkiConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ldh = false;
    this.NHo = undefined;
    this.I_h = false;
    this.y6o = 0;
    this.Vbh = false;
    this.jbh = 0;
    this.KEh = false;
    this.$Eh = 0;
    this.Hbh = false;
    this.Wbh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAccelerateSkiConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Target() {
    var t;
    var i;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), i = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.NHo = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.target(i));
    }
    return this.NHo;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
  get LimitSpeed() {
    if (!this.Vbh) {
      this.Vbh = true;
      this.jbh = this.FbDataInternal.limitSpeed();
    }
    return this.jbh;
  }
  get Acceleration() {
    if (!this.KEh) {
      this.KEh = true;
      this.$Eh = this.FbDataInternal.acceleration();
    }
    return this.$Eh;
  }
  get InstantSpeed() {
    if (!this.Hbh) {
      this.Hbh = true;
      this.Wbh = this.FbDataInternal.instantSpeed();
    }
    return this.Wbh;
  }
}
exports.FbAccelerateSkiConfig = FbAccelerateSkiConfig;
//# sourceMappingURL=FbAccelerateSkiConfig.js.map