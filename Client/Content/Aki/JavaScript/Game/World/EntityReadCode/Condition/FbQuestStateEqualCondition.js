"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbQuestStateEqualCondition = undefined;
class FbQuestStateEqualCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Qch = false;
    this.Kch = 0;
    this.Bch = false;
    this.Cbo = undefined;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbQuestStateEqualCondition(t);
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
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbQuestStateEqualCondition = FbQuestStateEqualCondition;
//# sourceMappingURL=FbQuestStateEqualCondition.js.map