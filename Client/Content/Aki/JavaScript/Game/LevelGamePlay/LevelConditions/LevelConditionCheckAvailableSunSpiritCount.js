"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckAvailableSunSpiritCount = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckAvailableSunSpiritCount extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    var a;
    return !!ModelManager_1.ModelManager.SunSpiritModel?.GetIsSunSpiritEnable() && (a = ModelManager_1.ModelManager.SunSpiritModel.GetSunSpiritNumByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), e.AreaId, false, e => e.PbData !== undefined && !e.PbData.oom?.rom && e.StateType === 4), this.CheckCompareValue(e.Compare, a, e.Count));
  }
}
exports.LevelConditionCheckAvailableSunSpiritCount = LevelConditionCheckAvailableSunSpiritCount;
//# sourceMappingURL=LevelConditionCheckAvailableSunSpiritCount.js.map