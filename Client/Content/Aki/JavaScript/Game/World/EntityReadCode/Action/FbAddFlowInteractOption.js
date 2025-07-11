"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddFlowInteractOption = undefined;
const FbInteractOption_1 = require("./FbInteractOption");
class FbAddFlowInteractOption {
  constructor(t) {
    this.FbDataInternal = t;
    this.s_h = false;
    this.Hye = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.h_h = false;
    this.l_h = false;
  }
  static Create(t) {
    if (t) {
      return new FbAddFlowInteractOption(t);
    }
  }
  get Option() {
    if (!this.s_h) {
      this.s_h = true;
      this.Hye = FbInteractOption_1.FbInteractOption.Create(this.FbDataInternal.option());
    }
    return this.Hye;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get DelayRemoveByQuestEnd() {
    if (!this.h_h) {
      this.h_h = true;
      this.l_h = this.FbDataInternal.delayRemoveByQuestEnd();
    }
    return this.l_h;
  }
}
exports.FbAddFlowInteractOption = FbAddFlowInteractOption;
//# sourceMappingURL=FbAddFlowInteractOption.js.map