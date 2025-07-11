"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbControlPointEventConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbControlPointEventConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Afh = false;
    this.V_i = 0;
    this.gHh = false;
    this.fHh = undefined;
    this.pHh = false;
    this.vHh = undefined;
    this.yHh = false;
    this.SHh = undefined;
    this.MHh = false;
    this.EHh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbControlPointEventConfig(t);
    }
  }
  get Index() {
    if (!this.Afh) {
      this.Afh = true;
      this.V_i = this.FbDataInternal.index();
    }
    return this.V_i;
  }
  get LeftInEventActions() {
    if (!this.gHh) {
      this.gHh = true;
      this.fHh = new Array();
      var i = this.FbDataInternal.leftInEventActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.leftInEventActions(t, new fb_action_1.ActionInfo());
          this.fHh.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
      }
    }
    return this.fHh;
  }
  get LeftOutEventActions() {
    if (!this.pHh) {
      this.pHh = true;
      this.vHh = new Array();
      var i = this.FbDataInternal.leftOutEventActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.leftOutEventActions(t, new fb_action_1.ActionInfo());
          this.vHh.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
      }
    }
    return this.vHh;
  }
  get RightInEventActions() {
    if (!this.yHh) {
      this.yHh = true;
      this.SHh = new Array();
      var i = this.FbDataInternal.rightInEventActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.rightInEventActions(t, new fb_action_1.ActionInfo());
          this.SHh.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
      }
    }
    return this.SHh;
  }
  get RightOutEventActions() {
    if (!this.MHh) {
      this.MHh = true;
      this.EHh = new Array();
      var i = this.FbDataInternal.rightOutEventActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.rightOutEventActions(t, new fb_action_1.ActionInfo());
          this.EHh.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
      }
    }
    return this.EHh;
  }
}
exports.FbControlPointEventConfig = FbControlPointEventConfig;
//# sourceMappingURL=FbControlPointEventConfig.js.map