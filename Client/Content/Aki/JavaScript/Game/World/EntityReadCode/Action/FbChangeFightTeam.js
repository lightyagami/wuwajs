"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeFightTeam = undefined;
class FbChangeFightTeam {
  constructor(t) {
    this.FbDataInternal = t;
    this.oEh = false;
    this.nEh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbChangeFightTeam(t);
    }
  }
  get TeamIndex() {
    if (!this.oEh) {
      this.oEh = true;
      this.nEh = this.FbDataInternal.teamIndex();
    }
    return this.nEh;
  }
}
exports.FbChangeFightTeam = FbChangeFightTeam;
//# sourceMappingURL=FbChangeFightTeam.js.map