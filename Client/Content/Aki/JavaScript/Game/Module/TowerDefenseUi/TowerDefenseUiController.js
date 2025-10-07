"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseUiController = undefined;
const Stats_1 = require("../../../Core/Common/Stats");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const TowerDefenseHeadStateManager_1 = require("./HeadState/TowerDefenseHeadStateManager");
class TowerDefenseUiController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.HeadStateManager = new TowerDefenseHeadStateManager_1.TowerDefenseHeadStateManager();
    this.HeadStateManager.Init();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    return true;
  }
  static OnLeaveLevel() {
    if (this.HeadStateManager) {
      this.HeadStateManager.Clear();
    }
    return !(this.IsEnable = false);
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    if (this.HeadStateManager) {
      this.HeadStateManager.Clear();
      this.HeadStateManager = undefined;
    }
    return !(this.IsEnable = false);
  }
  static OnTick(e) {
    if (this.IsEnable) {
      TowerDefenseUiController.gW.Start();
      this.HeadStateManager?.Tick(e);
      TowerDefenseUiController.gW.Stop();
    }
  }
}
(exports.TowerDefenseUiController = TowerDefenseUiController).gW = Stats_1.Stat.Create("TowerDefenseUiController.OnTick");
TowerDefenseUiController.HeadStateManager = undefined;
TowerDefenseUiController.IsEnable = false;
TowerDefenseUiController.nye = () => {
  TowerDefenseUiController.IsEnable = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController !== undefined;
  if (TowerDefenseUiController.IsEnable) {
    TowerDefenseUiController.HeadStateManager?.OnWorldDone();
  }
}; //# sourceMappingURL=TowerDefenseUiController.js.map