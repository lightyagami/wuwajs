"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneItemAiPatrolByGameTime = undefined;
class FbSceneItemAiPatrolByGameTime {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.DYh = false;
    this.a$o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSceneItemAiPatrolByGameTime(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Spline() {
    if (!this.DYh) {
      this.DYh = true;
      this.a$o = this.FbDataInternal.spline();
    }
    return this.a$o;
  }
}
exports.FbSceneItemAiPatrolByGameTime = FbSceneItemAiPatrolByGameTime;
//# sourceMappingURL=FbSceneItemAiPatrolByGameTime.js.map