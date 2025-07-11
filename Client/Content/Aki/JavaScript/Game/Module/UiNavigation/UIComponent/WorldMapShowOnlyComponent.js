"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapShowOnlyComponent = undefined;
const ActivityMowingRiskController_1 = require("../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class WorldMapShowOnlyComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(n) {
    if (ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.CheckInInstanceDungeon() || InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CheckInstanceShieldView("WorldMapView")) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
  OnIsOccupancyFightInput() {
    return false;
  }
}
exports.WorldMapShowOnlyComponent = WorldMapShowOnlyComponent;
//# sourceMappingURL=WorldMapShowOnlyComponent.js.map