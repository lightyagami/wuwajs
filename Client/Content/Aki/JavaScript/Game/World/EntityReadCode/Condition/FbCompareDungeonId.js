"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareDungeonId = undefined;
class FbCompareDungeonId {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.MMh = false;
    this.EMh = 0;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompareDungeonId(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get DungeonId() {
    if (!this.MMh) {
      this.MMh = true;
      this.EMh = this.FbDataInternal.dungeonId();
    }
    return this.EMh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbCompareDungeonId = FbCompareDungeonId;
//# sourceMappingURL=FbCompareDungeonId.js.map