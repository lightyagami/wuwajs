"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCompareFishingBoatState = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareFishingBoatState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    return (e?.IsStop ?? true) === ModelManager_1.ModelManager.FishingModel.GetShipData().IsShipInPort();
  }
}
exports.LevelConditionCompareFishingBoatState = LevelConditionCompareFishingBoatState;
//# sourceMappingURL=LevelConditionCompareFishingBoatState.js.map