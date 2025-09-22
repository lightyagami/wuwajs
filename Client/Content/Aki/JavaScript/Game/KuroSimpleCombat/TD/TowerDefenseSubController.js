"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseSubController = undefined;
const TrapDefenseBattleGuideManager_1 = require("../../Module/GameMainView/TrapDefense/Guide/TrapDefenseBattleGuideManager");
const TowerDefenseEventController_1 = require("../../Module/TowerDefenseEvent/TowerDefenseEventController");
const TrapDefensePsFeedbackManager_1 = require("../../Module/TrapDefense/TrapDefensePsFeedbackManager");
const KscSubControllerBase_1 = require("../KscSubControllerBase");
const TDInputController_1 = require("./TDInput/TDInputController");
const TDPlayerController_1 = require("./TDPlayer/TDPlayerController");
const TowerDefenseSubModel_1 = require("./TowerDefenseSubModel");
class TowerDefenseSubController extends KscSubControllerBase_1.KscSubControllerBase {
  OnInit() {
    TDPlayerController_1.TowerDefensePlayerController.OnInit();
  }
  OnClear() {
    TDPlayerController_1.TowerDefensePlayerController.OnClear();
  }
  OnTick(e) {
    TowerDefenseEventController_1.TowerDefenseEventController.OnTick(e);
  }
  CreateModel() {
    this.SubModel = new TowerDefenseSubModel_1.TowerDefenseSubModel();
  }
  IsTargetMap(e) {
    return e === 37;
  }
  OnInitMap() {
    TowerDefenseEventController_1.TowerDefenseEventController.InitMap();
  }
  OnWorldDone() {
    TDPlayerController_1.TowerDefensePlayerController.OnStart();
    TDInputController_1.TowerDefenseInputController.OnStart();
    TrapDefensePsFeedbackManager_1.TrapDefensePsFeedbackManager.Initialize();
    TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.Initialize();
    TowerDefenseEventController_1.TowerDefenseEventController.OnWorldDone();
  }
  OnWorldReset() {
    TowerDefenseEventController_1.TowerDefenseEventController.OnWorldReset();
    TDPlayerController_1.TowerDefensePlayerController.OnStop();
    TDInputController_1.TowerDefenseInputController.OnStop();
    TrapDefensePsFeedbackManager_1.TrapDefensePsFeedbackManager.Clear();
    TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.Clear();
  }
  OnEntityRemoved(e, r) {
    TowerDefenseEventController_1.TowerDefenseEventController.OnEntityRemoved(e, r);
  }
  CreateEntityFilter() {
    this.RedirectFilter = TowerDefenseEventController_1.TowerDefenseEventController.EntityRedirectFilter;
  }
  AddKscPlayerEntity() {}
}
exports.TowerDefenseSubController = TowerDefenseSubController;
//# sourceMappingURL=TowerDefenseSubController.js.map