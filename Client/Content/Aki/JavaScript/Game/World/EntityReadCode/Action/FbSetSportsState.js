"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetSportsState = undefined;
const UnionSportStateHelper_1 = require("./UnionSportStateHelper");
class FbSetSportsState {
  constructor(t) {
    this.FbDataInternal = t;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetSportsState(t);
    }
  }
  get Config() {
    var t;
    var e;
    if (!this.bSh && (this.bSh = true, t = this.FbDataInternal.configType(), e = UnionSportStateHelper_1.UnionSportStateHelper.GetUnionSportStateObject(t))) {
      this.TAe = UnionSportStateHelper_1.UnionSportStateHelper.ReadUnionSportState(t, this.FbDataInternal.config(e));
    }
    return this.TAe;
  }
}
exports.FbSetSportsState = FbSetSportsState;
//# sourceMappingURL=FbSetSportsState.js.map