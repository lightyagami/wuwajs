"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddBuffToPlayer = undefined;
class FbAddBuffToPlayer {
  constructor(t) {
    this.FbDataInternal = t;
    this.Vph = false;
    this.jph = undefined;
    this.Qph = false;
    this.Kph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAddBuffToPlayer(t);
    }
  }
  get BuffIds() {
    if (!this.Vph) {
      this.Vph = true;
      this.jph = new Array();
      var s = this.FbDataInternal.buffIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
        }
      }
    }
    return this.jph;
  }
  get PersistOnDestroyBuffIds() {
    if (!this.Qph) {
      this.Qph = true;
      this.Kph = new Array();
      var s = this.FbDataInternal.persistOnDestroyBuffIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.Kph.push(Number(this.FbDataInternal.persistOnDestroyBuffIds(t) ?? 0));
        }
      }
    }
    return this.Kph;
  }
}
exports.FbAddBuffToPlayer = FbAddBuffToPlayer;
//# sourceMappingURL=FbAddBuffToPlayer.js.map