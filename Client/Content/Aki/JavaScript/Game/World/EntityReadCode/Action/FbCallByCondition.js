"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCallByCondition = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
const FbConditions_1 = require("./FbConditions");
class FbCallByCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.ich = false;
    this.rch = undefined;
    this.och = false;
    this.nch = undefined;
    this.sch = false;
    this.ach = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCallByCondition(t);
    }
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = FbConditions_1.FbConditions.Create(this.FbDataInternal.conditions());
    }
    return this.rch;
  }
  get TrueActions() {
    if (!this.och) {
      this.och = true;
      this.nch = new Array();
      var i = this.FbDataInternal.trueActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.trueActions(t, new fb_action_1.ActionInfo());
          this.nch.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.nch;
  }
  get FalseActions() {
    if (!this.sch) {
      this.sch = true;
      this.ach = new Array();
      var i = this.FbDataInternal.falseActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.falseActions(t, new fb_action_1.ActionInfo());
          this.ach.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.ach;
  }
}
exports.FbCallByCondition = FbCallByCondition;
//# sourceMappingURL=FbCallByCondition.js.map