"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSequenceTrackControlPoint = undefined;
class FbSequenceTrackControlPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.eLh = false;
    this.tLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSequenceTrackControlPoint(t);
    }
  }
  get Mark() {
    if (!this.eLh) {
      this.eLh = true;
      this.tLh = this.FbDataInternal.mark();
    }
    return this.tLh;
  }
}
exports.FbSequenceTrackControlPoint = FbSequenceTrackControlPoint;
//# sourceMappingURL=FbSequenceTrackControlPoint.js.map