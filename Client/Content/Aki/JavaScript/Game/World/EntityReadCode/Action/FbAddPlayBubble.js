"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddPlayBubble = undefined;
const FbBubbleIndex_1 = require("./FbBubbleIndex");
class FbAddPlayBubble {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
    this.Cmh = false;
    this.gmh = 0;
    this.fmh = false;
    this.pmh = 0;
    this.F_h = false;
    this.N_h = undefined;
    this.vmh = false;
    this.ymh = 0;
    this.Smh = false;
    this.wer = false;
  }
  static Create(t) {
    if (t) {
      return new FbAddPlayBubble(t);
    }
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
  get EnterRadius() {
    if (!this.Cmh) {
      this.Cmh = true;
      this.gmh = this.FbDataInternal.enterRadius();
    }
    return this.gmh;
  }
  get LeaveRadius() {
    if (!this.fmh) {
      this.fmh = true;
      this.pmh = this.FbDataInternal.leaveRadius();
    }
    return this.pmh;
  }
  get Flow() {
    if (!this.F_h) {
      this.F_h = true;
      this.N_h = FbBubbleIndex_1.FbBubbleIndex.Create(this.FbDataInternal.flow());
    }
    return this.N_h;
  }
  get WaitTime() {
    if (!this.vmh) {
      this.vmh = true;
      this.ymh = this.FbDataInternal.waitTime();
    }
    return this.ymh;
  }
  get RedDot() {
    if (!this.Smh) {
      this.Smh = true;
      this.wer = this.FbDataInternal.redDot();
    }
    return this.wer;
  }
}
exports.FbAddPlayBubble = FbAddPlayBubble;
//# sourceMappingURL=FbAddPlayBubble.js.map