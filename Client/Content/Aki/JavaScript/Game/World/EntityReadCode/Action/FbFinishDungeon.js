"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFinishDungeon = undefined;
class FbFinishDungeon {
  constructor(s) {
    this.FbDataInternal = s;
    this.PMh = false;
    this.UMh = false;
  }
  static Create(s) {
    if (s) {
      return new FbFinishDungeon(s);
    }
  }
  get IsSuccess() {
    if (!this.PMh) {
      this.PMh = true;
      this.UMh = this.FbDataInternal.isSuccess();
    }
    return this.UMh;
  }
}
exports.FbFinishDungeon = FbFinishDungeon;
//# sourceMappingURL=FbFinishDungeon.js.map