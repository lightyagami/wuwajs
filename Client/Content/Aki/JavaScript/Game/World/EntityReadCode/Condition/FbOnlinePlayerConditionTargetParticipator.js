"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOnlinePlayerConditionTargetParticipator = undefined;
class FbOnlinePlayerConditionTargetParticipator {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.dzh = false;
    this.mzh = false;
  }
  static Create(t) {
    if (t) {
      return new FbOnlinePlayerConditionTargetParticipator(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AnyPlayer() {
    if (!this.dzh) {
      this.dzh = true;
      this.mzh = this.FbDataInternal.anyPlayer();
    }
    return this.mzh;
  }
}
exports.FbOnlinePlayerConditionTargetParticipator = FbOnlinePlayerConditionTargetParticipator;
//# sourceMappingURL=FbOnlinePlayerConditionTargetParticipator.js.map