"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseSubController = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TrapDefenseBattleGuideManager_1 = require("../../Module/GameMainView/TrapDefense/Guide/TrapDefenseBattleGuideManager");
const TrapDefensePsFeedbackManager_1 = require("../../Module/TrapDefense/TrapDefensePsFeedbackManager");
const KscSubControllerBase_1 = require("../KscSubControllerBase");
const TowerDefenseSubModel_1 = require("./TowerDefenseSubModel");
class TowerDefenseSubController extends KscSubControllerBase_1.KscSubControllerBase {
  CreateModel() {
    this.SubModel = new TowerDefenseSubModel_1.TowerDefenseSubModel();
  }
  OnInitMap() {
    ControllerHolder_1.ControllerHolder.TowerDefenseEventController.InitMap();
  }
  OnWorldDone() {
    ModelManager_1.ModelManager.TowerDefensePlayerModel?.OnStart();
    ModelManager_1.ModelManager.TowerDefenseInputModel?.OnStart();
    ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.OnStart();
    ControllerHolder_1.ControllerHolder.TowerDefenseInputController.OnStart();
    TrapDefensePsFeedbackManager_1.TrapDefensePsFeedbackManager.Initialize();
    TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.Initialize();
    ControllerHolder_1.ControllerHolder.TowerDefenseEventController.OnWorldDone();
  }
  OnWorldReset() {
    ControllerHolder_1.ControllerHolder.TowerDefenseEventController.OnWorldReset();
    ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.OnStop();
    ControllerHolder_1.ControllerHolder.TowerDefenseInputController.OnStop();
    TrapDefensePsFeedbackManager_1.TrapDefensePsFeedbackManager.Clear();
    TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.Clear();
    ModelManager_1.ModelManager.TowerDefensePlayerModel?.OnStop();
    ModelManager_1.ModelManager.TowerDefenseInputModel?.OnStop();
  }
  OnEntityRemoved(e, r) {
    ControllerHolder_1.ControllerHolder.TowerDefenseEventController.OnEntityRemoved(e, r);
  }
  CreateEntityFilter() {
    this.RedirectFilter = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.EntityRedirectFilter;
  }
}
exports.TowerDefenseSubController = TowerDefenseSubController;
//# sourceMappingURL=TowerDefenseSubController.js.map