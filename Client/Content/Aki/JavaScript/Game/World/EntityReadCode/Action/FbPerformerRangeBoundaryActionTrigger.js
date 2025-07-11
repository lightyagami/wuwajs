"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPerformerRangeBoundaryActionTrigger = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
class FbPerformerRangeBoundaryActionTrigger {
  constructor(t) {
    this.FbDataInternal = t;
    this.M_h = false;
    this.E_h = 0;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPerformerRangeBoundaryActionTrigger(t);
    }
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = this.FbDataInternal.range();
    }
    return this.E_h;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var r = this.FbDataInternal.actionsLength();
      if (r) {
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(i));
        }
      }
    }
    return this.A_h;
  }
}
exports.FbPerformerRangeBoundaryActionTrigger = FbPerformerRangeBoundaryActionTrigger;
//# sourceMappingURL=FbPerformerRangeBoundaryActionTrigger.js.map