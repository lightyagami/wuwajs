"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcLeisureInteract = undefined;
const UnionNpcLeisureInteractOpHelper_1 = require("./UnionNpcLeisureInteractOpHelper");
class FbNpcLeisureInteract {
  constructor(e) {
    this.FbDataInternal = e;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbNpcLeisureInteract(e);
    }
  }
  get Option() {
    var e;
    var t;
    if (!this.s_h && (this.s_h = true, e = this.FbDataInternal.optionType(), t = UnionNpcLeisureInteractOpHelper_1.UnionNpcLeisureInteractOpHelper.GetUnionNpcLeisureInteractOpObject(e))) {
      this.Hye = UnionNpcLeisureInteractOpHelper_1.UnionNpcLeisureInteractOpHelper.ReadUnionNpcLeisureInteractOp(e, this.FbDataInternal.option(t));
    }
    return this.Hye;
  }
}
exports.FbNpcLeisureInteract = FbNpcLeisureInteract;
//# sourceMappingURL=FbNpcLeisureInteract.js.map