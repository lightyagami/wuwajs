"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPatrolAction = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbPatrolAction {
  constructor(t) {
    this.FbDataInternal = t;
    this.zEh = false;
    this.JEh = 0;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPatrolAction(t);
    }
  }
  get Point() {
    if (!this.zEh) {
      this.zEh = true;
      this.JEh = this.FbDataInternal.point();
    }
    return this.JEh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.A_h;
  }
}
exports.FbPatrolAction = FbPatrolAction;
//# sourceMappingURL=FbPatrolAction.js.map