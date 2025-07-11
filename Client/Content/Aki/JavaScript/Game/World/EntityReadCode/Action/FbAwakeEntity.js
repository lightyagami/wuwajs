"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAwakeEntity = undefined;
const UnionAwakePosOptionHelper_1 = require("./UnionAwakePosOptionHelper");
class FbAwakeEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.dph = false;
    this.Cqn = undefined;
    this.X11 = false;
    this.Y11 = false;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAwakeEntity(t);
    }
  }
  get Position() {
    var t;
    var i;
    if (!this.dph && (this.dph = true, t = this.FbDataInternal.positionType(), i = UnionAwakePosOptionHelper_1.UnionAwakePosOptionHelper.GetUnionAwakePosOptionObject(t))) {
      this.Cqn = UnionAwakePosOptionHelper_1.UnionAwakePosOptionHelper.ReadUnionAwakePosOption(t, this.FbDataInternal.position(i));
    }
    return this.Cqn;
  }
  get IsSnap() {
    if (!this.X11) {
      this.X11 = true;
      this.Y11 = this.FbDataInternal.isSnap();
    }
    return this.Y11;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
}
exports.FbAwakeEntity = FbAwakeEntity;
//# sourceMappingURL=FbAwakeEntity.js.map