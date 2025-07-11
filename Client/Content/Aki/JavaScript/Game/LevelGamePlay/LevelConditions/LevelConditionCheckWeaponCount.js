"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckWeaponCount = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckWeaponCount extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r;
    var n;
    var o;
    return !!e.LimitParams && !!(r = e.LimitParams.get("Level")) && !!(n = e.LimitParams.get("Type")) && !!(o = e.LimitParams.get("Quality")) && (e = e.LimitParams.get("Op"), this.CheckCompareValue(e, ModelManager_1.ModelManager.InventoryModel.GetAllWeaponItemDataByQualityAndType(parseInt(o), parseInt(n)).length, Number(r)));
  }
}
exports.LevelConditionCheckWeaponCount = LevelConditionCheckWeaponCount;
//# sourceMappingURL=LevelConditionCheckWeaponCount.js.map