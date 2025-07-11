"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcNewSplineMoveTarget = undefined;
class FbNpcNewSplineMoveTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ioc = false;
    this.roc = 0;
  }
  static Create(t) {
    if (t) {
      return new FbNpcNewSplineMoveTarget(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get NpcId() {
    if (!this.ioc) {
      this.ioc = true;
      this.roc = this.FbDataInternal.npcId();
    }
    return this.roc;
  }
}
exports.FbNpcNewSplineMoveTarget = FbNpcNewSplineMoveTarget;
//# sourceMappingURL=FbNpcNewSplineMoveTarget.js.map