"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcStandbyShowLooply = undefined;
const FbMontageId_1 = require("../Action/FbMontageId");
const FbIgnoreEntityIdsCollision_1 = require("./FbIgnoreEntityIdsCollision");
class FbNpcStandbyShowLooply {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mgh = false;
    this.Cgh = undefined;
    this.j4h = false;
    this.H4h = undefined;
    this.Qfh = false;
    this.Kfh = 0;
    this.W4h = false;
    this.Q4h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcStandbyShowLooply(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
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
  get IgnoreEntityCollision() {
    if (!this.W4h) {
      this.W4h = true;
      this.Q4h = FbIgnoreEntityIdsCollision_1.FbIgnoreEntityIdsCollision.Create(this.FbDataInternal.ignoreEntityCollision());
    }
    return this.Q4h;
  }
}
exports.FbNpcStandbyShowLooply = FbNpcStandbyShowLooply;
//# sourceMappingURL=FbNpcStandbyShowLooply.js.map