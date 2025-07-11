"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemoveTrialFollowShooter = undefined;
class FbRemoveTrialFollowShooter {
  constructor(t) {
    this.FbDataInternal = t;
    this.tgh = false;
    this.FFe = 0;
  }
  static Create(t) {
    if (t) {
      return new FbRemoveTrialFollowShooter(t);
    }
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
}
exports.FbRemoveTrialFollowShooter = FbRemoveTrialFollowShooter;
//# sourceMappingURL=FbRemoveTrialFollowShooter.js.map