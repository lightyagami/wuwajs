"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemFishingDock = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFishingDock extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, a) {
    if (e && (e = e.BoardId, ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(e))) {
      ModelManager_1.ModelManager.FishingModel.DockId = e;
      await UiManager_1.UiManager.OpenViewAsync("FishingLoadingView", true);
    }
    return true;
  }
  GetViewName(e, a) {
    return "FishingDockView";
  }
}
exports.OpenSystemFishingDock = OpenSystemFishingDock;
//# sourceMappingURL=OpenSystemFishingDock.js.map