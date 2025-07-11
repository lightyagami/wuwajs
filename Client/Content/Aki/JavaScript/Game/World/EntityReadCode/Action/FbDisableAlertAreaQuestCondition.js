"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableAlertAreaQuestCondition = undefined;
class FbDisableAlertAreaQuestCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.KSh = false;
    this.$Sh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbDisableAlertAreaQuestCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RelatedQuestId() {
    if (!this.KSh) {
      this.KSh = true;
      this.$Sh = this.FbDataInternal.relatedQuestId();
    }
    return this.$Sh;
  }
}
exports.FbDisableAlertAreaQuestCondition = FbDisableAlertAreaQuestCondition;
//# sourceMappingURL=FbDisableAlertAreaQuestCondition.js.map