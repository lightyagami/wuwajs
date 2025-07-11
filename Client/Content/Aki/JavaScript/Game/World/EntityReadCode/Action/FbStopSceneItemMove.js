"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStopSceneItemMove = undefined;
class FbStopSceneItemMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
    this.ZEh = false;
    this.eIh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStopSceneItemMove(t);
    }
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var e = this.FbDataInternal.entityIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
  get StopType() {
    if (!this.ZEh) {
      this.ZEh = true;
      this.eIh = this.FbDataInternal.stopType();
    }
    return this.eIh;
  }
}
exports.FbStopSceneItemMove = FbStopSceneItemMove;
//# sourceMappingURL=FbStopSceneItemMove.js.map