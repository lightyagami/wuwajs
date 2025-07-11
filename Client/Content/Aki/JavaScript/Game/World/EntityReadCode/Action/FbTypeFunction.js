"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTypeFunction = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
class FbTypeFunction {
  constructor(t) {
    this.FbDataInternal = t;
    this.x_h = false;
    this.FGi = undefined;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTypeFunction(t);
    }
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.A_h;
  }
}
exports.FbTypeFunction = FbTypeFunction;
//# sourceMappingURL=FbTypeFunction.js.map