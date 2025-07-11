"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetCamera = undefined;
const Entity_1 = require("../../Core/Entity/Entity");
const GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator");
const WidgetCameraBlendComponent_1 = require("./WidgetCameraBlendComponent");
const WidgetCameraDisplayComponent_1 = require("./WidgetCameraDisplayComponent");
class WidgetCamera extends Entity_1.Entity {
  constructor() {
    super(...arguments);
    this.ade = undefined;
    this.ele = undefined;
  }
  static StaticGameBudgetConfig() {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTick2Config;
  }
  get BlendComponent() {
    return this.ade;
  }
  get DisplayComponent() {
    return this.ele;
  }
  OnCreate() {
    return !!this.AddComponent(WidgetCameraBlendComponent_1.WidgetCameraBlendComponent) && !!this.AddComponent(WidgetCameraDisplayComponent_1.WidgetCameraDisplayComponent) && (this.RegisterToGameBudgetController(undefined), true);
  }
  OnStart() {
    this.ade = this.GetComponent(11);
    this.ele = this.GetComponent(12);
    return true;
  }
  OnClear() {
    this.ade = undefined;
    return !(this.ele = undefined);
  }
}
exports.WidgetCamera = WidgetCamera;
//# sourceMappingURL=WidgetCamera.js.map