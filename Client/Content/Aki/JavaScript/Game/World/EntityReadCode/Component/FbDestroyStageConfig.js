"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestroyStageConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbDestroyStageConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.ijh = false;
    this.rjh = 0;
    this.p0h = false;
    this.nXs = 0;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDestroyStageConfig(t);
    }
  }
  get PerformDuration() {
    if (!this.ijh) {
      this.ijh = true;
      this.rjh = this.FbDataInternal.performDuration();
    }
    return this.rjh;
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = Number(this.FbDataInternal.bulletId());
    }
    return this.nXs;
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
exports.FbDestroyStageConfig = FbDestroyStageConfig;
//# sourceMappingURL=FbDestroyStageConfig.js.map