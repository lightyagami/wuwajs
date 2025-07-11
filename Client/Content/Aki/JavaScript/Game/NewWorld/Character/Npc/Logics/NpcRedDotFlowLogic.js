"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcRedDotFlowLogic = undefined;
class NpcRedDotFlowLogic {
  constructor() {
    this.qer = false;
    this.Ger = false;
  }
  GetRedDotActive() {
    if (!this.Ger) {
      this.Ner();
    }
    return this.qer;
  }
  Ner() {
    this.qer = false;
  }
  ManualControlRedDotActive(t, i) {
    this.Ger = t;
    if (this.Ger) {
      this.qer = i;
    } else {
      this.qer = false;
    }
  }
  Clear() {
    this.qer = false;
    this.Ger = false;
  }
}
exports.NpcRedDotFlowLogic = NpcRedDotFlowLogic;
//# sourceMappingURL=NpcRedDotFlowLogic.js.map