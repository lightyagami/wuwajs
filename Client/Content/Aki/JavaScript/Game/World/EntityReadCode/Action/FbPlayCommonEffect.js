"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayCommonEffect = undefined;
const UnionEffectPos2Helper_1 = require("./UnionEffectPos2Helper");
class FbPlayCommonEffect {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Hdh = false;
    this.Xdr = undefined;
    this.Wdh = false;
    this.Qdh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPlayCommonEffect(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Path() {
    if (!this.Hdh) {
      this.Hdh = true;
      this.Xdr = this.FbDataInternal.path();
    }
    return this.Xdr;
  }
  get Pos2() {
    var t;
    var s;
    if (!this.Wdh && (this.Wdh = true, t = this.FbDataInternal.pos2Type(), s = UnionEffectPos2Helper_1.UnionEffectPos2Helper.GetUnionEffectPos2Object(t))) {
      this.Qdh = UnionEffectPos2Helper_1.UnionEffectPos2Helper.ReadUnionEffectPos2(t, this.FbDataInternal.pos2(s));
    }
    return this.Qdh;
  }
}
exports.FbPlayCommonEffect = FbPlayCommonEffect;
//# sourceMappingURL=FbPlayCommonEffect.js.map