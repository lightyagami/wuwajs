"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckOnlinePlayer = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckOnlinePlayer {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbCheckOnlinePlayer(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get OnlinePlayerConditionTargetOption() {
    var e;
    var i;
    if (!this.czh && (this.czh = true, e = this.FbDataInternal.onlinePlayerConditionTargetOptionType(), i = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(e))) {
      this.uzh = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(e, this.FbDataInternal.onlinePlayerConditionTargetOption(i));
    }
    return this.uzh;
  }
}
exports.FbCheckOnlinePlayer = FbCheckOnlinePlayer;
//# sourceMappingURL=FbCheckOnlinePlayer.js.map