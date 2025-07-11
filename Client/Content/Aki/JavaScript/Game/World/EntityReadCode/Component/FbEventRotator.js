"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEventRotator = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbEventRotator {
  constructor(t) {
    this.FbDataInternal = t;
    this.rqh = false;
    this.oqh = undefined;
    this.nqh = false;
    this.sqh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEventRotator(t);
    }
  }
  get StartActions() {
    if (!this.rqh) {
      this.rqh = true;
      this.oqh = new Array();
      var i = this.FbDataInternal.startActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.startActions(t, new fb_action_1.ActionInfo());
          this.oqh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.oqh;
  }
  get EndActions() {
    if (!this.nqh) {
      this.nqh = true;
      this.sqh = new Array();
      var i = this.FbDataInternal.endActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.endActions(t, new fb_action_1.ActionInfo());
          this.sqh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
      }
    }
    return this.sqh;
  }
}
exports.FbEventRotator = FbEventRotator;
//# sourceMappingURL=FbEventRotator.js.map