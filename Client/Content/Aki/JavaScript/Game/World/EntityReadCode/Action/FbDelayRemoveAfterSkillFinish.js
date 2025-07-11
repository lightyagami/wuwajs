"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDelayRemoveAfterSkillFinish = undefined;
class FbDelayRemoveAfterSkillFinish {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbDelayRemoveAfterSkillFinish(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbDelayRemoveAfterSkillFinish = FbDelayRemoveAfterSkillFinish;
//# sourceMappingURL=FbDelayRemoveAfterSkillFinish.js.map