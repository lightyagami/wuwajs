"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTeleportStatus = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeleportStatus extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r;
    return !!e.LimitParams && (r = e.LimitParams.get("TeleportId"), e = e.LimitParams.get("State"), !!r) && ((e ? parseInt(e) : 0) === 1 ? ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(parseInt(r)) ?? false : !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(parseInt(r)));
  }
}
exports.LevelConditionCheckTeleportStatus = LevelConditionCheckTeleportStatus;
//# sourceMappingURL=LevelConditionCheckTeleportStatus.js.map