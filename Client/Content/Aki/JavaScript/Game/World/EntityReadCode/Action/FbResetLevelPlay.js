"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResetLevelPlay = undefined;
class FbResetLevelPlay {
  constructor(e) {
    this.FbDataInternal = e;
    this.gQ_ = false;
    this.CQ_ = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbResetLevelPlay(e);
    }
  }
  get ResetLevelPlayList() {
    if (!this.gQ_) {
      this.gQ_ = true;
      this.CQ_ = new Array();
      var t = this.FbDataInternal.resetLevelPlayListLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          this.CQ_.push(this.FbDataInternal.resetLevelPlayList(e));
        }
      }
    }
    return this.CQ_;
  }
}
exports.FbResetLevelPlay = FbResetLevelPlay;
//# sourceMappingURL=FbResetLevelPlay.js.map