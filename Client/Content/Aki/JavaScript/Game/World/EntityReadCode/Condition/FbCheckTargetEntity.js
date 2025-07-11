"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckTargetEntity = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCheckTargetEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Hch = false;
    this.Wch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckTargetEntity(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetEntity() {
    var t;
    var e;
    if (!this.Hch && (this.Hch = true, t = this.FbDataInternal.targetEntityType(), e = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.Wch = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.targetEntity(e));
    }
    return this.Wch;
  }
}
exports.FbCheckTargetEntity = FbCheckTargetEntity;
//# sourceMappingURL=FbCheckTargetEntity.js.map