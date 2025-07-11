"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorInitialMontage = undefined;
const FbMontageId_1 = require("./FbMontageId");
class FbActorInitialMontage {
  constructor(t) {
    this.FbDataInternal = t;
    this.Rfh = false;
    this.wfh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbActorInitialMontage(t);
    }
  }
  get MontageId() {
    if (!this.Rfh) {
      this.Rfh = true;
      this.wfh = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.montageId());
    }
    return this.wfh;
  }
}
exports.FbActorInitialMontage = FbActorInitialMontage;
//# sourceMappingURL=FbActorInitialMontage.js.map