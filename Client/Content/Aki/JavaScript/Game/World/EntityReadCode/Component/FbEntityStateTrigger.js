"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityStateTrigger = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
const FbEntityGroupCondition_1 = require("../Condition/FbEntityGroupCondition");
class FbEntityStateTrigger {
  constructor(t) {
    this.FbDataInternal = t;
    this.MVh = false;
    this.EVh = undefined;
    this.IVh = false;
    this.TVh = undefined;
    this.bVh = false;
    this.LVh = undefined;
    this.f_h = false;
    this.X6o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityStateTrigger(t);
    }
  }
  get GroupCondition() {
    if (!this.MVh) {
      this.MVh = true;
      this.EVh = FbEntityGroupCondition_1.FbEntityGroupCondition.Create(this.FbDataInternal.groupCondition());
    }
    return this.EVh;
  }
  get SuccessActions() {
    if (!this.IVh) {
      this.IVh = true;
      this.TVh = new Array();
      var i = this.FbDataInternal.successActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.successActions(t, new fb_action_1.ActionInfo());
          this.TVh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.TVh;
  }
  get FailActions() {
    if (!this.bVh) {
      this.bVh = true;
      this.LVh = new Array();
      var i = this.FbDataInternal.failActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.failActions(t, new fb_action_1.ActionInfo());
          this.LVh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.LVh;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
}
exports.FbEntityStateTrigger = FbEntityStateTrigger;
//# sourceMappingURL=FbEntityStateTrigger.js.map