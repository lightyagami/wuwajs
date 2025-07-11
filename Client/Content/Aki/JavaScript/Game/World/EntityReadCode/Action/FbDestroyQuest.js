"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestroyQuest = undefined;
class FbDestroyQuest {
  constructor(t) {
    this.FbDataInternal = t;
    this.Qch = false;
    this.Kch = 0;
    this.bEh = false;
    this.LEh = false;
  }
  static Create(t) {
    if (t) {
      return new FbDestroyQuest(t);
    }
  }
  get QuestId() {
    if (!this.Qch) {
      this.Qch = true;
      this.Kch = this.FbDataInternal.questId();
    }
    return this.Kch;
  }
  get IsDestroy() {
    if (!this.bEh) {
      this.bEh = true;
      this.LEh = this.FbDataInternal.isDestroy();
    }
    return this.LEh;
  }
}
exports.FbDestroyQuest = FbDestroyQuest;
//# sourceMappingURL=FbDestroyQuest.js.map