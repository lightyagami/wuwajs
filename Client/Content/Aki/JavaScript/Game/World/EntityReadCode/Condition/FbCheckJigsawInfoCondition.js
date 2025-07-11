"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckJigsawInfoCondition = undefined;
const UnionCheckJigsawInfoHelper_1 = require("./UnionCheckJigsawInfoHelper");
class FbCheckJigsawInfoCondition {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.Zzh = false;
    this.eJh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbCheckJigsawInfoCondition(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get JigsawCondition() {
    var i;
    var t;
    if (!this.Zzh && (this.Zzh = true, i = this.FbDataInternal.jigsawConditionType(), t = UnionCheckJigsawInfoHelper_1.UnionCheckJigsawInfoHelper.GetUnionCheckJigsawInfoObject(i))) {
      this.eJh = UnionCheckJigsawInfoHelper_1.UnionCheckJigsawInfoHelper.ReadUnionCheckJigsawInfo(i, this.FbDataInternal.jigsawCondition(t));
    }
    return this.eJh;
  }
}
exports.FbCheckJigsawInfoCondition = FbCheckJigsawInfoCondition;
//# sourceMappingURL=FbCheckJigsawInfoCondition.js.map