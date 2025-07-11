"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetAreaTimeState = undefined;
const UnionSetAreaTimeTypeHelper_1 = require("./UnionSetAreaTimeTypeHelper");
class FbSetAreaTimeState {
  constructor(e) {
    this.FbDataInternal = e;
    this.t0c = false;
    this.i0c = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSetAreaTimeState(e);
    }
  }
  get SetAreaTimeConfig() {
    var e;
    var t;
    if (!this.t0c && (this.t0c = true, e = this.FbDataInternal.setAreaTimeConfigType(), t = UnionSetAreaTimeTypeHelper_1.UnionSetAreaTimeTypeHelper.GetUnionSetAreaTimeTypeObject(e))) {
      this.i0c = UnionSetAreaTimeTypeHelper_1.UnionSetAreaTimeTypeHelper.ReadUnionSetAreaTimeType(e, this.FbDataInternal.setAreaTimeConfig(t));
    }
    return this.i0c;
  }
}
exports.FbSetAreaTimeState = FbSetAreaTimeState;
//# sourceMappingURL=FbSetAreaTimeState.js.map