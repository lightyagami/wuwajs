"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionRouletteEquipItemId = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRouletteEquipItemId extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return !!e.LimitParams && (e = Number(e.LimitParams.get("ItemId"))) !== undefined && ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId === e;
  }
}
exports.LevelConditionRouletteEquipItemId = LevelConditionRouletteEquipItemId;
//# sourceMappingURL=LevelConditionRouletteEquipItemId.js.map