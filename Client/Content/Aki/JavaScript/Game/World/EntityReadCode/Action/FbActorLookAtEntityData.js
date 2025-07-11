"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorLookAtEntityData = undefined;
class FbActorLookAtEntityData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yfh = false;
    this.d3l = false;
    this.a_h = false;
    this.I9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbActorLookAtEntityData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Lock() {
    if (!this.Yfh) {
      this.Yfh = true;
      this.d3l = this.FbDataInternal.lock();
    }
    return this.d3l;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
}
exports.FbActorLookAtEntityData = FbActorLookAtEntityData;
//# sourceMappingURL=FbActorLookAtEntityData.js.map