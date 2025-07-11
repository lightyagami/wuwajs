"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChildQuestCondition = undefined;
class FbChildQuestCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.Qch = false;
    this.Kch = 0;
    this.Pzh = false;
    this.Uzh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbChildQuestCondition(t);
    }
  }
  get QuestId() {
    if (!this.Qch) {
      this.Qch = true;
      this.Kch = this.FbDataInternal.questId();
    }
    return this.Kch;
  }
  get ChildQuestId() {
    if (!this.Pzh) {
      this.Pzh = true;
      this.Uzh = this.FbDataInternal.childQuestId();
    }
    return this.Uzh;
  }
}
exports.FbChildQuestCondition = FbChildQuestCondition;
//# sourceMappingURL=FbChildQuestCondition.js.map