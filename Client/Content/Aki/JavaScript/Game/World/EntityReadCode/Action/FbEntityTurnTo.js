"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityTurnTo = undefined;
const UnionActorTurnToDataHelper_1 = require("./UnionActorTurnToDataHelper");
class FbEntityTurnTo {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.ldh = false;
    this.NHo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityTurnTo(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Target() {
    var t;
    var r;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), r = UnionActorTurnToDataHelper_1.UnionActorTurnToDataHelper.GetUnionActorTurnToDataObject(t))) {
      this.NHo = UnionActorTurnToDataHelper_1.UnionActorTurnToDataHelper.ReadUnionActorTurnToData(t, this.FbDataInternal.target(r));
    }
    return this.NHo;
  }
}
exports.FbEntityTurnTo = FbEntityTurnTo;
//# sourceMappingURL=FbEntityTurnTo.js.map