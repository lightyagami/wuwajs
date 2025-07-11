"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionItemCheck = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionItemCheck extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var a;
    return !!e.LimitParams && (a = e.LimitParams.get("ItemID"), e = e.NeedNum, !!a) && e <= ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(parseInt(a));
  }
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    if (!e.Items?.length) {
      return true;
    }
    let a = false;
    if (e.Compare === "Eq") {
      a = true;
    }
    for (const t of e.Items) {
      var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.ItemId);
      if (t.Count > n) {
        return !a;
      }
    }
    return a;
  }
}
exports.LevelConditionItemCheck = LevelConditionItemCheck;
//# sourceMappingURL=LevelConditionItemCheck.js.map