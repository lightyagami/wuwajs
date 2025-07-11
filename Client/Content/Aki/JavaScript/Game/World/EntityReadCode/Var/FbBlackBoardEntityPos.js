"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBlackBoardEntityPos = undefined;
class FbBlackBoardEntityPos {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ubh = false;
    this.dbh = undefined;
    this.a_h = false;
    this.I9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBlackBoardEntityPos(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Key() {
    if (!this.ubh) {
      this.ubh = true;
      this.dbh = this.FbDataInternal.key();
    }
    return this.dbh;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
}
exports.FbBlackBoardEntityPos = FbBlackBoardEntityPos;
//# sourceMappingURL=FbBlackBoardEntityPos.js.map