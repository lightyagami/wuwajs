"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneItemNewSplineMoveTarget = undefined;
class FbSceneItemNewSplineMoveTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.zuh = false;
    this.Juh = false;
  }
  static Create(t) {
    if (t) {
      return new FbSceneItemNewSplineMoveTarget(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get IsLookDir() {
    if (!this.zuh) {
      this.zuh = true;
      this.Juh = this.FbDataInternal.isLookDir();
    }
    return this.Juh;
  }
}
exports.FbSceneItemNewSplineMoveTarget = FbSceneItemNewSplineMoveTarget;
//# sourceMappingURL=FbSceneItemNewSplineMoveTarget.js.map