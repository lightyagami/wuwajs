"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPreQuest = undefined;
class FbPreQuest {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.tZh = false;
    this.iZh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPreQuest(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get PreQuestId() {
    if (!this.tZh) {
      this.tZh = true;
      this.iZh = this.FbDataInternal.preQuestId();
    }
    return this.iZh;
  }
}
exports.FbPreQuest = FbPreQuest;
//# sourceMappingURL=FbPreQuest.js.map