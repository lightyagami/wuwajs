"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddTrialFollowShooter = undefined;
const FbActiveRange_1 = require("./FbActiveRange");
class FbAddTrialFollowShooter {
  constructor(t) {
    this.FbDataInternal = t;
    this.tgh = false;
    this.FFe = 0;
    this.gEh = false;
    this.fEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAddTrialFollowShooter(t);
    }
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get ActiveRange() {
    if (!this.gEh) {
      this.gEh = true;
      this.fEh = FbActiveRange_1.FbActiveRange.Create(this.FbDataInternal.activeRange());
    }
    return this.fEh;
  }
}
exports.FbAddTrialFollowShooter = FbAddTrialFollowShooter;
//# sourceMappingURL=FbAddTrialFollowShooter.js.map