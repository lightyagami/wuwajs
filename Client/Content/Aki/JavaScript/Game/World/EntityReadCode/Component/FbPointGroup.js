"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPointGroup = undefined;
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const UnionPointGroupHelper_1 = require("./UnionPointGroupHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPointGroup {
  constructor(t) {
    this.FbDataInternal = t;
    this.G9h = false;
    this.O9h = undefined;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPointGroup(t);
    }
  }
  get GroupConfig() {
    var t;
    var r;
    if (!this.G9h && (this.G9h = true, t = this.FbDataInternal.groupConfigType(), r = UnionPointGroupHelper_1.UnionPointGroupHelper.GetUnionPointGroupObject(t))) {
      this.O9h = UnionPointGroupHelper_1.UnionPointGroupHelper.ReadUnionPointGroup(t, this.FbDataInternal.groupConfig(r));
    }
    return this.O9h;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var r = this.FbDataInternal.pointsLength();
      if (r) {
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.points(t, new fb_var_1.VectorInfo());
          this.VEh.push(FbVectorInfo_1.FbVectorInfo.Create(i));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbPointGroup = FbPointGroup;
//# sourceMappingURL=FbPointGroup.js.map