"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCatapultParam = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCatapultParam {
  constructor(t) {
    this.FbDataInternal = t;
    this.pSh = false;
    this.vSh = undefined;
    this.ySh = false;
    this.SSh = undefined;
    this.MSh = false;
    this.ESh = 0;
    this.Fph = false;
    this.Nph = 0;
    this.gSh = false;
    this.fSh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCatapultParam(t);
    }
  }
  get P1() {
    if (!this.pSh) {
      this.pSh = true;
      this.vSh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.p1());
    }
    return this.vSh;
  }
  get P2() {
    if (!this.ySh) {
      this.ySh = true;
      this.SSh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.p2());
    }
    return this.SSh;
  }
  get Gravity() {
    if (!this.MSh) {
      this.MSh = true;
      this.ESh = this.FbDataInternal.gravity();
    }
    return this.ESh;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get MotionCurve() {
    if (!this.gSh) {
      this.gSh = true;
      this.fSh = this.FbDataInternal.motionCurve();
    }
    return this.fSh;
  }
}
exports.FbCatapultParam = FbCatapultParam;
//# sourceMappingURL=FbCatapultParam.js.map