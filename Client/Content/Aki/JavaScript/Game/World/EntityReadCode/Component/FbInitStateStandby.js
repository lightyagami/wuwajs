"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInitStateStandby = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbInitStateStandby {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bvh = false;
    this.Lvh = undefined;
    this.ich = false;
    this.rch = undefined;
    this.YRh = false;
    this.zRh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInitStateStandby(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get StandbyTags() {
    if (!this.bvh) {
      this.bvh = true;
      this.Lvh = new Array();
      var i = this.FbDataInternal.standbyTagsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Lvh.push(this.FbDataInternal.standbyTags(t));
        }
      }
    }
    return this.Lvh;
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = new Array();
      var i = this.FbDataInternal.conditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.conditions(t, new fb_condition_1.ConditionGroup());
          this.rch.push(FbConditionGroup_1.FbConditionGroup.Create(s));
        }
      }
    }
    return this.rch;
  }
  get Wander() {
    if (!this.YRh) {
      this.YRh = true;
      this.zRh = this.FbDataInternal.wander();
    }
    return this.zRh;
  }
}
exports.FbInitStateStandby = FbInitStateStandby;
//# sourceMappingURL=FbInitStateStandby.js.map