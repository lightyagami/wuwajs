"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableLevelPlay = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbEnableLevelPlayConfig_1 = require("./FbEnableLevelPlayConfig");
class FbEnableLevelPlay {
  constructor(e) {
    this.FbDataInternal = e;
    this.Gvh = false;
    this.Ovh = undefined;
    this.AQl = false;
    this.xQl = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbEnableLevelPlay(e);
    }
  }
  get Configs() {
    if (!this.Gvh) {
      this.Gvh = true;
      this.Ovh = new Array();
      var t = this.FbDataInternal.configsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.configs(e, new fb_action_1.EnableLevelPlayConfig());
          this.Ovh.push(FbEnableLevelPlayConfig_1.FbEnableLevelPlayConfig.Create(i));
        }
      }
    }
    return this.Ovh;
  }
  get TargetPlayer() {
    if (!this.AQl) {
      this.AQl = true;
      this.xQl = this.FbDataInternal.targetPlayer();
    }
    return this.xQl;
  }
}
exports.FbEnableLevelPlay = FbEnableLevelPlay;
//# sourceMappingURL=FbEnableLevelPlay.js.map