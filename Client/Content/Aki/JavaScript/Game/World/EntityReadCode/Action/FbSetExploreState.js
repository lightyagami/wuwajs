"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetExploreState = undefined;
const UnionExploreStateHelper_1 = require("./UnionExploreStateHelper");
class FbSetExploreState {
  constructor(e) {
    this.FbDataInternal = e;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSetExploreState(e);
    }
  }
  get Config() {
    var e;
    var t;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionExploreStateHelper_1.UnionExploreStateHelper.GetUnionExploreStateObject(e))) {
      this.TAe = UnionExploreStateHelper_1.UnionExploreStateHelper.ReadUnionExploreState(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbSetExploreState = FbSetExploreState;
//# sourceMappingURL=FbSetExploreState.js.map