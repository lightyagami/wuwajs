"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbChargeSlashControl = void 0;
class FbChargeSlashControl {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Mu1 = !1, this.Eu1 = 0, this.Iu1 = !1, this.Tu1 = void 0
  }
  static Create(t) {
    if (t) return new FbChargeSlashControl(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get UpHeight() {
    return this.Mu1 || (this.Mu1 = !0, this.Eu1 = this.FbDataInternal.upHeight()), this.Eu1
  }
  get UpCurvePath() {
    return this.Iu1 || (this.Iu1 = !0, this.Tu1 = this.FbDataInternal.upCurvePath()), this.Tu1
  }
}
exports.FbChargeSlashControl = FbChargeSlashControl;
//# sourceMappingURL=FbChargeSlashControl.js.map