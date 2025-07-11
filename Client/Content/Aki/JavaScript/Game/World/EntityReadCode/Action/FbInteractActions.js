"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractActions = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
class FbInteractActions {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInteractActions(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.A_h;
  }
}
exports.FbInteractActions = FbInteractActions;
//# sourceMappingURL=FbInteractActions.js.map