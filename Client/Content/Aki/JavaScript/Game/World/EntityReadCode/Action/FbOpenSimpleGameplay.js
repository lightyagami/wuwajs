"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenSimpleGameplay = undefined;
const UnionUiGameHelper_1 = require("./UnionUiGameHelper");
class FbOpenSimpleGameplay {
  constructor(e) {
    this.FbDataInternal = e;
    this.cIh = false;
    this.uIh = undefined;
    this.dIh = false;
    this.mIh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbOpenSimpleGameplay(e);
    }
  }
  get GameplayConfig() {
    var e;
    var i;
    if (!this.cIh && (this.cIh = true, e = this.FbDataInternal.gameplayConfigType(), i = UnionUiGameHelper_1.UnionUiGameHelper.GetUnionUiGameObject(e))) {
      this.uIh = UnionUiGameHelper_1.UnionUiGameHelper.ReadUnionUiGame(e, this.FbDataInternal.gameplayConfig(i));
    }
    return this.uIh;
  }
  get FinishSendSelfEvent() {
    if (!this.dIh) {
      this.dIh = true;
      this.mIh = this.FbDataInternal.finishSendSelfEvent();
    }
    return this.mIh;
  }
}
exports.FbOpenSimpleGameplay = FbOpenSimpleGameplay;
//# sourceMappingURL=FbOpenSimpleGameplay.js.map