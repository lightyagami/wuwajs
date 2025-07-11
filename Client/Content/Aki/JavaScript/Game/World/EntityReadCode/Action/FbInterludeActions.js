"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInterludeActions = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
class FbInterludeActions {
  constructor(t) {
    this.FbDataInternal = t;
    this.uvh = false;
    this.dvh = undefined;
    this.mvh = false;
    this.Cvh = undefined;
    this.gvh = false;
    this.fvh = false;
    this.pvh = false;
    this.vvh = false;
  }
  static Create(t) {
    if (t) {
      return new FbInterludeActions(t);
    }
  }
  get InterludeActionList() {
    if (!this.uvh) {
      this.uvh = true;
      this.dvh = new Array();
      var i = this.FbDataInternal.interludeActionListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.interludeActionList(t, new fb_action_1.ActionInfo());
          this.dvh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.dvh;
  }
  get DestroyEntityIds() {
    if (!this.mvh) {
      this.mvh = true;
      this.Cvh = new Array();
      var i = this.FbDataInternal.destroyEntityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Cvh.push(this.FbDataInternal.destroyEntityIds(t));
        }
      }
    }
    return this.Cvh;
  }
  get IsFadeIn() {
    if (!this.gvh) {
      this.gvh = true;
      this.fvh = this.FbDataInternal.isFadeIn();
    }
    return this.fvh;
  }
  get IsFadeOut() {
    if (!this.pvh) {
      this.pvh = true;
      this.vvh = this.FbDataInternal.isFadeOut();
    }
    return this.vvh;
  }
}
exports.FbInterludeActions = FbInterludeActions;
//# sourceMappingURL=FbInterludeActions.js.map