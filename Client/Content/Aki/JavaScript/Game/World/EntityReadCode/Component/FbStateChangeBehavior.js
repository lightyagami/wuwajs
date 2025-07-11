"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStateChangeBehavior = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbConditionAction_1 = require("./FbConditionAction");
const FbDelayChangeState_1 = require("./FbDelayChangeState");
class FbStateChangeBehavior {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
    this.QUh = false;
    this.KUh = undefined;
    this.$Uh = false;
    this.XUh = undefined;
    this.YUh = false;
    this.zUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStateChangeBehavior(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get Action() {
    if (!this.QUh) {
      this.QUh = true;
      this.KUh = new Array();
      var i = this.FbDataInternal.actionLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.action(t, new fb_action_1.ActionInfo());
          this.KUh.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.KUh;
  }
  get DelayChangeState() {
    if (!this.$Uh) {
      this.$Uh = true;
      this.XUh = FbDelayChangeState_1.FbDelayChangeState.Create(this.FbDataInternal.delayChangeState());
    }
    return this.XUh;
  }
  get ConditionAction() {
    if (!this.YUh) {
      this.YUh = true;
      this.zUh = new Array();
      var i = this.FbDataInternal.conditionActionLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.conditionAction(t, new fb_component_1.ConditionAction());
          this.zUh.push(FbConditionAction_1.FbConditionAction.Create(e));
        }
      }
    }
    return this.zUh;
  }
}
exports.FbStateChangeBehavior = FbStateChangeBehavior;
//# sourceMappingURL=FbStateChangeBehavior.js.map