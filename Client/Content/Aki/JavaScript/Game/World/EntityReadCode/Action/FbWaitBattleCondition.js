"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWaitBattleCondition = undefined;
const UnionDetectBattleConditionTypeHelper_1 = require("./UnionDetectBattleConditionTypeHelper");
class FbWaitBattleCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.Mvh = false;
    this.Evh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbWaitBattleCondition(t);
    }
  }
  get StateOption() {
    var t;
    var e;
    if (!this.Mvh && (this.Mvh = true, t = this.FbDataInternal.stateOptionType(), e = UnionDetectBattleConditionTypeHelper_1.UnionDetectBattleConditionTypeHelper.GetUnionDetectBattleConditionTypeObject(t))) {
      this.Evh = UnionDetectBattleConditionTypeHelper_1.UnionDetectBattleConditionTypeHelper.ReadUnionDetectBattleConditionType(t, this.FbDataInternal.stateOption(e));
    }
    return this.Evh;
  }
}
exports.FbWaitBattleCondition = FbWaitBattleCondition;
//# sourceMappingURL=FbWaitBattleCondition.js.map