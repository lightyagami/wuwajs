"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaActivityData = undefined;
const ActivityData_1 = require("../../ActivityData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class CiacconaActivityData extends ActivityData_1.ActivityBaseData {
  PhraseEx(a) {
    ModelManager_1.ModelManager.CiacconaGalModel.UpdateByServerActivityData(a, this.Id);
  }
  GetExDataRedPointShowState() {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward();
    var e = ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward();
    var t = ModelManager_1.ModelManager.CiacconaGalModel.HasAnySubEndingReward();
    return a || e || t;
  }
}
exports.CiacconaActivityData = CiacconaActivityData;
//# sourceMappingURL=CiacconaActivityData.js.map