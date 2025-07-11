"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFinishStateTrigger = undefined;
const FbEntityGroupCondition_1 = require("../Condition/FbEntityGroupCondition");
class FbFinishStateTrigger {
  constructor(t) {
    this.FbDataInternal = t;
    this.AVh = false;
    this.xVh = false;
    this.MVh = false;
    this.EVh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFinishStateTrigger(t);
    }
  }
  get IsSilenceEntities() {
    if (!this.AVh) {
      this.AVh = true;
      this.xVh = this.FbDataInternal.isSilenceEntities();
    }
    return this.xVh;
  }
  get GroupCondition() {
    if (!this.MVh) {
      this.MVh = true;
      this.EVh = FbEntityGroupCondition_1.FbEntityGroupCondition.Create(this.FbDataInternal.groupCondition());
    }
    return this.EVh;
  }
}
exports.FbFinishStateTrigger = FbFinishStateTrigger;
//# sourceMappingURL=FbFinishStateTrigger.js.map