"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixAction = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbFixAction {
  constructor(i) {
    this.FbDataInternal = i;
    this.nZh = false;
    this.sZh = undefined;
    this.f_h = false;
    this.X6o = undefined;
    this.aZh = false;
    this.hZh = undefined;
    this.lZh = false;
    this._Zh = false;
  }
  static Create(i) {
    if (i) {
      return new FbFixAction(i);
    }
  }
  get Timing() {
    if (!this.nZh) {
      this.nZh = true;
      this.sZh = this.FbDataInternal.timing();
    }
    return this.sZh;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get ThenActions() {
    if (!this.aZh) {
      this.aZh = true;
      this.hZh = new Array();
      var t = this.FbDataInternal.thenActionsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var s = this.FbDataInternal.thenActions(i, new fb_action_1.ActionInfo());
          this.hZh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.hZh;
  }
  get Period() {
    if (!this.lZh) {
      this.lZh = true;
      this._Zh = this.FbDataInternal.period();
    }
    return this._Zh;
  }
}
exports.FbFixAction = FbFixAction;
//# sourceMappingURL=FbFixAction.js.map