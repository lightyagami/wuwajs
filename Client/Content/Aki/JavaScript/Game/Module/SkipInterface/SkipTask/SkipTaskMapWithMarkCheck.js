"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToMapWithMarkCheck = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
class SkipToMapWithMarkCheck extends SkipTask_1.SkipTask {
  OnRun(r, e) {
    e = Number(e);
    if (e !== undefined && !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(e)) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
      return;
    }
    e = {
      MarkId: e,
      MarkType: Number(r),
      OpenFogId: 0
    };
    WorldMapController_1.WorldMapController.OpenView(2, false, e);
    this.Finish();
  }
}
exports.SkipToMapWithMarkCheck = SkipToMapWithMarkCheck;
//# sourceMappingURL=SkipTaskMapWithMarkCheck.js.map