"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPerformerAiMoveToPlayer = undefined;
class FbPerformerAiMoveToPlayer {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbPerformerAiMoveToPlayer(e);
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
exports.FbPerformerAiMoveToPlayer = FbPerformerAiMoveToPlayer;
//# sourceMappingURL=FbPerformerAiMoveToPlayer.js.map