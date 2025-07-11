"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToExploreAreaDetailView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
class SkipToExploreAreaDetailView extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var e = Number(e);
    var o = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
    if (o <= 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SkipInterface", 69, "SkipToExploreAreaDetailView 区域Id错误", ["配置区域id", e], ["一级区域id", o]);
      }
    } else {
      e = r ? Number(r) : undefined;
      WorldMapController_1.WorldMapController.SkipToExploreAreaDetailView(o, e);
    }
    this.Finish();
  }
}
exports.SkipToExploreAreaDetailView = SkipToExploreAreaDetailView;
//# sourceMappingURL=SkipToExploreAreaDetailView.js.map