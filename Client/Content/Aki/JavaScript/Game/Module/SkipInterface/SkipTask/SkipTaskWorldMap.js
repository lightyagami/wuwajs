"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskWorldMap = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
class SkipTaskWorldMap extends SkipTask_1.SkipTask {
  OnRun(r, e) {
    var a;
    var r = Number(r);
    var e = Number(e);
    if (UiManager_1.UiManager.IsViewShow("WorldMapView") && (a = ModelManager_1.ModelManager.WorldMapModel).CurrentFocalMarkType === r && a.CurrentFocalMarkId === e) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsInView");
    } else {
      WorldMapController_1.WorldMapController.FocalMarkItem(r, e);
    }
    this.Finish();
  }
}
exports.SkipTaskWorldMap = SkipTaskWorldMap;
//# sourceMappingURL=SkipTaskWorldMap.js.map