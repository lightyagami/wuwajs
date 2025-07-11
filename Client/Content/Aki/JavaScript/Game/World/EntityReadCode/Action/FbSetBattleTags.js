"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetBattleTags = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbSetBattleTagConfig_1 = require("./FbSetBattleTagConfig");
class FbSetBattleTags {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Gvh = false;
    this.Ovh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetBattleTags(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Configs() {
    if (!this.Gvh) {
      this.Gvh = true;
      this.Ovh = new Array();
      var e = this.FbDataInternal.configsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.configs(t, new fb_action_1.SetBattleTagConfig());
          this.Ovh.push(FbSetBattleTagConfig_1.FbSetBattleTagConfig.Create(i));
        }
      }
    }
    return this.Ovh;
  }
}
exports.FbSetBattleTags = FbSetBattleTags;
//# sourceMappingURL=FbSetBattleTags.js.map