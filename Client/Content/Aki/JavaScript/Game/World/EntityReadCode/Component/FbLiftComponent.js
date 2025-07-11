"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLiftComponent = undefined;
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const FbAutoConfig_1 = require("./FbAutoConfig");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbLiftComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.U6h = false;
    this.D6h = 0;
    this.B6h = false;
    this.q6h = undefined;
    this.k6h = false;
    this.G6h = undefined;
    this.XEh = false;
    this.YEh = 0;
    this.O6h = false;
    this.F6h = false;
    this.N6h = false;
    this.V6h = 0;
    this.j6h = false;
    this.H6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLiftComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get InitialFloor() {
    if (!this.U6h) {
      this.U6h = true;
      this.D6h = this.FbDataInternal.initialFloor();
    }
    return this.D6h;
  }
  get StayPositions() {
    if (!this.B6h) {
      this.B6h = true;
      this.q6h = new Array();
      var i = this.FbDataInternal.stayPositionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stayPositions(t, new fb_var_1.VectorInfo());
          this.q6h.push(FbVectorInfo_1.FbVectorInfo.Create(s));
        }
      }
    }
    return this.q6h;
  }
  get AutoConfig() {
    if (!this.k6h) {
      this.k6h = true;
      this.G6h = FbAutoConfig_1.FbAutoConfig.Create(this.FbDataInternal.autoConfig());
    }
    return this.G6h;
  }
  get MaxSpeed() {
    if (!this.XEh) {
      this.XEh = true;
      this.YEh = this.FbDataInternal.maxSpeed();
    }
    return this.YEh;
  }
  get UniformMovement() {
    if (!this.O6h) {
      this.O6h = true;
      this.F6h = this.FbDataInternal.uniformMovement();
    }
    return this.F6h;
  }
  get TurnTime() {
    if (!this.N6h) {
      this.N6h = true;
      this.V6h = this.FbDataInternal.turnTime();
    }
    return this.V6h;
  }
  get SafePoint() {
    if (!this.j6h) {
      this.j6h = true;
      this.H6h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.safePoint());
    }
    return this.H6h;
  }
}
exports.FbLiftComponent = FbLiftComponent;
//# sourceMappingURL=FbLiftComponent.js.map