"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckDockyardWareHouseHasItem = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDockyardWareHouseHasItem extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r = ModelManager_1.ModelManager.DockyardModel?.BackpackUseSize;
    return !!r && r > 0;
  }
}
exports.LevelConditionCheckDockyardWareHouseHasItem = LevelConditionCheckDockyardWareHouseHasItem;
//# sourceMappingURL=LevelConditionCheckDockyardWareHouseHasItem.js.map