"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTrampleUe5Component = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbTrampleUe5Component {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.ckh = false;
    this.ukh = false;
    this.dkh = false;
    this.mkh = undefined;
    this.Ckh = false;
    this.gkh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTrampleUe5Component(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get IsDisposable() {
    if (!this.ckh) {
      this.ckh = true;
      this.ukh = this.FbDataInternal.isDisposable();
    }
    return this.ukh;
  }
  get TriggerActions() {
    if (!this.dkh) {
      this.dkh = true;
      this.mkh = new Array();
      var i = this.FbDataInternal.triggerActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.triggerActions(t, new fb_action_1.ActionInfo());
          this.mkh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.mkh;
  }
  get RecoveryActions() {
    if (!this.Ckh) {
      this.Ckh = true;
      this.gkh = new Array();
      var i = this.FbDataInternal.recoveryActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.recoveryActions(t, new fb_action_1.ActionInfo());
          this.gkh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.gkh;
  }
}
exports.FbTrampleUe5Component = FbTrampleUe5Component;
//# sourceMappingURL=FbTrampleUe5Component.js.map