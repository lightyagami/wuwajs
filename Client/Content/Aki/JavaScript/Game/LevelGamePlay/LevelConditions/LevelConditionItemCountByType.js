"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionItemCountByType = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionItemCountByType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var a;
    var t;
    return !!e.LimitParams && (a = Number(e.LimitParams.get("ItemType"))) !== undefined && (t = Number(e.LimitParams.get("Value")), !!(e = e.LimitParams.get("Op"))) && this.CheckCompareValue(e, ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByItemType(a).size, t);
  }
}
exports.LevelConditionItemCountByType = LevelConditionItemCountByType;
//# sourceMappingURL=LevelConditionItemCountByType.js.map