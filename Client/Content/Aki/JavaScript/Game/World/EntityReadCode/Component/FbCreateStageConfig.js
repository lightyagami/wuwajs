"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCreateStageConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbCreateBulletConfig_1 = require("./FbCreateBulletConfig");
class FbCreateStageConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.ijh = false;
    this.rjh = 0;
    this.ojh = false;
    this.njh = undefined;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCreateStageConfig(t);
    }
  }
  get PerformDuration() {
    if (!this.ijh) {
      this.ijh = true;
      this.rjh = this.FbDataInternal.performDuration();
    }
    return this.rjh;
  }
  get BulletConfig() {
    if (!this.ojh) {
      this.ojh = true;
      this.njh = FbCreateBulletConfig_1.FbCreateBulletConfig.Create(this.FbDataInternal.bulletConfig());
    }
    return this.njh;
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
}
exports.FbCreateStageConfig = FbCreateStageConfig;
//# sourceMappingURL=FbCreateStageConfig.js.map