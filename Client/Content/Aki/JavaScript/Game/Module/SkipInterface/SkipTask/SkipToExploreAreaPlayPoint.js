"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToExploreAreaPlayPoint = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
class SkipToExploreAreaPlayPoint extends SkipTask_1.SkipTask {
  OnRun(o, r) {
    var o = Number(o);
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(o);
    if (e <= 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SkipInterface", 69, "SkipToExploreAreaPlayPoint 区域Id错误", ["配置区域id", o], ["一级区域id", e]);
      }
    } else if (o = Number(r)) {
      r = {
        MarkId: undefined,
        MarkType: 0,
        FocusExplorePlayPoint: [e, o]
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, r);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SkipInterface", 69, "SkipToExploreAreaPlayPoint 探索类型错误", ["探索类型", o]);
    }
    this.Finish();
  }
}
exports.SkipToExploreAreaPlayPoint = SkipToExploreAreaPlayPoint;
//# sourceMappingURL=SkipToExploreAreaPlayPoint.js.map