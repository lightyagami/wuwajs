"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOperationsAfterEntityGroupFailure = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbOperationsAfterEntityGroupFailure {
  constructor(t) {
    this.FbDataInternal = t;
    this.PVh = false;
    this.UVh = false;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOperationsAfterEntityGroupFailure(t);
    }
  }
  get IsResetState() {
    if (!this.PVh) {
      this.PVh = true;
      this.UVh = this.FbDataInternal.isResetState();
    }
    return this.UVh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.A_h;
  }
}
exports.FbOperationsAfterEntityGroupFailure = FbOperationsAfterEntityGroupFailure;
//# sourceMappingURL=FbOperationsAfterEntityGroupFailure.js.map