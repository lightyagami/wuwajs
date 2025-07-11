"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPrefabEffectConfig = undefined;
class FbPrefabEffectConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.iKh = false;
    this.rKh = 0;
    this.sKh = false;
    this.aKh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPrefabEffectConfig(t);
    }
  }
  get LevelTag() {
    if (!this.iKh) {
      this.iKh = true;
      this.rKh = this.FbDataInternal.levelTag();
    }
    return this.rKh;
  }
  get SceneInteractionEffectState() {
    if (!this.sKh) {
      this.sKh = true;
      this.aKh = this.FbDataInternal.sceneInteractionEffectState();
    }
    return this.aKh;
  }
}
exports.FbPrefabEffectConfig = FbPrefabEffectConfig;
//# sourceMappingURL=FbPrefabEffectConfig.js.map