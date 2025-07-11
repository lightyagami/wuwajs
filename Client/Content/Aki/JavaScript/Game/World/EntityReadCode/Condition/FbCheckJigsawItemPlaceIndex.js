"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckJigsawItemPlaceIndex = undefined;
const FbPieceIndex_1 = require("./FbPieceIndex");
class FbCheckJigsawItemPlaceIndex {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.gAh = false;
    this.fAh = 0;
    this.pAh = false;
    this.vAh = 0;
    this.tJh = false;
    this.iJh = undefined;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckJigsawItemPlaceIndex(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ItemEntityId() {
    if (!this.gAh) {
      this.gAh = true;
      this.fAh = this.FbDataInternal.itemEntityId();
    }
    return this.fAh;
  }
  get FoundationEntityId() {
    if (!this.pAh) {
      this.pAh = true;
      this.vAh = this.FbDataInternal.foundationEntityId();
    }
    return this.vAh;
  }
  get PlaceIndex() {
    if (!this.tJh) {
      this.tJh = true;
      this.iJh = FbPieceIndex_1.FbPieceIndex.Create(this.FbDataInternal.placeIndex());
    }
    return this.iJh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbCheckJigsawItemPlaceIndex = FbCheckJigsawItemPlaceIndex;
//# sourceMappingURL=FbCheckJigsawItemPlaceIndex.js.map