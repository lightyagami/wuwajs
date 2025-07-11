"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBeamReceiveComponent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbBeamReceiveComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.I_h = false;
    this.y6o = 0;
    this.bKh = false;
    this.LKh = undefined;
    this.AKh = false;
    this.xKh = undefined;
    this.RKh = false;
    this.wKh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBeamReceiveComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
  get BeginActions() {
    if (!this.bKh) {
      this.bKh = true;
      this.LKh = new Array();
      var i = this.FbDataInternal.beginActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.beginActions(t, new fb_action_1.ActionInfo());
          this.LKh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.LKh;
  }
  get CompleteActions() {
    if (!this.AKh) {
      this.AKh = true;
      this.xKh = new Array();
      var i = this.FbDataInternal.completeActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.completeActions(t, new fb_action_1.ActionInfo());
          this.xKh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.xKh;
  }
  get StopActions() {
    if (!this.RKh) {
      this.RKh = true;
      this.wKh = new Array();
      var i = this.FbDataInternal.stopActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stopActions(t, new fb_action_1.ActionInfo());
          this.wKh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.wKh;
  }
}
exports.FbBeamReceiveComponent = FbBeamReceiveComponent;
//# sourceMappingURL=FbBeamReceiveComponent.js.map