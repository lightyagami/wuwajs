"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTrackQuest = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTrackQuest extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, o) {
    return e.Type === "CheckIsTrackingCurrentQuest" && o?.Type === 6 && o.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id === o.TreeConfigId;
  }
}
exports.LevelConditionCheckTrackQuest = LevelConditionCheckTrackQuest;
//# sourceMappingURL=LevelConditionCheckTrackQuest.js.map