"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbGramophoneCheckCondition = void 0;
class FbGramophoneCheckCondition {
  constructor(t) {
    this.FbDataInternal = t, this.wJh = !1, this.PJh = void 0, this.kbc = !1, this.Obc = void 0
  }
  static Create(t) {
    if (t) return new FbGramophoneCheckCondition(t)
  }
  get CheckType() {
    return this.wJh || (this.wJh = !0, this.PJh = this.FbDataInternal.checkType()), this.PJh
  }
  get PlayList() {
    if (!this.kbc) {
      this.kbc = !0, this.Obc = new Array;
      var i = this.FbDataInternal.playListLength();
      if (i)
        for (let t = 0; t < i; ++t) this.Obc.push(this.FbDataInternal.playList(t))
    }
    return this.Obc
  }
}
exports.FbGramophoneCheckCondition = FbGramophoneCheckCondition;
//# sourceMappingURL=FbGramophoneCheckCondition.js.map