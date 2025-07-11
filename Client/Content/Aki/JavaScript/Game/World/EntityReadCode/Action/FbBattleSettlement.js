"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBattleSettlement = undefined;
class FbBattleSettlement {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.A5l = false;
    this.x5l = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBattleSettlement(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get GamePlayCue() {
    if (!this.A5l) {
      this.A5l = true;
      this.x5l = this.FbDataInternal.gamePlayCue();
    }
    return this.x5l;
  }
}
exports.FbBattleSettlement = FbBattleSettlement;
//# sourceMappingURL=FbBattleSettlement.js.map