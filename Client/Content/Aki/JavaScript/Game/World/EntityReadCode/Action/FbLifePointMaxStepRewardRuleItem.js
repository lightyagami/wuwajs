"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLifePointMaxStepRewardRuleItem = undefined;
class FbLifePointMaxStepRewardRuleItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.wIh = false;
    this.PIh = 0;
    this.UIh = false;
    this.DIh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbLifePointMaxStepRewardRuleItem(t);
    }
  }
  get PaintCount() {
    if (!this.wIh) {
      this.wIh = true;
      this.PIh = this.FbDataInternal.paintCount();
    }
    return this.PIh;
  }
  get AddStep() {
    if (!this.UIh) {
      this.UIh = true;
      this.DIh = this.FbDataInternal.addStep();
    }
    return this.DIh;
  }
}
exports.FbLifePointMaxStepRewardRuleItem = FbLifePointMaxStepRewardRuleItem;
//# sourceMappingURL=FbLifePointMaxStepRewardRuleItem.js.map