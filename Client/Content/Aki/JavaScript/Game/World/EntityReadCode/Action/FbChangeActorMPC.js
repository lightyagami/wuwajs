"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeActorMPC = undefined;
class FbChangeActorMPC {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.qLh = false;
    this.kLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeActorMPC(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MpcData() {
    if (!this.qLh) {
      this.qLh = true;
      this.kLh = this.FbDataInternal.mpcData();
    }
    return this.kLh;
  }
}
exports.FbChangeActorMPC = FbChangeActorMPC;
//# sourceMappingURL=FbChangeActorMPC.js.map