"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbNpcAwakeShow = void 0;
const FbMontageId_1 = require("../Action/FbMontageId");
class FbNpcAwakeShow {
  constructor(t) {
    this.FbDataInternal = t, this.j4h = !1, this.H4h = void 0, this.L6h = !1, this.A6h = void 0
  }
  static Create(t) {
    if (t) return new FbNpcAwakeShow(t)
  }
  get RegisteredMontageId() {
    return this.j4h || (this.j4h = !0, this.H4h = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.registeredMontageId())), this.H4h
  }
  get MaterialDa() {
    return this.L6h || (this.L6h = !0, this.A6h = this.FbDataInternal.materialDa()), this.A6h
  }
}
exports.FbNpcAwakeShow = FbNpcAwakeShow;
//# sourceMappingURL=FbNpcAwakeShow.js.map