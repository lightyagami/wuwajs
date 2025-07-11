"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenSystemBoardWithReturn = undefined;
const UnionOpenSystemBoardWithReturnHelper_1 = require("./UnionOpenSystemBoardWithReturnHelper");
class FbOpenSystemBoardWithReturn {
  constructor(e) {
    this.FbDataInternal = e;
    this.udh = false;
    this.ddh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbOpenSystemBoardWithReturn(e);
    }
  }
  get SystemType() {
    var e;
    var t;
    if (!this.udh && (this.udh = true, e = this.FbDataInternal.systemTypeType(), t = UnionOpenSystemBoardWithReturnHelper_1.UnionOpenSystemBoardWithReturnHelper.GetUnionOpenSystemBoardWithReturnObject(e))) {
      this.ddh = UnionOpenSystemBoardWithReturnHelper_1.UnionOpenSystemBoardWithReturnHelper.ReadUnionOpenSystemBoardWithReturn(e, this.FbDataInternal.systemType(t));
    }
    return this.ddh;
  }
}
exports.FbOpenSystemBoardWithReturn = FbOpenSystemBoardWithReturn;
//# sourceMappingURL=FbOpenSystemBoardWithReturn.js.map