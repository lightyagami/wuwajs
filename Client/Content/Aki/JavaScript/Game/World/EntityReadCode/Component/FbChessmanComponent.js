"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChessmanComponent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbChessmanComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.VXh = false;
    this.jXh = undefined;
    this.HXh = false;
    this.WXh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChessmanComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get StartMovingActions() {
    if (!this.VXh) {
      this.VXh = true;
      this.jXh = new Array();
      var i = this.FbDataInternal.startMovingActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.startMovingActions(t, new fb_action_1.ActionInfo());
          this.jXh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.jXh;
  }
  get EndMovingActions() {
    if (!this.HXh) {
      this.HXh = true;
      this.WXh = new Array();
      var i = this.FbDataInternal.endMovingActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.endMovingActions(t, new fb_action_1.ActionInfo());
          this.WXh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.WXh;
  }
}
exports.FbChessmanComponent = FbChessmanComponent;
//# sourceMappingURL=FbChessmanComponent.js.map