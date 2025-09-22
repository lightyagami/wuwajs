"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckCameraParam = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCameraParam extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    var r;
    return !!e && (r = ModelManager_1.ModelManager.PhotographModel.SelectedFightPhotoOptionId, e.CameraParam[0].TemplateId === r);
  }
}
exports.LevelConditionCheckCameraParam = LevelConditionCheckCameraParam;
//# sourceMappingURL=LevelConditionCheckCameraParam.js.map