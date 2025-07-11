"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightCamera = undefined;
const Entity_1 = require("../../Core/Entity/Entity");
const StatDefine_1 = require("../Common/StatDefine");
const GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator");
const FightCameraDisplayComponent_1 = require("./FightCameraDisplayComponent");
const FightCameraLogicComponent_1 = require("./FightCameraLogicComponent");
class FightCamera extends Entity_1.Entity {
  constructor() {
    super(...arguments);
    this.Zhe = undefined;
    this.ele = undefined;
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
  OnCreate() {
    return !!this.AddComponent(FightCameraLogicComponent_1.FightCameraLogicComponent) && !!this.AddComponent(FightCameraDisplayComponent_1.FightCameraDisplayComponent) && (this.RegisterToGameBudgetController(undefined), true);
  }
  OnStart() {
    this.Zhe = this.GetComponent(5);
    this.ele = this.GetComponent(4);
    return true;
  }
  OnClear() {
    this.Zhe = undefined;
    return !(this.ele = undefined);
  }
  Tick(t) {
    if (StatDefine_1.BATTLESTAT_ENABLED) {
      StatDefine_1.battleStat.FightCameraTick?.Start();
    }
    super.Tick(t);
    if (StatDefine_1.BATTLESTAT_ENABLED) {
      StatDefine_1.battleStat.FightCameraTick?.Stop();
    }
  }
}
exports.FightCamera = FightCamera;
//# sourceMappingURL=FightCamera.js.map