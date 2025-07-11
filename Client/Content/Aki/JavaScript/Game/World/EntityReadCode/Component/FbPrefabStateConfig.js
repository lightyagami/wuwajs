"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPrefabStateConfig = undefined;
class FbPrefabStateConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.iKh = false;
    this.rKh = 0;
    this.oKh = false;
    this.nKh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPrefabStateConfig(t);
    }
  }
  get LevelTag() {
    if (!this.iKh) {
      this.iKh = true;
      this.rKh = this.FbDataInternal.levelTag();
    }
    return this.rKh;
  }
  get SceneInteractionState() {
    if (!this.oKh) {
      this.oKh = true;
      this.nKh = this.FbDataInternal.sceneInteractionState();
    }
    return this.nKh;
  }
}
exports.FbPrefabStateConfig = FbPrefabStateConfig;
//# sourceMappingURL=FbPrefabStateConfig.js.map