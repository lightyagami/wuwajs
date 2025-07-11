"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPerformerAiMoveTo = undefined;
const UnionPerformerAiMoveToConfigHelper_1 = require("./UnionPerformerAiMoveToConfigHelper");
class FbPerformerAiMoveTo {
  constructor(e) {
    this.FbDataInternal = e;
    this.bSh = false;
    this.TAe = undefined;
    this.YAh = false;
    this.zAh = 0;
  }
  static Create(e) {
    if (e) {
      return new FbPerformerAiMoveTo(e);
    }
  }
  get Config() {
    var e;
    var r;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), r = UnionPerformerAiMoveToConfigHelper_1.UnionPerformerAiMoveToConfigHelper.GetUnionPerformerAiMoveToConfigObject(e))) {
      this.TAe = UnionPerformerAiMoveToConfigHelper_1.UnionPerformerAiMoveToConfigHelper.ReadUnionPerformerAiMoveToConfig(e, this.FbDataInternal.config(r));
    }
    return this.TAe;
  }
  get StopDistance() {
    if (!this.YAh) {
      this.YAh = true;
      this.zAh = this.FbDataInternal.stopDistance();
    }
    return this.zAh;
  }
}
exports.FbPerformerAiMoveTo = FbPerformerAiMoveTo;
//# sourceMappingURL=FbPerformerAiMoveTo.js.map