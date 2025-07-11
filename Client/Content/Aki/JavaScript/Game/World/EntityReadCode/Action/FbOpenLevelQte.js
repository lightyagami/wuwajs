"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenLevelQte = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbOpenLevelQte {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.LSh = false;
    this.ASh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOpenLevelQte(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get LevelQteEntity() {
    var t;
    var e;
    if (!this.LSh && (this.LSh = true, t = this.FbDataInternal.levelQteEntityType(), e = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.ASh = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.levelQteEntity(e));
    }
    return this.ASh;
  }
}
exports.FbOpenLevelQte = FbOpenLevelQte;
//# sourceMappingURL=FbOpenLevelQte.js.map