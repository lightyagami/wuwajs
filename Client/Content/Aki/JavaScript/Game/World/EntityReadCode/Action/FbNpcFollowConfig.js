"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcFollowConfig = undefined;
const FbPerformerRangeBoundaryActionTrigger_1 = require("./FbPerformerRangeBoundaryActionTrigger");
class FbNpcFollowConfig {
  constructor(r) {
    this.FbDataInternal = r;
    this.ndh = false;
    this.sdh = undefined;
    this.adh = false;
    this.hdh = undefined;
  }
  static Create(r) {
    if (r) {
      return new FbNpcFollowConfig(r);
    }
  }
  get PerformerWhenEnter() {
    if (!this.ndh) {
      this.ndh = true;
      this.sdh = FbPerformerRangeBoundaryActionTrigger_1.FbPerformerRangeBoundaryActionTrigger.Create(this.FbDataInternal.performerWhenEnter());
    }
    return this.sdh;
  }
  get PerformerWhenExit() {
    if (!this.adh) {
      this.adh = true;
      this.hdh = FbPerformerRangeBoundaryActionTrigger_1.FbPerformerRangeBoundaryActionTrigger.Create(this.FbDataInternal.performerWhenExit());
    }
    return this.hdh;
  }
}
exports.FbNpcFollowConfig = FbNpcFollowConfig;
//# sourceMappingURL=FbNpcFollowConfig.js.map