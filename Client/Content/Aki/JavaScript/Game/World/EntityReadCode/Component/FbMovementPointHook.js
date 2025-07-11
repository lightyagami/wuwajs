"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMovementPointHook = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbMovementPointHook {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.BGh = false;
    this.qGh = undefined;
    this.kGh = false;
    this.GGh = undefined;
    this.OGh = false;
    this.FGh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMovementPointHook(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HookActions() {
    if (!this.BGh) {
      this.BGh = true;
      this.qGh = new Array();
      var i = this.FbDataInternal.hookActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.hookActions(t, new fb_action_1.ActionInfo());
          this.qGh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.qGh;
  }
  get ExitHookActions() {
    if (!this.kGh) {
      this.kGh = true;
      this.GGh = new Array();
      var i = this.FbDataInternal.exitHookActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.exitHookActions(t, new fb_action_1.ActionInfo());
          this.GGh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.GGh;
  }
  get FinishActions() {
    if (!this.OGh) {
      this.OGh = true;
      this.FGh = new Array();
      var i = this.FbDataInternal.finishActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.finishActions(t, new fb_action_1.ActionInfo());
          this.FGh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.FGh;
  }
}
exports.FbMovementPointHook = FbMovementPointHook;
//# sourceMappingURL=FbMovementPointHook.js.map