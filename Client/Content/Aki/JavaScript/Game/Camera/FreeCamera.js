"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeCamera = undefined;
const Entity_1 = require("../../Core/Entity/Entity");
const GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator");
const FreeCameraDisplayComponent_1 = require("./FreeCameraDisplayComponent");
const FreeCameraInputComponent_1 = require("./FreeCameraInputComponent");
const FreeCameraLogicComponent_1 = require("./FreeCameraLogicComponent");
class FreeCamera extends Entity_1.Entity {
  constructor() {
    super(...arguments);
    this.Zhe = undefined;
    this.ele = undefined;
    this.yB1 = undefined;
  }
  static StaticGameBudgetConfig() {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTick2Config;
  }
  get LogicComponent() {
    return this.Zhe;
  }
  get DisplayComponent() {
    return this.ele;
  }
  get InputComponent() {
    return this.yB1;
  }
  OnCreate() {
    return !!this.AddComponent(FreeCameraLogicComponent_1.FreeCameraLogicComponent) && !!this.AddComponent(FreeCameraDisplayComponent_1.FreeCameraDisplayComponent) && !!this.AddComponent(FreeCameraInputComponent_1.FreeCameraInputComponent) && !(this.RegisterToGameBudgetController(undefined), 0);
  }
  OnStart() {
    this.Zhe = this.GetComponent(292);
    this.ele = this.GetComponent(291);
    this.yB1 = this.GetComponent(293);
    return true;
  }
  OnClear() {
    this.Zhe = undefined;
    this.ele = undefined;
    return !(this.yB1 = undefined);
  }
}
exports.FreeCamera = FreeCamera;
//# sourceMappingURL=FreeCamera.js.map