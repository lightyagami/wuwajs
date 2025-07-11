"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcStandbySit = undefined;
const FbMontageId_1 = require("../Action/FbMontageId");
class FbNpcStandbySit {
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
    this.ISh = false;
    this.TSh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbNpcStandbySit(t);
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
  get PosEntityId() {
    if (!this.ISh) {
      this.ISh = true;
      this.TSh = this.FbDataInternal.posEntityId();
    }
    return this.TSh;
  }
}
exports.FbNpcStandbySit = FbNpcStandbySit;
//# sourceMappingURL=FbNpcStandbySit.js.map