"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayEffect = undefined;
const UnionPos2Helper_1 = require("./UnionPos2Helper");
class FbPlayEffect {
  constructor(t) {
    this.FbDataInternal = t;
    this.Hdh = false;
    this.Xdr = undefined;
    this.Wdh = false;
    this.Qdh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPlayEffect(t);
    }
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
    if (!this.Wdh && (this.Wdh = true, t = this.FbDataInternal.pos2Type(), s = UnionPos2Helper_1.UnionPos2Helper.GetUnionPos2Object(t))) {
      this.Qdh = UnionPos2Helper_1.UnionPos2Helper.ReadUnionPos2(t, this.FbDataInternal.pos2(s));
    }
    return this.Qdh;
  }
}
exports.FbPlayEffect = FbPlayEffect;
//# sourceMappingURL=FbPlayEffect.js.map