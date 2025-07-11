"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFishingWareHouseItemListLength = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFishingWareHouseItemListLength extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return ModelManager_1.ModelManager.DockyardModel.GetWareHouseDataList().length > 0;
  }
}
exports.LevelConditionCheckFishingWareHouseItemListLength = LevelConditionCheckFishingWareHouseItemListLength;
//# sourceMappingURL=LevelConditionCheckFishingWareHouseItemListLength.js.map