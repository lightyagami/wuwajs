"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSwitcherComponent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbSwitcherComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Euh = false;
    this.Iuh = undefined;
    this.d_h = false;
    this.m_h = undefined;
    this.akh = false;
    this.hkh = undefined;
    this.lkh = false;
    this._kh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSwitcherComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Content() {
    if (!this.Euh) {
      this.Euh = true;
      this.Iuh = this.FbDataInternal.content();
    }
    return this.Iuh;
  }
  get Icon() {
    if (!this.d_h) {
      this.d_h = true;
      this.m_h = this.FbDataInternal.icon();
    }
    return this.m_h;
  }
  get OnActions() {
    if (!this.akh) {
      this.akh = true;
      this.hkh = new Array();
      var i = this.FbDataInternal.onActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.onActions(t, new fb_action_1.ActionInfo());
          this.hkh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.hkh;
  }
  get OffActions() {
    if (!this.lkh) {
      this.lkh = true;
      this._kh = new Array();
      var i = this.FbDataInternal.offActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.offActions(t, new fb_action_1.ActionInfo());
          this._kh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this._kh;
  }
}
exports.FbSwitcherComponent = FbSwitcherComponent;
//# sourceMappingURL=FbSwitcherComponent.js.map