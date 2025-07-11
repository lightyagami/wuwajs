"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMoveJigsawItem = undefined;
const FbPieceIndex_1 = require("./FbPieceIndex");
class FbMoveJigsawItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.gAh = false;
    this.fAh = 0;
    this.pAh = false;
    this.vAh = 0;
    this.yAh = false;
    this.SAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMoveJigsawItem(t);
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
  get Destination() {
    if (!this.yAh) {
      this.yAh = true;
      this.SAh = FbPieceIndex_1.FbPieceIndex.Create(this.FbDataInternal.destination());
    }
    return this.SAh;
  }
}
exports.FbMoveJigsawItem = FbMoveJigsawItem;
//# sourceMappingURL=FbMoveJigsawItem.js.map