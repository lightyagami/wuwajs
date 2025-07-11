"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGramophoneCheckCondition = undefined;
class FbGramophoneCheckCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.wJh = false;
    this.PJh = undefined;
    this.kbc = false;
    this.Obc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGramophoneCheckCondition(t);
    }
  }
  get CheckType() {
    if (!this.wJh) {
      this.wJh = true;
      this.PJh = this.FbDataInternal.checkType();
    }
    return this.PJh;
  }
  get PlayList() {
    if (!this.kbc) {
      this.kbc = true;
      this.Obc = new Array();
      var i = this.FbDataInternal.playListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Obc.push(this.FbDataInternal.playList(t));
        }
      }
    }
    return this.Obc;
  }
}
exports.FbGramophoneCheckCondition = FbGramophoneCheckCondition;
//# sourceMappingURL=FbGramophoneCheckCondition.js.map