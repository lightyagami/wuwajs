"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPerformerAiSplineMove = undefined;
class FbPerformerAiSplineMove {
  constructor(e) {
    this.FbDataInternal = e;
    this.kuh = false;
    this.Guh = 0;
  }
  static Create(e) {
    if (e) {
      return new FbPerformerAiSplineMove(e);
    }
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
}
exports.FbPerformerAiSplineMove = FbPerformerAiSplineMove;
//# sourceMappingURL=FbPerformerAiSplineMove.js.map