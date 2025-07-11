"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportTransitionInSeamlessType = undefined;
const FbFloorSettings_1 = require("./FbFloorSettings");
class FbTeleportTransitionInSeamlessType {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.q0h = false;
    this.k0h = undefined;
    this.G0h = false;
    this.O0h = 0;
    this.F0h = false;
    this.N0h = 0;
    this.V0h = false;
    this.j0h = 0;
    this.cc1 = false;
    this.uc1 = undefined;
    this.H0h = false;
    this.W0h = undefined;
    this.dc1 = false;
    this.mc1 = false;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportTransitionInSeamlessType(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EffectDaPath() {
    if (!this.q0h) {
      this.q0h = true;
      this.k0h = this.FbDataInternal.effectDaPath();
    }
    return this.k0h;
  }
  get LeastTime() {
    if (!this.G0h) {
      this.G0h = true;
      this.O0h = this.FbDataInternal.leastTime();
    }
    return this.O0h;
  }
  get EffectExpandTime() {
    if (!this.F0h) {
      this.F0h = true;
      this.N0h = this.FbDataInternal.effectExpandTime();
    }
    return this.N0h;
  }
  get EffectCollapseTime() {
    if (!this.V0h) {
      this.V0h = true;
      this.j0h = this.FbDataInternal.effectCollapseTime();
    }
    return this.j0h;
  }
  get TransitionWeatherDaPath() {
    if (!this.cc1) {
      this.cc1 = true;
      this.uc1 = this.FbDataInternal.transitionWeatherDaPath();
    }
    return this.uc1;
  }
  get FloorSettings() {
    if (!this.H0h) {
      this.H0h = true;
      this.W0h = FbFloorSettings_1.FbFloorSettings.Create(this.FbDataInternal.floorSettings());
    }
    return this.W0h;
  }
  get IsTeleportInPlace() {
    if (!this.dc1) {
      this.dc1 = true;
      this.mc1 = this.FbDataInternal.isTeleportInPlace();
    }
    return this.mc1;
  }
}
exports.FbTeleportTransitionInSeamlessType = FbTeleportTransitionInSeamlessType;
//# sourceMappingURL=FbTeleportTransitionInSeamlessType.js.map