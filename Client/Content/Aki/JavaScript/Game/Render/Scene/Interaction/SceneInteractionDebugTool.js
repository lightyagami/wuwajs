"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const SceneInteractionManager_1 = require("./SceneInteractionManager");
const SceneObjectWaterEffect_1 = require("./SceneObjectWaterEffect");
class SceneInteractionDebugTool extends UE.Actor {
  constructor() {
    super(...arguments);
    this.Config = undefined;
    this.TargetActor = undefined;
    this.Interaction = undefined;
  }
  Constructor() {
    this.Interaction = undefined;
  }
  AttachInteraction() {
    if (!this.TargetActor) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 25, "SceneInteractionDebugTool缺少目标对象");
      }
    }
    if (this.Interaction && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Render", 25, "SceneInteractionDebugTool勿重复添加");
    }
    this.Interaction = new SceneObjectWaterEffect_1.SceneObjectWaterEffect();
    this.Interaction.Start(this.Config, this.TargetActor.K2_GetRootComponent());
    SceneInteractionManager_1.SceneInteractionManager.Get().RegisterWaterEffectObject(this.Interaction);
  }
  RemoveInteraction() {
    if (this.Interaction) {
      SceneInteractionManager_1.SceneInteractionManager.Get().UnregisterWaterEffectObject(this.Interaction);
      this.Interaction = undefined;
    }
  }
}
exports.default = SceneInteractionDebugTool;
//# sourceMappingURL=SceneInteractionDebugTool.js.map