"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorLookAt = undefined;
const UnionActorLookAtDataHelper_1 = require("./UnionActorLookAtDataHelper");
class FbActorLookAt {
  constructor(t) {
    this.FbDataInternal = t;
    this.xfh = false;
    this.Y_i = 0;
    this.ldh = false;
    this.NHo = undefined;
    this.Gfh = false;
    this.Ofh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbActorLookAt(t);
    }
  }
  get ActorIndex() {
    if (!this.xfh) {
      this.xfh = true;
      this.Y_i = this.FbDataInternal.actorIndex();
    }
    return this.Y_i;
  }
  get Target() {
    var t;
    var o;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), o = UnionActorLookAtDataHelper_1.UnionActorLookAtDataHelper.GetUnionActorLookAtDataObject(t))) {
      this.NHo = UnionActorLookAtDataHelper_1.UnionActorLookAtDataHelper.ReadUnionActorLookAtData(t, this.FbDataInternal.target(o));
    }
    return this.NHo;
  }
  get DelayTime() {
    if (!this.Gfh) {
      this.Gfh = true;
      this.Ofh = this.FbDataInternal.delayTime();
    }
    return this.Ofh;
  }
}
exports.FbActorLookAt = FbActorLookAt;
//# sourceMappingURL=FbActorLookAt.js.map