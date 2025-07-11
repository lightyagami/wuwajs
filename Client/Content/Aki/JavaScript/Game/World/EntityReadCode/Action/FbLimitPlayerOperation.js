"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLimitPlayerOperation = undefined;
const UnionLimitPlayOperationHelper_1 = require("./UnionLimitPlayOperationHelper");
class FbLimitPlayerOperation {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbLimitPlayerOperation(i);
    }
  }
  get Type() {
    var i;
    var t;
    if (!this.u_h && (this.u_h = true, i = this.FbDataInternal.typeType(), t = UnionLimitPlayOperationHelper_1.UnionLimitPlayOperationHelper.GetUnionLimitPlayOperationObject(i))) {
      this.f8o = UnionLimitPlayOperationHelper_1.UnionLimitPlayOperationHelper.ReadUnionLimitPlayOperation(i, this.FbDataInternal.type(t));
    }
    return this.f8o;
  }
}
exports.FbLimitPlayerOperation = FbLimitPlayerOperation;
//# sourceMappingURL=FbLimitPlayerOperation.js.map