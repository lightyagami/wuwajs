"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
class SceneEffectStateManager {
  static GetPostProcessVolume() {
    if (this.PostProcessVolume === undefined) {
      this.PostProcessVolume = ActorSystem_1.ActorSystem.Get(UE.SceneEffectStatePostVolume_C.StaticClass(), undefined);
    }
    return this.PostProcessVolume;
  }
  static SetSceneEffectState(e, t) {
    switch (e) {
      case 0:
        SceneEffectStateManager.SetAirWall(t);
        break;
      case 1:
        SceneEffectStateManager.SetToxicFog(t);
    }
  }
  static SetAirWall(e) {
    if (SceneEffectStateManager.GetPostProcessVolume()?.IsValid()) {
      SceneEffectStateManager.GetPostProcessVolume().SetAirWall(e);
    }
  }
  static SetToxicFog(e) {
    if (SceneEffectStateManager.GetPostProcessVolume()?.IsValid()) {
      SceneEffectStateManager.GetPostProcessVolume().SetToxicFog(e);
    }
  }
}
SceneEffectStateManager.PostProcessVolume = undefined;
exports.default = SceneEffectStateManager; //# sourceMappingURL=SceneEffectStateManager.js.map