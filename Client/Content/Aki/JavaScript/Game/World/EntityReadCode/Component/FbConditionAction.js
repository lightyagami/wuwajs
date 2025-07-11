"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConditionAction = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbConditionAction {
  constructor(i) {
    this.FbDataInternal = i;
    this.f_h = false;
    this.X6o = undefined;
    this.QUh = false;
    this.KUh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbConditionAction(i);
    }
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get Action() {
    if (!this.QUh) {
      this.QUh = true;
      this.KUh = new Array();
      var t = this.FbDataInternal.actionLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var o = this.FbDataInternal.action(i, new fb_action_1.ActionInfo());
          this.KUh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.KUh;
  }
}
exports.FbConditionAction = FbConditionAction;
//# sourceMappingURL=FbConditionAction.js.map