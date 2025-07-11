"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetPlayerPos = undefined;
const UnionTeammateTeleportConfigHelper_1 = require("./UnionTeammateTeleportConfigHelper");
const UnionTeleportConfigHelper_1 = require("./UnionTeleportConfigHelper");
const UnionTeleportTransitionOptionHelper_1 = require("./UnionTeleportTransitionOptionHelper");
class FbSetPlayerPos {
  constructor(e) {
    this.FbDataInternal = e;
    this.E0h = false;
    this.I0h = undefined;
    this.T0h = false;
    this.b0h = undefined;
    this.L0h = false;
    this.khi = undefined;
    this.A0h = false;
    this.x0h = false;
  }
  static Create(e) {
    if (e) {
      return new FbSetPlayerPos(e);
    }
  }
  get TelePortConfig() {
    var e;
    var t;
    if (!this.E0h && (this.E0h = true, e = this.FbDataInternal.telePortConfigType(), t = UnionTeleportConfigHelper_1.UnionTeleportConfigHelper.GetUnionTeleportConfigObject(e))) {
      this.I0h = UnionTeleportConfigHelper_1.UnionTeleportConfigHelper.ReadUnionTeleportConfig(e, this.FbDataInternal.telePortConfig(t));
    }
    return this.I0h;
  }
  get TeammateTeleportConfig() {
    var e;
    var t;
    if (!this.T0h && (this.T0h = true, e = this.FbDataInternal.teammateTeleportConfigType(), t = UnionTeammateTeleportConfigHelper_1.UnionTeammateTeleportConfigHelper.GetUnionTeammateTeleportConfigObject(e))) {
      this.b0h = UnionTeammateTeleportConfigHelper_1.UnionTeammateTeleportConfigHelper.ReadUnionTeammateTeleportConfig(e, this.FbDataInternal.teammateTeleportConfig(t));
    }
    return this.b0h;
  }
  get TransitionOption() {
    var e;
    var t;
    if (!this.L0h && (this.L0h = true, e = this.FbDataInternal.transitionOptionType(), t = UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.GetUnionTeleportTransitionOptionObject(e))) {
      this.khi = UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.ReadUnionTeleportTransitionOption(e, this.FbDataInternal.transitionOption(t));
    }
    return this.khi;
  }
  get DisableAutoFadeInScreen() {
    if (!this.A0h) {
      this.A0h = true;
      this.x0h = this.FbDataInternal.disableAutoFadeInScreen();
    }
    return this.x0h;
  }
}
exports.FbSetPlayerPos = FbSetPlayerPos;
//# sourceMappingURL=FbSetPlayerPos.js.map