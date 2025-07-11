"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExecBattleAction = undefined;
const UnionExecBattleOptionHelper_1 = require("./UnionExecBattleOptionHelper");
class FbExecBattleAction {
  constructor(t) {
    this.FbDataInternal = t;
    this.qvh = false;
    this.kvh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbExecBattleAction(t);
    }
  }
  get BattleOption() {
    var t;
    var e;
    if (!this.qvh && (this.qvh = true, t = this.FbDataInternal.battleOptionType(), e = UnionExecBattleOptionHelper_1.UnionExecBattleOptionHelper.GetUnionExecBattleOptionObject(t))) {
      this.kvh = UnionExecBattleOptionHelper_1.UnionExecBattleOptionHelper.ReadUnionExecBattleOption(t, this.FbDataInternal.battleOption(e));
    }
    return this.kvh;
  }
}
exports.FbExecBattleAction = FbExecBattleAction;
//# sourceMappingURL=FbExecBattleAction.js.map