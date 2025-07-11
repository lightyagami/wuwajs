"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemShipTower = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemShipTower extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (e) {
      await UiManager_1.UiManager.OpenViewAsync("ShipTowerView");
    }
    return true;
  }
  GetViewName(e, r) {
    return "ShipTowerView";
  }
}
exports.OpenSystemShipTower = OpenSystemShipTower;
//# sourceMappingURL=OpenSystemShipTower.js.map