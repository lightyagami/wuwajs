"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayBubble = undefined;
const FbBubbleIndex_1 = require("./FbBubbleIndex");
class FbPlayBubble {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.F_h = false;
    this.N_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPlayBubble(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Flow() {
    if (!this.F_h) {
      this.F_h = true;
      this.N_h = FbBubbleIndex_1.FbBubbleIndex.Create(this.FbDataInternal.flow());
    }
    return this.N_h;
  }
}
exports.FbPlayBubble = FbPlayBubble;
//# sourceMappingURL=FbPlayBubble.js.map