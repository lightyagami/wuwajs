"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckInstanceEntranceUnlockStatus = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInstanceEntranceUnlockStatus extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InstanceDungeon", 5, "注意，该条件已经废弃，通知程序处理");
    }
    return false;
  }
}
exports.LevelConditionCheckInstanceEntranceUnlockStatus = LevelConditionCheckInstanceEntranceUnlockStatus;
//# sourceMappingURL=LevelConditionCheckInstanceEntranceUnlockStatus.js.map