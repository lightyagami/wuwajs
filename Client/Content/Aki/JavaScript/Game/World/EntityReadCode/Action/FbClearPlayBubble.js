"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbClearPlayBubble = undefined;
class FbClearPlayBubble {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
    this.Mmh = false;
    this.Emh = false;
  }
  static Create(t) {
    if (t) {
      return new FbClearPlayBubble(t);
    }
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var s = this.FbDataInternal.entityIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
  get OnlyClearRedDot() {
    if (!this.Mmh) {
      this.Mmh = true;
      this.Emh = this.FbDataInternal.onlyClearRedDot();
    }
    return this.Emh;
  }
}
exports.FbClearPlayBubble = FbClearPlayBubble;
//# sourceMappingURL=FbClearPlayBubble.js.map