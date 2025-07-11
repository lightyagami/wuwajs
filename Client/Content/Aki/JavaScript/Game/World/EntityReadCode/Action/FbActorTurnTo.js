"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorTurnTo = undefined;
const UnionActorTurnToDataHelper_1 = require("./UnionActorTurnToDataHelper");
class FbActorTurnTo {
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
      return new FbActorTurnTo(t);
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
    var r;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), r = UnionActorTurnToDataHelper_1.UnionActorTurnToDataHelper.GetUnionActorTurnToDataObject(t))) {
      this.NHo = UnionActorTurnToDataHelper_1.UnionActorTurnToDataHelper.ReadUnionActorTurnToData(t, this.FbDataInternal.target(r));
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
exports.FbActorTurnTo = FbActorTurnTo;
//# sourceMappingURL=FbActorTurnTo.js.map