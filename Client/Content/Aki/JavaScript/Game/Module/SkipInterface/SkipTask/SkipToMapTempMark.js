"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToMapTempMark = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
class SkipToMapTempMark extends SkipTask_1.SkipTask {
  OnRun(e) {
    var e = Number(e);
    var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SkipInterface", 63, "跳转失败，静态标记配置不存在", ["mapMarkId", e]);
      }
    } else {
      ModelManager_1.ModelManager.MapModel.CreateTempMapMark(e);
      e = {
        MarkId: e,
        MarkType: r.ObjectType
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, e);
    }
    this.Finish();
  }
}
exports.SkipToMapTempMark = SkipToMapTempMark;
//# sourceMappingURL=SkipToMapTempMark.js.map