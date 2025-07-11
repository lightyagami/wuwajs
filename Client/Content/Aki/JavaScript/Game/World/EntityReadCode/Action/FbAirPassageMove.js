"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAirPassageMove = undefined;
class FbAirPassageMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Dbh = false;
    this.Bbh = 0;
    this.qbh = false;
    this.kbh = false;
    this.qtc = false;
    this.Otc = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAirPassageMove(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MaxOffsetDistance() {
    if (!this.Dbh) {
      this.Dbh = true;
      this.Bbh = this.FbDataInternal.maxOffsetDistance();
    }
    return this.Bbh;
  }
  get IsOneWay() {
    if (!this.qbh) {
      this.qbh = true;
      this.kbh = this.FbDataInternal.isOneWay();
    }
    return this.kbh;
  }
  get LayerVerticalLimit() {
    if (!this.qtc) {
      this.qtc = true;
      this.Otc = this.FbDataInternal.layerVerticalLimit();
    }
    return this.Otc;
  }
}
exports.FbAirPassageMove = FbAirPassageMove;
//# sourceMappingURL=FbAirPassageMove.js.map