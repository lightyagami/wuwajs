"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRenjuConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbRenjuConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.bNh = false;
    this.LNh = undefined;
    this.FOh = false;
    this.NOh = undefined;
    this.ANh = false;
    this.xNh = 0;
    this.V1h = false;
    this.j1h = undefined;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRenjuConfig(t);
    }
  }
  get Controller() {
    if (!this.bNh) {
      this.bNh = true;
      this.LNh = this.FbDataInternal.controller();
    }
    return this.LNh;
  }
  get Order() {
    if (!this.FOh) {
      this.FOh = true;
      this.NOh = this.FbDataInternal.order();
    }
    return this.NOh;
  }
  get RenjuCount() {
    if (!this.ANh) {
      this.ANh = true;
      this.xNh = this.FbDataInternal.renjuCount();
    }
    return this.xNh;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
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
exports.FbRenjuConfig = FbRenjuConfig;
//# sourceMappingURL=FbRenjuConfig.js.map