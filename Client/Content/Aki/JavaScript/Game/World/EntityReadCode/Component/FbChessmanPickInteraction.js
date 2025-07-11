"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChessmanPickInteraction = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbChessmanPickInteraction {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.V$h = false;
    this.j$h = undefined;
    this.H$h = false;
    this.W$h = undefined;
    this.Q$h = false;
    this.K$h = 0;
    this.$$h = false;
    this.X$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChessmanPickInteraction(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CheckedActions() {
    if (!this.V$h) {
      this.V$h = true;
      this.j$h = new Array();
      var i = this.FbDataInternal.checkedActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.checkedActions(t, new fb_action_1.ActionInfo());
          this.j$h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.j$h;
  }
  get UncheckedActions() {
    if (!this.H$h) {
      this.H$h = true;
      this.W$h = new Array();
      var i = this.FbDataInternal.uncheckedActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.uncheckedActions(t, new fb_action_1.ActionInfo());
          this.W$h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.W$h;
  }
  get TargetChessboard() {
    if (!this.Q$h) {
      this.Q$h = true;
      this.K$h = this.FbDataInternal.targetChessboard();
    }
    return this.K$h;
  }
  get AvailablePosEffect() {
    if (!this.$$h) {
      this.$$h = true;
      this.X$h = this.FbDataInternal.availablePosEffect();
    }
    return this.X$h;
  }
}
exports.FbChessmanPickInteraction = FbChessmanPickInteraction;
//# sourceMappingURL=FbChessmanPickInteraction.js.map