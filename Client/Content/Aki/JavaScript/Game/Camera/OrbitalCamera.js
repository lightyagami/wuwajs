"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrbitalCamera = undefined;
const Entity_1 = require("../../Core/Entity/Entity");
const GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator");
const OrbitalCameraPlayerComponent_1 = require("./OrbitalCameraPlayerComponent");
const SequenceCameraDisplayComponent_1 = require("./SequenceCameraDisplayComponent");
class OrbitalCamera extends Entity_1.Entity {
  constructor() {
    super(...arguments);
    this.ele = undefined;
    this.yme = undefined;
  }
  static StaticGameBudgetConfig() {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTick2Config;
  }
  get DisplayComponent() {
    return this.ele;
  }
  get PlayerComponent() {
    return this.yme;
  }
  OnCreate() {
    return !!this.AddComponent(SequenceCameraDisplayComponent_1.SequenceCameraDisplayComponent) && !!this.AddComponent(OrbitalCameraPlayerComponent_1.OrbitalCameraPlayerComponent) && (this.RegisterToGameBudgetController(undefined), true);
  }
  OnStart() {
    this.ele = this.GetComponent(9);
    this.yme = this.GetComponent(6);
    return true;
  }
  OnClear() {
    this.ele = undefined;
    return !(this.yme = undefined);
  }
}
exports.OrbitalCamera = OrbitalCamera;
//# sourceMappingURL=OrbitalCamera.js.map