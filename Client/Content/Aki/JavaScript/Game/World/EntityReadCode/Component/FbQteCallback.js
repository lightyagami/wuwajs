"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbQteCallback = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbQteCallback {
  constructor(t) {
    this.FbDataInternal = t;
    this.L_h = false;
    this.A_h = undefined;
    this.XYh = false;
    this.YYh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbQteCallback(t);
    }
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.A_h;
  }
  get SendSelfEvent() {
    if (!this.XYh) {
      this.XYh = true;
      this.YYh = this.FbDataInternal.sendSelfEvent();
    }
    return this.YYh;
  }
}
exports.FbQteCallback = FbQteCallback;
//# sourceMappingURL=FbQteCallback.js.map