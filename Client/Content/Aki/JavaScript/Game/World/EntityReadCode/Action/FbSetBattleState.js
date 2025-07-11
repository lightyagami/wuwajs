"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetBattleState = undefined;
const UnionStateOptionHelper_1 = require("./UnionStateOptionHelper");
class FbSetBattleState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Mvh = false;
    this.Evh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetBattleState(t);
    }
  }
  get StateOption() {
    var t;
    var e;
    if (!this.Mvh && (this.Mvh = true, t = this.FbDataInternal.stateOptionType(), e = UnionStateOptionHelper_1.UnionStateOptionHelper.GetUnionStateOptionObject(t))) {
      this.Evh = UnionStateOptionHelper_1.UnionStateOptionHelper.ReadUnionStateOption(t, this.FbDataInternal.stateOption(e));
    }
    return this.Evh;
  }
}
exports.FbSetBattleState = FbSetBattleState;
//# sourceMappingURL=FbSetBattleState.js.map