"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWorldLevelTable = undefined;
class FbWorldLevelTable {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mwh = false;
    this.Cwh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbWorldLevelTable(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get WorldLevelBonusId() {
    if (!this.mwh) {
      this.mwh = true;
      this.Cwh = this.FbDataInternal.worldLevelBonusId();
    }
    return this.Cwh;
  }
}
exports.FbWorldLevelTable = FbWorldLevelTable;
//# sourceMappingURL=FbWorldLevelTable.js.map