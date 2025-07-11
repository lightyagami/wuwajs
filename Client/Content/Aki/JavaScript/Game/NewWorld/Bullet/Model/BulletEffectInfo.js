"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletEffectInfo = undefined;
const EffectSystem_1 = require("../../../Effect/EffectSystem");
class BulletEffectInfo {
  constructor() {
    this.EffectData = undefined;
    this.Effect = 0;
    this.EffectExtremity = 0;
    this.EffectBlock = 0;
    this.HandOver = false;
    this.IsFinishAuto = false;
    this.EffectOriginSize = -0;
    this.IsEffectDestroy = false;
    this.DisablePostProcess = false;
  }
  Clear() {
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectExtremity)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.EffectExtremity, "[BulletEffectInfo.Clear]", true);
    }
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectBlock)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.EffectBlock, "[BulletEffectInfo.Clear]", true);
    }
    this.EffectData = undefined;
    this.Effect = 0;
    this.EffectExtremity = 0;
    this.EffectBlock = 0;
    this.HandOver = false;
    this.IsFinishAuto = false;
    this.EffectOriginSize = 0;
    this.IsEffectDestroy = false;
    this.DisablePostProcess = false;
  }
}
exports.BulletEffectInfo = BulletEffectInfo;
//# sourceMappingURL=BulletEffectInfo.js.map