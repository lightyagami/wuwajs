"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPerformerAiMoveToPosition = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPerformerAiMoveToPosition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.yAh = false;
    this.SAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPerformerAiMoveToPosition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Destination() {
    if (!this.yAh) {
      this.yAh = true;
      this.SAh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.destination());
    }
    return this.SAh;
  }
}
exports.FbPerformerAiMoveToPosition = FbPerformerAiMoveToPosition;
//# sourceMappingURL=FbPerformerAiMoveToPosition.js.map