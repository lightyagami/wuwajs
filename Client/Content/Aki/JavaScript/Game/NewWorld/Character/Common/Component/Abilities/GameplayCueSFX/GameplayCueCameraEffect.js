"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueCameraEffect = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueCameraEffect extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.hJ = 0;
  }
  OnCreate() {
    if (this.CueConfig.Path && this.EntityHandle.Entity.GetComponent(3).IsAutonomousProxy) {
      if (this.hJ !== 0) {
        ModelManager_1.ModelManager.ScreenEffectModel.EndScreenEffect(this.hJ);
      }
      this.hJ = ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(this.CueConfig.Path);
    }
  }
  OnDestroy() {
    if (this.hJ !== 0) {
      ModelManager_1.ModelManager.ScreenEffectModel.EndScreenEffect(this.hJ);
      this.hJ = 0;
    }
  }
  OnEnable() {
    this.OnCreate();
  }
  OnDisable() {
    this.OnDestroy();
  }
}
exports.GameplayCueCameraEffect = GameplayCueCameraEffect;
//# sourceMappingURL=GameplayCueCameraEffect.js.map