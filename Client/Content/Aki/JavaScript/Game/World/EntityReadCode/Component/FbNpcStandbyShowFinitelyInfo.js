"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcStandbyShowFinitelyInfo = undefined;
const FbMontageId_1 = require("../Action/FbMontageId");
const FbIgnoreEntityIdsCollision_1 = require("./FbIgnoreEntityIdsCollision");
class FbNpcStandbyShowFinitelyInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.mgh = false;
    this.Cgh = undefined;
    this.j4h = false;
    this.H4h = undefined;
    this.Qfh = false;
    this.Kfh = 0;
    this.Fph = false;
    this.Nph = 0;
    this.W4h = false;
    this.Q4h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcStandbyShowFinitelyInfo(t);
    }
  }
  get Montage() {
    if (!this.mgh) {
      this.mgh = true;
      this.Cgh = this.FbDataInternal.montage();
    }
    return this.Cgh;
  }
  get RegisteredMontageId() {
    if (!this.j4h) {
      this.j4h = true;
      this.H4h = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.registeredMontageId());
    }
    return this.H4h;
  }
  get FaceExpressionId() {
    if (!this.Qfh) {
      this.Qfh = true;
      this.Kfh = this.FbDataInternal.faceExpressionId();
    }
    return this.Kfh;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get IgnoreEntityCollision() {
    if (!this.W4h) {
      this.W4h = true;
      this.Q4h = FbIgnoreEntityIdsCollision_1.FbIgnoreEntityIdsCollision.Create(this.FbDataInternal.ignoreEntityCollision());
    }
    return this.Q4h;
  }
}
exports.FbNpcStandbyShowFinitelyInfo = FbNpcStandbyShowFinitelyInfo;
//# sourceMappingURL=FbNpcStandbyShowFinitelyInfo.js.map