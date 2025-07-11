"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbElementDamage = undefined;
class FbElementDamage {
  constructor(t) {
    this.FbDataInternal = t;
    this.I3h = false;
    this.T3h = 0;
    this.F3h = false;
    this.N3h = 0;
    this.V3h = false;
    this.j3h = 0;
    this.H3h = false;
    this.W3h = 0;
    this.Q3h = false;
    this.K3h = 0;
    this.$3h = false;
    this.X3h = 0;
    this.Y3h = false;
    this.z3h = 0;
    this.J3h = false;
    this.Z3h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbElementDamage(t);
    }
  }
  get DefaultValue() {
    if (!this.I3h) {
      this.I3h = true;
      this.T3h = this.FbDataInternal.defaultValue();
    }
    return this.T3h;
  }
  get Physics() {
    if (!this.F3h) {
      this.F3h = true;
      this.N3h = this.FbDataInternal.physics();
    }
    return this.N3h;
  }
  get Ice() {
    if (!this.V3h) {
      this.V3h = true;
      this.j3h = this.FbDataInternal.ice();
    }
    return this.j3h;
  }
  get Fire() {
    if (!this.H3h) {
      this.H3h = true;
      this.W3h = this.FbDataInternal.fire();
    }
    return this.W3h;
  }
  get Thunder() {
    if (!this.Q3h) {
      this.Q3h = true;
      this.K3h = this.FbDataInternal.thunder();
    }
    return this.K3h;
  }
  get Wind() {
    if (!this.$3h) {
      this.$3h = true;
      this.X3h = this.FbDataInternal.wind();
    }
    return this.X3h;
  }
  get Light() {
    if (!this.Y3h) {
      this.Y3h = true;
      this.z3h = this.FbDataInternal.light();
    }
    return this.z3h;
  }
  get Dark() {
    if (!this.J3h) {
      this.J3h = true;
      this.Z3h = this.FbDataInternal.dark();
    }
    return this.Z3h;
  }
}
exports.FbElementDamage = FbElementDamage;
//# sourceMappingURL=FbElementDamage.js.map