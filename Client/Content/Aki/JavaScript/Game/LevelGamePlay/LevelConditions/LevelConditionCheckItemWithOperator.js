"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckItemWithOperator = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckItemWithOperator extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var t;
    var a;
    return !!e.LimitParams && (t = e.LimitParams.get("ItemID"), a = e.LimitParams.get("Count"), e = e.LimitParams.get("Op"), t !== undefined) && a !== undefined && e !== undefined && (t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(parseInt(t)), a = parseInt(a), this.CheckCompareValue(e, t, a));
  }
}
exports.LevelConditionCheckItemWithOperator = LevelConditionCheckItemWithOperator;
//# sourceMappingURL=LevelConditionCheckItemWithOperator.js.map