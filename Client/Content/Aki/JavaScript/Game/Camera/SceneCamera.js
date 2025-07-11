"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneCamera = undefined;
const Entity_1 = require("../../Core/Entity/Entity");
const GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator");
const SceneCameraDisplayComponent_1 = require("./SceneCameraDisplayComponent");
const SceneCameraPlayerComponent_1 = require("./SceneCameraPlayerComponent");
class SceneCamera extends Entity_1.Entity {
  constructor() {
    super(...arguments);
    this.ele = undefined;
    this.yme = undefined;
  }
  static StaticGameBudgetConfig() {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTick2Config;
  }
  get CameraActor() {
    return this.ele?.CineCamera;
  }
  get DisplayComponent() {
    return this.ele;
  }
  get PlayerComponent() {
    return this.yme;
  }
  OnCreate() {
    return !!this.AddComponent(SceneCameraDisplayComponent_1.SceneCameraDisplayComponent) && !!this.AddComponent(SceneCameraPlayerComponent_1.SceneCameraPlayerComponent) && (this.RegisterToGameBudgetController(undefined), true);
  }
  OnStart() {
    this.ele = this.GetComponent(7);
    this.yme = this.GetComponent(8);
    return true;
  }
  OnClear() {
    this.ele = undefined;
    return !(this.yme = undefined);
  }
}
exports.SceneCamera = SceneCamera;
//# sourceMappingURL=SceneCamera.js.map