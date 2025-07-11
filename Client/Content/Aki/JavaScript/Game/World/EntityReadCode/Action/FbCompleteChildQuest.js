"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompleteChildQuest = undefined;
class FbCompleteChildQuest {
  constructor(t) {
    this.FbDataInternal = t;
    this.Qch = false;
    this.Kch = 0;
    this.$ch = false;
    this.Xch = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompleteChildQuest(t);
    }
  }
  get QuestId() {
    if (!this.Qch) {
      this.Qch = true;
      this.Kch = this.FbDataInternal.questId();
    }
    return this.Kch;
  }
  get NodeId() {
    if (!this.$ch) {
      this.$ch = true;
      this.Xch = this.FbDataInternal.nodeId();
    }
    return this.Xch;
  }
}
exports.FbCompleteChildQuest = FbCompleteChildQuest;
//# sourceMappingURL=FbCompleteChildQuest.js.map