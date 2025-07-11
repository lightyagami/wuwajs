"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPreChildQuest = undefined;
const FbChildQuestCondition_1 = require("./FbChildQuestCondition");
class FbPreChildQuest {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.ZJh = false;
    this.eZh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPreChildQuest(t);
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
  get PreChildQuest() {
    if (!this.ZJh) {
      this.ZJh = true;
      this.eZh = FbChildQuestCondition_1.FbChildQuestCondition.Create(this.FbDataInternal.preChildQuest());
    }
    return this.eZh;
  }
}
exports.FbPreChildQuest = FbPreChildQuest;
//# sourceMappingURL=FbPreChildQuest.js.map