"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckChildQuestFinished = undefined;
class FbCheckChildQuestFinished {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Qch = false;
    this.Kch = 0;
    this.Pzh = false;
    this.Uzh = 0;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckChildQuestFinished(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
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
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbCheckChildQuestFinished = FbCheckChildQuestFinished;
//# sourceMappingURL=FbCheckChildQuestFinished.js.map