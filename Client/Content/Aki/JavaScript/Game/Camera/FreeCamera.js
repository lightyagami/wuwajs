"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FreeCamera = void 0;
const Entity_1 = require("../../Core/Entity/Entity"),
  GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
  FreeCameraDisplayComponent_1 = require("./FreeCameraDisplayComponent"),
  FreeCameraInputComponent_1 = require("./FreeCameraInputComponent"),
  FreeCameraLogicComponent_1 = require("./FreeCameraLogicComponent");
class FreeCamera extends Entity_1.Entity {
  constructor() {
    super(...arguments), this.Zhe = void 0, this.ele = void 0, this.jU1 = void 0
  }
  static StaticGameBudgetConfig() {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTick2Config
  }
  get LogicComponent() {
    return this.Zhe
  }
  get DisplayComponent() {
    return this.ele
  }
  get InputComponent() {
    return this.jU1
  }
  OnCreate() {
    return !(!this.AddComponent(FreeCameraLogicComponent_1.FreeCameraLogicComponent) || !this.AddComponent(FreeCameraDisplayComponent_1.FreeCameraDisplayComponent) || !this.AddComponent(FreeCameraInputComponent_1.FreeCameraInputComponent) || (this.RegisterToGameBudgetController(void 0), 0))
  }
  OnStart() {
    return this.Zhe = this.GetComponent(286), this.ele = this.GetComponent(285), this.jU1 = this.GetComponent(287), !0
  }
  OnClear() {
    return this.Zhe = void 0, this.ele = void 0, !(this.jU1 = void 0)
  }
}
exports.FreeCamera = FreeCamera;
//# sourceMappingURL=FreeCamera.js.map