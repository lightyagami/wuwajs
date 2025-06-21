"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbSetAreaTimeState = void 0;
const UnionSetAreaTimeTypeHelper_1 = require("./UnionSetAreaTimeTypeHelper");
class FbSetAreaTimeState {
  constructor(e) {
    this.FbDataInternal = e, this.t0c = !1, this.i0c = void 0
  }
  static Create(e) {
    if (e) return new FbSetAreaTimeState(e)
  }
  get SetAreaTimeConfig() {
    var e, t;
    return !this.t0c && (this.t0c = !0, e = this.FbDataInternal.setAreaTimeConfigType(), t = UnionSetAreaTimeTypeHelper_1.UnionSetAreaTimeTypeHelper.GetUnionSetAreaTimeTypeObject(e)) && (this.i0c = UnionSetAreaTimeTypeHelper_1.UnionSetAreaTimeTypeHelper.ReadUnionSetAreaTimeType(e, this.FbDataInternal.setAreaTimeConfig(t))), this.i0c
  }
}
exports.FbSetAreaTimeState = FbSetAreaTimeState;
//# sourceMappingURL=FbSetAreaTimeState.js.map