"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorLookAtOtherActor = undefined;
class FbActorLookAtOtherActor {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yfh = false;
    this.d3l = false;
    this.xfh = false;
    this.Y_i = 0;
  }
  static Create(t) {
    if (t) {
      return new FbActorLookAtOtherActor(t);
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
  get ActorIndex() {
    if (!this.xfh) {
      this.xfh = true;
      this.Y_i = this.FbDataInternal.actorIndex();
    }
    return this.Y_i;
  }
}
exports.FbActorLookAtOtherActor = FbActorLookAtOtherActor;
//# sourceMappingURL=FbActorLookAtOtherActor.js.map