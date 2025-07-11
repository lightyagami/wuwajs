"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityMatchPlayer = undefined;
const UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
class FbEntityMatchPlayer {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.qDh = false;
    this.PAe = undefined;
    this.Okh = false;
    this.Fkh = false;
  }
  static Create(t) {
    if (t) {
      return new FbEntityMatchPlayer(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      this.qDh = true;
      this.PAe = new Array();
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t);
          var s = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(e);
          if (s && (e = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(e, this.FbDataInternal.matchRoleOption(t, s))) !== undefined) {
            this.PAe.push(e);
          }
        }
      }
    }
    return this.PAe;
  }
  get ChangeRoleTrigger() {
    if (!this.Okh) {
      this.Okh = true;
      this.Fkh = this.FbDataInternal.changeRoleTrigger();
    }
    return this.Fkh;
  }
}
exports.FbEntityMatchPlayer = FbEntityMatchPlayer;
//# sourceMappingURL=FbEntityMatchPlayer.js.map