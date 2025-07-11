"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceCamera = undefined;
const Entity_1 = require("../../Core/Entity/Entity");
const GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator");
const SequenceCameraDisplayComponent_1 = require("./SequenceCameraDisplayComponent");
const SequenceCameraPlayerComponent_1 = require("./SequenceCameraPlayerComponent");
class SequenceCamera extends Entity_1.Entity {
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
    return !!this.AddComponent(SequenceCameraDisplayComponent_1.SequenceCameraDisplayComponent) && !!this.AddComponent(SequenceCameraPlayerComponent_1.SequenceCameraPlayerComponent) && (this.RegisterToGameBudgetController(undefined), true);
  }
  OnStart() {
    this.ele = this.GetComponent(9);
    this.yme = this.GetComponent(10);
    return true;
  }
  OnClear() {
    this.ele = undefined;
    return !(this.yme = undefined);
  }
}
exports.SequenceCamera = SequenceCamera;
//# sourceMappingURL=SequenceCamera.js.map