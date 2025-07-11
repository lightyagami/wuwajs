"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCharacterLookAt = undefined;
const UnionCharacterLookAtDataHelper_1 = require("./UnionCharacterLookAtDataHelper");
class FbCharacterLookAt {
  constructor(t) {
    this.FbDataInternal = t;
    this.JZl = false;
    this.ZZl = 0;
    this.ldh = false;
    this.NHo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCharacterLookAt(t);
    }
  }
  get CharEntityId() {
    if (!this.JZl) {
      this.JZl = true;
      this.ZZl = this.FbDataInternal.charEntityId();
    }
    return this.ZZl;
  }
  get Target() {
    var t;
    var r;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), r = UnionCharacterLookAtDataHelper_1.UnionCharacterLookAtDataHelper.GetUnionCharacterLookAtDataObject(t))) {
      this.NHo = UnionCharacterLookAtDataHelper_1.UnionCharacterLookAtDataHelper.ReadUnionCharacterLookAtData(t, this.FbDataInternal.target(r));
    }
    return this.NHo;
  }
}
exports.FbCharacterLookAt = FbCharacterLookAt;
//# sourceMappingURL=FbCharacterLookAt.js.map