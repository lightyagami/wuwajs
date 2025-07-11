"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorRef = undefined;
class FbActorRef {
  constructor(t) {
    this.FbDataInternal = t;
    this.uRh = false;
    this.dRh = undefined;
    this.mRh = false;
    this.CRh = undefined;
    this.gRh = false;
    this.fRh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbActorRef(t);
    }
  }
  get ActorName() {
    if (!this.uRh) {
      this.uRh = true;
      this.dRh = this.FbDataInternal.actorName();
    }
    return this.dRh;
  }
  get PathName() {
    if (!this.mRh) {
      this.mRh = true;
      this.CRh = this.FbDataInternal.pathName();
    }
    return this.CRh;
  }
  get Platform() {
    if (!this.gRh) {
      this.gRh = true;
      this.fRh = this.FbDataInternal.platform();
    }
    return this.fRh;
  }
}
exports.FbActorRef = FbActorRef;
//# sourceMappingURL=FbActorRef.js.map