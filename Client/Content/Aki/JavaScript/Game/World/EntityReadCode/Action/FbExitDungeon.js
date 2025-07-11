"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExitDungeon = undefined;
class FbExitDungeon {
  constructor(t) {
    this.FbDataInternal = t;
    this.AMh = false;
    this.xMh = false;
  }
  static Create(t) {
    if (t) {
      return new FbExitDungeon(t);
    }
  }
  get IsNeedSecondaryConfirmation() {
    if (!this.AMh) {
      this.AMh = true;
      this.xMh = this.FbDataInternal.isNeedSecondaryConfirmation();
    }
    return this.xMh;
  }
}
exports.FbExitDungeon = FbExitDungeon;
//# sourceMappingURL=FbExitDungeon.js.map