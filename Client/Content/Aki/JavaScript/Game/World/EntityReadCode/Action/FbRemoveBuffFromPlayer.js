"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemoveBuffFromPlayer = undefined;
class FbRemoveBuffFromPlayer {
  constructor(e) {
    this.FbDataInternal = e;
    this.Vph = false;
    this.jph = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRemoveBuffFromPlayer(e);
    }
  }
  get BuffIds() {
    if (!this.Vph) {
      this.Vph = true;
      this.jph = new Array();
      var t = this.FbDataInternal.buffIdsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          this.jph.push(Number(this.FbDataInternal.buffIds(e) ?? 0));
        }
      }
    }
    return this.jph;
  }
}
exports.FbRemoveBuffFromPlayer = FbRemoveBuffFromPlayer;
//# sourceMappingURL=FbRemoveBuffFromPlayer.js.map