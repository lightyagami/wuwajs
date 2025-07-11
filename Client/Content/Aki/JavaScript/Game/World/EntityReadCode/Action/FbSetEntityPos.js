"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetEntityPos = undefined;
const FbPosA_1 = require("./FbPosA");
class FbSetEntityPos {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.uch = false;
    this.dch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetEntityPos(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbPosA_1.FbPosA.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
}
exports.FbSetEntityPos = FbSetEntityPos;
//# sourceMappingURL=FbSetEntityPos.js.map