"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbPlayerBattleWinData = undefined;
class FbBvbPlayerBattleWinData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbPlayerBattleWinData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbBvbPlayerBattleWinData = FbBvbPlayerBattleWinData;
//# sourceMappingURL=FbBvbPlayerBattleWinData.js.map